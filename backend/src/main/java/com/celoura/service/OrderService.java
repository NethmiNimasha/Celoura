package com.celoura.service;

import com.celoura.model.Order;
import com.celoura.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final Random random = new Random();

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmailIgnoreCase(email);
    }

    public List<Order> getOrdersByCustomerPhone(String phone) {
        return orderRepository.findByCustomerPhone(phone);
    }

    public Order createOrder(Order order) {
        if (order.getId() == null || order.getId().isBlank()) {
            order.setId("CEL-" + (1000 + random.nextInt(9000)));
        }
        if (order.getOrderDate() == null) {
            order.setOrderDate(LocalDate.now());
        }
        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("Pending");
        }
        if (order.getAssignedArtisan() == null || order.getAssignedArtisan().isBlank()) {
            order.setAssignedArtisan("Celoura Akuressa Atelier");
        }
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(String id, String newStatus) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Order with ID " + id + " not found."));
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
}
