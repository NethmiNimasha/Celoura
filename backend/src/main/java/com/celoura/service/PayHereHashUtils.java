package com.celoura.service;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Locale;

public final class PayHereHashUtils {

    private PayHereHashUtils() {}

    /**
     * Compute MD5 hash string in uppercase
     */
    public static String md5(String input) {
        if (input == null) return "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString().toUpperCase(Locale.US);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("MD5 algorithm unavailable", e);
        }
    }

    /**
     * PayHere Checkout Pre-Payment Hash Generation:
     * hash = strtoupper(md5(merchant_id + order_id + amount_formatted + currency + strtoupper(md5(merchant_secret))))
     */
    public static String generatePrePaymentHash(String merchantId, String orderId, BigDecimal amount,
                                               String currency, String merchantSecret) {
        String amountFormatted = String.format(Locale.US, "%.2f", amount);
        String secretHash = md5(merchantSecret);
        String raw = merchantId + orderId + amountFormatted + currency + secretHash;
        return md5(raw);
    }

    /**
     * PayHere IPN Webhook Verification Checksum:
     * local_md5sig = strtoupper(md5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + strtoupper(md5(merchant_secret))))
     */
    public static boolean verifyIpnChecksum(String merchantId, String orderId, String payhereAmount,
                                           String payhereCurrency, String statusCode,
                                           String merchantSecret, String receivedMd5Sig) {
        if (receivedMd5Sig == null) return false;
        String secretHash = md5(merchantSecret);
        String raw = merchantId + orderId + payhereAmount + payhereCurrency + statusCode + secretHash;
        String localSig = md5(raw);
        return localSig.equalsIgnoreCase(receivedMd5Sig.trim());
    }
}

