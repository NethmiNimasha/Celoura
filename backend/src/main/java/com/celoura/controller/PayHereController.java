package com.celoura.controller;

import com.celoura.dto.PayHereInitiateRequest;
import com.celoura.dto.PayHereInitiateResponse;
import com.celoura.model.Payment;
import com.celoura.service.PayHereService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PayHereController {

    private final PayHereService payHereService;

    public PayHereController(PayHereService payHereService) {
        this.payHereService = payHereService;
    }

    /**
     * Generate pre-signed PayHere checkout parameters and secure hash
     */
    @PostMapping("/payhere/initiate")
    public ResponseEntity<PayHereInitiateResponse> initiatePayHerePayment(
            @Valid @RequestBody PayHereInitiateRequest request) {
        PayHereInitiateResponse response = payHereService.initiatePayment(request);
        return ResponseEntity.ok(response);
    }

    /**
     * PayHere Instant Payment Notification (IPN Webhook callback)
     * Form urlencoded parameters dispatched server-to-server by PayHere
     */
    @PostMapping(value = "/payhere/notify", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<String> receivePayHereIpn(
            @RequestParam Map<String, String> ipnParams) {
        boolean processed = payHereService.processIpnNotification(ipnParams);
        if (processed) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.badRequest().body("IPN verification failed");
        }
    }

    /**
     * Retrieve all payment transaction records associated with an order
     */
    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<Payment>> getOrderPayments(@PathVariable String orderId) {
        List<Payment> payments = payHereService.getPaymentsForOrder(orderId);
        return ResponseEntity.ok(payments);
    }
}

