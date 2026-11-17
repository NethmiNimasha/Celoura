package com.celoura.repository;

import com.celoura.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByOrderIdOrderByCreatedAtDesc(String orderId);

    Optional<Payment> findByPayherePaymentId(String payherePaymentId);

    boolean existsByPayherePaymentIdAndStatus(String payherePaymentId, String status);

    List<Payment> findByCustomerEmailOrderByCreatedAtDesc(String customerEmail);
}

