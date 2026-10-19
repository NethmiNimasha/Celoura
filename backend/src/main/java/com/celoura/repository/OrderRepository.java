package com.celoura.repository;

import com.celoura.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findAllByOrderByOrderDateDesc();
    List<Order> findByCustomerEmailIgnoreCaseOrderByOrderDateDesc(String customerEmail);
    List<Order> findByCustomerPhoneOrderByOrderDateDesc(String customerPhone);
    List<Order> findByStatusIgnoreCaseOrderByOrderDateDesc(String status);
    long countByStatusIgnoreCase(String status);
}
