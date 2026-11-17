package com.celoura.dto;

import jakarta.validation.constraints.NotBlank;

public class PayHereInitiateRequest {

    @NotBlank(message = "Order ID is required")
    private String orderId;

    private String paymentType; // DEPOSIT, BALANCE, FULL (defaults to DEPOSIT if null)

    public PayHereInitiateRequest() {}

    public PayHereInitiateRequest(String orderId, String paymentType) {
        this.orderId = orderId;
        this.paymentType = paymentType;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getPaymentType() { return paymentType; }
    public void setPaymentType(String paymentType) { this.paymentType = paymentType; }
}

