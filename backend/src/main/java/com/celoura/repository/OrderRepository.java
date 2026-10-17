package com.celoura.repository;

import com.celoura.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByCustomerEmailIgnoreCase(String customerEmail);
    List<Order> findByCustomerPhone(String customerPhone);
    List<Order> findByStatusIgnoreCase(String status);
}
