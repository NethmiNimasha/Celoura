package com.celoura.service;

import com.celoura.dto.PayHereInitiateRequest;
import com.celoura.dto.PayHereInitiateResponse;
import com.celoura.model.Order;
import com.celoura.model.Payment;
import com.celoura.repository.OrderRepository;
import com.celoura.repository.PaymentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PayHereService {

    private static final Logger log = LoggerFactory.getLogger(PayHereService.class);
    private static final Pattern CELOURA_ORDER_PATTERN = Pattern.compile("(CEL-\\d+)");

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    @Value("${celoura.payhere.merchant-id:1220000}")
    private String merchantId;

    @Value("${celoura.payhere.merchant-secret:sandbox_secret_placeholder}")
    private String merchantSecret;

    @Value("${celoura.payhere.mode:sandbox}")
    private String mode;

    @Value("${celoura.payhere.notify-url:http://localhost:8080/api/payments/payhere/notify}")
    private String notifyUrl;

    @Value("${celoura.payhere.return-url:http://localhost:3000/order/payment-success}")
    private String returnUrl;

    @Value("${celoura.payhere.cancel-url:http://localhost:3000/order/payment-cancelled}")
    private String cancelUrl;

    public PayHereService(OrderRepository orderRepository, PaymentRepository paymentRepository) {
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
    }

    /**
     * Initiate a PayHere payment for a Celoura custom order
     */
    @Transactional
    public PayHereInitiateResponse initiatePayment(PayHereInitiateRequest request) {
        String orderId = request.getOrderId().trim();
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalArgumentException("Order with ID " + orderId + " not found."));

        String paymentType = (request.getPaymentType() != null && !request.getPaymentType().isBlank())
            ? request.getPaymentType().trim().toUpperCase()
            : "DEPOSIT";

        BigDecimal total = order.getTotalAmount() != null && order.getTotalAmount().compareTo(BigDecimal.ZERO) > 0
            ? order.getTotalAmount()
            : new BigDecimal("25000.00");

        BigDecimal currentDeposit = order.getDepositPaid() != null ? order.getDepositPaid() : BigDecimal.ZERO;
        BigDecimal payableAmount;
        String itemDescription;

        if ("BALANCE".equalsIgnoreCase(paymentType)) {
            payableAmount = total.subtract(currentDeposit);
            if (payableAmount.compareTo(BigDecimal.ZERO) <= 0) {
                throw new IllegalArgumentException("The outstanding balance for this order is already settled.");
            }
            itemDescription = "Remaining Atelier Balance - " + (order.getDesignTitle() != null ? order.getDesignTitle() : "Custom Outfit");
        } else if ("FULL".equalsIgnoreCase(paymentType)) {
            payableAmount = total;
            itemDescription = "Full Haute Couture Payment - " + (order.getDesignTitle() != null ? order.getDesignTitle() : "Custom Outfit");
        } else {
            // Default: 50% Advance Atelier Deposit
            payableAmount = total.multiply(new BigDecimal("0.50")).setScale(2, RoundingMode.HALF_UP);
            itemDescription = "50% Advance Atelier Deposit - " + (order.getDesignTitle() != null ? order.getDesignTitle() : "Custom Outfit");
        }

        // Unique PayHere reference per transaction attempt to prevent provider caching
        String payhereOrderRef = order.getId() + "-" + paymentType.substring(0, Math.min(3, paymentType.length()))
            + "-" + (System.currentTimeMillis() % 100000);

        // Persist pending payment record in DB
        Payment payment = new Payment(
            order.getId(),
            order.getCustomerEmail(),
            order.getCustomerName(),
            payableAmount,
            "LKR",
            paymentType,
            "PENDING"
        );
        Payment savedPayment = paymentRepository.save(payment);

        // Compute pre-payment MD5 hash
        String hash = PayHereHashUtils.generatePrePaymentHash(
            merchantId,
            payhereOrderRef,
            payableAmount,
            "LKR",
            merchantSecret
        );

        // Split customer full name into first and last name
        String fullName = order.getCustomerName() != null ? order.getCustomerName().trim() : "Valued Customer";
        String firstName = fullName;
        String lastName = "Customer";
        if (fullName.contains(" ")) {
            int lastSpace = fullName.lastIndexOf(" ");
            firstName = fullName.substring(0, lastSpace);
            lastName = fullName.substring(lastSpace + 1);
        }

        PayHereInitiateResponse response = new PayHereInitiateResponse();
        response.setSandbox("sandbox".equalsIgnoreCase(mode));
        response.setMerchantId(merchantId);
        response.setOrderId(payhereOrderRef);
        response.setPaymentRecordId(savedPayment.getId());
        response.setItems(itemDescription);
        response.setAmount(payableAmount);
        response.setCurrency("LKR");
        response.setHash(hash);
        response.setPaymentType(paymentType);

        response.setFirstName(firstName);
        response.setLastName(lastName);
        response.setEmail(order.getCustomerEmail() != null ? order.getCustomerEmail() : "orders@celourafashion.com");
        response.setPhone(order.getCustomerPhone() != null ? order.getCustomerPhone() : "0771699754");
        response.setAddress("Celoura Atelier Client Address");
        response.setCity("Akuressa");
        response.setCountry("Sri Lanka");

        response.setNotifyUrl(notifyUrl);
        response.setReturnUrl(returnUrl);
        response.setCancelUrl(cancelUrl);

        log.info("Initiated PayHere payment {} for order {} (Amount: LKR {}, Type: {})",
            savedPayment.getId(), order.getId(), payableAmount, paymentType);

        return response;
    }

    /**
     * Process PayHere Instant Payment Notification (IPN Webhook)
     */
    @Transactional
    public boolean processIpnNotification(Map<String, String> ipn) {
        String merchantIdParam = ipn.get("merchant_id");
        String orderIdParam = ipn.get("order_id");
        String payhereAmount = ipn.get("payhere_amount");
        String payhereCurrency = ipn.get("payhere_currency");
        String statusCode = ipn.get("status_code");
        String md5sig = ipn.get("md5sig");
        String paymentId = ipn.get("payment_id");
        String method = ipn.get("method");

        log.info("Received PayHere IPN: order_id={}, payment_id={}, status_code={}, amount={}",
            orderIdParam, paymentId, statusCode, payhereAmount);

        // 1. Verify MD5 Signature Checksum
        boolean isValidChecksum = PayHereHashUtils.verifyIpnChecksum(
            merchantIdParam != null ? merchantIdParam : this.merchantId,
            orderIdParam,
            payhereAmount,
            payhereCurrency,
            statusCode,
            merchantSecret,
            md5sig
        );

        if (!isValidChecksum) {
            log.warn("Invalid PayHere IPN checksum rejected for order_id={}", orderIdParam);
            return false;
        }

        // 2. Extract base Celoura Order ID (e.g. CEL-8291 from CEL-8291-DEP-4921)
        String celouraOrderId = extractCelouraOrderId(orderIdParam);
        if (celouraOrderId == null) {
            log.error("Could not parse Celoura Order ID from PayHere order_id={}", orderIdParam);
            return false;
        }

        Order order = orderRepository.findById(celouraOrderId).orElse(null);
        if (order == null) {
            log.error("Order {} not found in database for IPN", celouraOrderId);
            return false;
        }

        BigDecimal amountPaid = payhereAmount != null ? new BigDecimal(payhereAmount) : BigDecimal.ZERO;

        // 3. Idempotency Check: if this payment_id has already been successfully recorded, skip
        if (paymentId != null && paymentRepository.existsByPayherePaymentIdAndStatus(paymentId, "SUCCESS")) {
            log.info("Payment ID {} already processed successfully. Skipping duplicate webhook.", paymentId);
            return true;
        }

        // 4. Update or Record Payment
        Payment payment = new Payment();
        payment.setOrderId(celouraOrderId);
        payment.setCustomerEmail(order.getCustomerEmail());
        payment.setCustomerName(order.getCustomerName());
        payment.setAmount(amountPaid);
        payment.setCurrency(payhereCurrency != null ? payhereCurrency : "LKR");
        payment.setPayherePaymentId(paymentId);
        payment.setPaymentMethod(method);
        payment.setRawIpnPayload(ipn.toString());
        payment.setUpdatedAt(LocalDateTime.now());

        if (statusCode != null) {
            try {
                payment.setPayhereStatusCode(Integer.parseInt(statusCode));
            } catch (NumberFormatException ignored) {}
        }

        // status_code == 2 means Successful Transaction
        if ("2".equals(statusCode)) {
            payment.setStatus("SUCCESS");
            payment.setPaymentType(orderIdParam.contains("BAL") ? "BALANCE" : (orderIdParam.contains("FUL") ? "FULL" : "DEPOSIT"));
            paymentRepository.save(payment);

            // Update Order financial tracking & status
            BigDecimal currentDeposit = order.getDepositPaid() != null ? order.getDepositPaid() : BigDecimal.ZERO;
            BigDecimal newDeposit = currentDeposit.add(amountPaid);
            order.setDepositPaid(newDeposit);

            if (order.getTotalAmount() != null && newDeposit.compareTo(order.getTotalAmount()) >= 0) {
                order.setPaymentStatus("Fully Paid");
            } else {
                order.setPaymentStatus("Deposit Paid");
            }

            // Auto-promote order from Pending -> Confirmed upon verified deposit
            if ("Pending".equalsIgnoreCase(order.getStatus())) {
                order.setStatus("Confirmed");
            }

            String auditNote = String.format("[PayHere Online Payment] Verified LKR %s received via %s (Ref: %s).",
                payhereAmount, method != null ? method : "Card", paymentId);
            if (order.getNotes() != null && !order.getNotes().isBlank()) {
                order.setNotes(order.getNotes() + "\n" + auditNote);
            } else {
                order.setNotes(auditNote);
            }

            orderRepository.save(order);
            log.info("Successfully updated order {} with verified PayHere payment LKR {}", celouraOrderId, amountPaid);
        } else if ("0".equals(statusCode)) {
            payment.setStatus("PENDING");
            paymentRepository.save(payment);
        } else {
            payment.setStatus("FAILED");
            paymentRepository.save(payment);
            log.warn("Payment failed for order {} with PayHere status_code={}", celouraOrderId, statusCode);
        }

        return true;
    }

    public List<Payment> getPaymentsForOrder(String orderId) {
        return paymentRepository.findByOrderIdOrderByCreatedAtDesc(orderId);
    }

    private String extractCelouraOrderId(String rawId) {
        if (rawId == null) return null;
        Matcher matcher = CELOURA_ORDER_PATTERN.matcher(rawId);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return rawId;
    }
}

