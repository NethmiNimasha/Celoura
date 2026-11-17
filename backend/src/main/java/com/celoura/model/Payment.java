package com.celoura.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String orderId;

    private String customerEmail;
    private String customerName;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 10)
    private String currency = "LKR";

    @Column(nullable = false, length = 30)
    private String paymentType; // DEPOSIT, BALANCE, FULL

    private String paymentMethod; // VISA, MASTER, FRIMI, GENIE, etc.

    private String payherePaymentId;

    private Integer payhereStatusCode; // 2 = SUCCESS, 0 = PENDING, -1 = CANCELLED, -2 = FAILED

    @Column(nullable = false, length = 30)
    private String status = "PENDING"; // PENDING, SUCCESS, FAILED, CANCELLED

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String rawIpnPayload;

    public Payment() {}

    public Payment(String orderId, String customerEmail, String customerName, BigDecimal amount,
                   String currency, String paymentType, String status) {
        this.orderId = orderId;
        this.customerEmail = customerEmail;
        this.customerName = customerName;
        this.amount = amount;
        this.currency = currency != null ? currency : "LKR";
        this.paymentType = paymentType;
        this.status = status != null ? status : "PENDING";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getPaymentType() { return paymentType; }
    public void setPaymentType(String paymentType) { this.paymentType = paymentType; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPayherePaymentId() { return payherePaymentId; }
    public void setPayherePaymentId(String payherePaymentId) { this.payherePaymentId = payherePaymentId; }

    public Integer getPayhereStatusCode() { return payhereStatusCode; }
    public void setPayhereStatusCode(Integer payhereStatusCode) { this.payhereStatusCode = payhereStatusCode; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getRawIpnPayload() { return rawIpnPayload; }
    public void setRawIpnPayload(String rawIpnPayload) { this.rawIpnPayload = rawIpnPayload; }
}

