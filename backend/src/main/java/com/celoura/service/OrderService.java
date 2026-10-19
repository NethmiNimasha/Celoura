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

    @PostConstruct
    public void seedInitialOrders() {
        if (orderRepository.count() == 0) {
            List<Order> demoOrders = new ArrayList<>();

            // Demo Order 1 - Ayesha (Pending Frock)
            Order o1 = new Order();
            o1.setId("CEL-4821");
            o1.setCustomerName("Ayesha Jayawardena");
            o1.setCustomerPhone("0771234567");
            o1.setCustomerEmail("ayyesha.j@example.com");
            o1.setDesignId("CEL-DSG-07");
            o1.setDesignTitle("Aurelia Gold Velvet Evening Frock");
            o1.setGarmentCategory("Frocks & Gowns");
            o1.setColour("Obsidian Black & 24K Gold");
            o1.setFabric("Italian Micro-Velvet & Zari");
            o1.setSilhouette("A-Line Flared Frock with Gilded Belt");
            o1.setNeckline("Sweetheart Neck");
            o1.setSleeve("Full Embellished Sleeve");
            o1.setStatus("Pending");
            o1.setTotalAmount(new BigDecimal("28000"));
            o1.setDepositPaid(BigDecimal.ZERO);
            o1.setEventDate(LocalDate.now().plusDays(28));
            o1.setOrderDate(LocalDate.now().minusDays(2));
            o1.setEstimatedCompletion(LocalDate.now().plusDays(25));
            o1.setMeasurements(new Measurement("36", "28", "38", "14.5", "16", "18", "14.5", "28", "41", "inches"));
            o1.setNotes("Please ensure golden zari border extends neatly around the hemline.");
            o1.setDesignImage("/images/frock-evening.jpg");
            o1.setIsCustomDesign(false);
            o1.setAssignedArtisan("Kamala Jayasuriya (Master Couturier)");
            demoOrders.add(o1);

            // Demo Order 2 - Ayesha (In Progress Saree Blouse)
            Order o2 = new Order();
            o2.setId("CEL-3914");
            o2.setCustomerName("Ayesha Jayawardena");
            o2.setCustomerPhone("0771234567");
            o2.setCustomerEmail("ayyesha.j@example.com");
            o2.setDesignId("CEL-DSG-08");
            o2.setDesignTitle("Royal Aari Bridal Saree Blouse");
            o2.setGarmentCategory("Saree Blouses");
            o2.setColour("Deep Black Velvet & Antique Gold");
            o2.setFabric("Pure Raw Silk & Black Velvet");
            o2.setSilhouette("Structured Sweetheart Saree Blouse with Dori");
            o2.setNeckline("Sweetheart Neck");
            o2.setSleeve("Elbow Length Paisley");
            o2.setStatus("In Progress");
            o2.setTotalAmount(new BigDecimal("16500"));
            o2.setDepositPaid(new BigDecimal("8000"));
            o2.setEventDate(LocalDate.now().plusDays(14));
            o2.setOrderDate(LocalDate.now().minusDays(5));
            o2.setEstimatedCompletion(LocalDate.now().plusDays(10));
            o2.setMeasurements(new Measurement("36", "28", "38", "14.5", "16", "10", "14", "28", "40", "inches"));
            o2.setNotes("Require extra latkan tassels for the back tie dori.");
            o2.setDesignImage("/images/saree-blouse.jpg");
            o2.setIsCustomDesign(false);
            o2.setAssignedArtisan("Sugath Nanayakkara (Heirloom Zari Master)");
            demoOrders.add(o2);

            // Demo Order 3 - Nethu (Confirmed Custom Evening Gown)
            Order o3 = new Order();
            o3.setId("CEL-2041");
            o3.setCustomerName("Nethu Nanayakkara");
            o3.setCustomerPhone("0771699754");
            o3.setCustomerEmail("nethunanayakkara315@gmail.com");
            o3.setDesignId("CEL-CUSTOM-UPLOAD");
            o3.setDesignTitle("Emerald Grace Couture Evening Frock");
            o3.setGarmentCategory("Frocks & Gowns");
            o3.setColour("Emerald Zari");
            o3.setFabric("Pure Raw Silk");
            o3.setSilhouette("Heavy A-Line Flare with Triple Can-Can");
            o3.setNeckline("Queen Anne Royal Neck");
            o3.setSleeve("Full Fitted Sheer with Embroidered Cuff");
            o3.setStatus("Confirmed");
            o3.setTotalAmount(new BigDecimal("32000"));
            o3.setDepositPaid(new BigDecimal("16000"));
            o3.setEventDate(LocalDate.now().plusDays(40));
            o3.setOrderDate(LocalDate.now().minusDays(1));
            o3.setEstimatedCompletion(LocalDate.now().plusDays(35));
            o3.setMeasurements(new Measurement("34", "26", "36", "14", "15", "18", "14", "26", "40", "inches"));
            o3.setNotes("Double can-can lining for fuller royal bridal flare.");
            o3.setDesignImage("/images/emerald-grace.jpg");
            o3.setIsCustomDesign(true);
            o3.setAssignedArtisan("Celoura Akuressa Atelier");
            demoOrders.add(o3);

            // Demo Order 4 - Dilani (Ready Designer Skirt)
            Order o4 = new Order();
            o4.setId("CEL-8532");
            o4.setCustomerName("Dilani Samaraweera");
            o4.setCustomerPhone("0712345678");
            o4.setCustomerEmail("dilani.s@example.com");
            o4.setDesignId("CEL-DSG-10");
            o4.setDesignTitle("Noor Obsidian Flared Designer Skirt");
            o4.setGarmentCategory("Designer Skirts");
            o4.setColour("Obsidian Black");
            o4.setFabric("Banarasi Brocade");
            o4.setSilhouette("Flared Trail Skirt with Structured Waist");
            o4.setNeckline("Boat Neck");
            o4.setSleeve("Cap Sleeve");
            o4.setStatus("Ready");
            o4.setTotalAmount(new BigDecimal("24500"));
            o4.setDepositPaid(new BigDecimal("24500"));
            o4.setEventDate(LocalDate.now().plusDays(5));
            o4.setOrderDate(LocalDate.now().minusDays(12));
            o4.setEstimatedCompletion(LocalDate.now());
            o4.setMeasurements(new Measurement("38", "30", "40", "15", "16", "12", "15", "30", "42", "inches"));
            o4.setNotes("Ready for fitting collection at Akuressa boutique.");
            o4.setDesignImage("/images/skirt-couture.jpg");
            o4.setIsCustomDesign(false);
            o4.setAssignedArtisan("Kamala Jayasuriya (Master Couturier)");
            demoOrders.add(o4);

            orderRepository.saveAll(demoOrders);
        }
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
