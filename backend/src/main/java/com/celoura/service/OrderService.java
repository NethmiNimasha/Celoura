package com.celoura.service;

import com.celoura.model.Measurement;
import com.celoura.model.Order;
import com.celoura.repository.OrderRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final Random random = new Random();

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {

        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    public Optional<Order> getOrderById(String id) {
        if (id == null) return Optional.empty();
        return orderRepository.findById(id.trim());
    }

    public List<Order> getOrdersByCustomerEmail(String email) {
        if (email == null || email.isBlank()) return Collections.emptyList();
        return orderRepository.findByCustomerEmailIgnoreCaseOrderByOrderDateDesc(email.trim());
    }

    public List<Order> getOrdersByCustomerPhone(String phone) {
        if (phone == null || phone.isBlank()) return Collections.emptyList();
        return orderRepository.findByCustomerPhoneOrderByOrderDateDesc(phone.trim());
    }

    public List<Order> getOrdersByStatus(String status) {
        if (status == null || status.isBlank()) return getAllOrders();
        return orderRepository.findByStatusIgnoreCaseOrderByOrderDateDesc(status.trim());
    }

    public Order createOrder(Order order) {
        if (order.getId() == null || order.getId().isBlank()) {
            String newId;
            do {
                newId = "CEL-" + (1000 + random.nextInt(9000));
            } while (orderRepository.existsById(newId));
            order.setId(newId);
        }
        if (order.getOrderDate() == null) {
            order.setOrderDate(LocalDate.now());
        }
        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("Pending");
        }
        if (order.getDepositPaid() == null) {
            order.setDepositPaid(BigDecimal.ZERO);
        }
        if (order.getAssignedArtisan() == null || order.getAssignedArtisan().isBlank()) {
            order.setAssignedArtisan("Celoura Akuressa Atelier");
        }
        if (order.getEstimatedCompletion() == null && order.getEventDate() != null) {
            order.setEstimatedCompletion(order.getEventDate());
        }
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(String id, String newStatus) {
        Order order = orderRepository.findById(id.trim())
            .orElseThrow(() -> new IllegalArgumentException("Order with ID " + id + " not found."));
        order.setStatus(newStatus);
        if ("Completed".equalsIgnoreCase(newStatus) && order.getEstimatedCompletion() == null) {
            order.setEstimatedCompletion(LocalDate.now());
        }
        return orderRepository.save(order);
    }

    public Order updateOrder(String id, Order updated) {
        Order existing = orderRepository.findById(id.trim())
            .orElseThrow(() -> new IllegalArgumentException("Order with ID " + id + " not found."));

        if (updated.getCustomerName() != null) existing.setCustomerName(updated.getCustomerName());
        if (updated.getCustomerPhone() != null) existing.setCustomerPhone(updated.getCustomerPhone());
        if (updated.getCustomerEmail() != null) existing.setCustomerEmail(updated.getCustomerEmail());
        if (updated.getDesignTitle() != null) existing.setDesignTitle(updated.getDesignTitle());
        if (updated.getGarmentCategory() != null) existing.setGarmentCategory(updated.getGarmentCategory());
        if (updated.getColour() != null) existing.setColour(updated.getColour());
        if (updated.getFabric() != null) existing.setFabric(updated.getFabric());
        if (updated.getSilhouette() != null) existing.setSilhouette(updated.getSilhouette());
        if (updated.getNeckline() != null) existing.setNeckline(updated.getNeckline());
        if (updated.getSleeve() != null) existing.setSleeve(updated.getSleeve());
        if (updated.getStatus() != null) existing.setStatus(updated.getStatus());
        if (updated.getTotalAmount() != null) existing.setTotalAmount(updated.getTotalAmount());
        if (updated.getDepositPaid() != null) existing.setDepositPaid(updated.getDepositPaid());
        if (updated.getPaymentStatus() != null) existing.setPaymentStatus(updated.getPaymentStatus());
        if (updated.getEventDate() != null) existing.setEventDate(updated.getEventDate());
        if (updated.getEstimatedCompletion() != null) existing.setEstimatedCompletion(updated.getEstimatedCompletion());
        if (updated.getAssignedArtisan() != null) existing.setAssignedArtisan(updated.getAssignedArtisan());
        if (updated.getNotes() != null) existing.setNotes(updated.getNotes());
        if (updated.getMeasurements() != null) existing.setMeasurements(updated.getMeasurements());
        if (updated.getDesignImage() != null) existing.setDesignImage(updated.getDesignImage());
        if (updated.getCustomReferenceImage() != null) existing.setCustomReferenceImage(updated.getCustomReferenceImage());
        if (updated.getIsCustomDesign() != null) existing.setIsCustomDesign(updated.getIsCustomDesign());
        if (updated.getCustomDesignNotes() != null) existing.setCustomDesignNotes(updated.getCustomDesignNotes());

        return orderRepository.save(existing);
    }

    public void deleteOrder(String id) {
        if (!orderRepository.existsById(id.trim())) {
            throw new IllegalArgumentException("Order with ID " + id + " not found.");
        }
        orderRepository.deleteById(id.trim());
    }

    public Map<String, Object> getOrderStats() {
        Map<String, Object> stats = new HashMap<>();
        long total = orderRepository.count();
        long pending = orderRepository.countByStatusIgnoreCase("Pending");
        long confirmed = orderRepository.countByStatusIgnoreCase("Confirmed");
        long inProgress = orderRepository.countByStatusIgnoreCase("In Progress");
        long ready = orderRepository.countByStatusIgnoreCase("Ready");
        long completed = orderRepository.countByStatusIgnoreCase("Completed");
        long cancelled = orderRepository.countByStatusIgnoreCase("Cancelled");

        stats.put("totalOrders", total);
        stats.put("pending", pending);
        stats.put("confirmed", confirmed);
        stats.put("inProgress", inProgress);
        stats.put("ready", ready);
        stats.put("completed", completed);
        stats.put("cancelled", cancelled);

        return stats;
    }
}
