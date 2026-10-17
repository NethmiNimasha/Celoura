package com.celoura.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id; // e.g. CEL-8291

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerPhone;

    @Column(nullable = false)
    private String customerEmail;

    private String designId;
    private String designTitle;
    private String garmentCategory;
    private String colour;
    private String fabric;
    private String silhouette;
    private String neckline;
    private String sleeve;

    @Column(nullable = false)
    private String status = "Pending"; // Pending, Confirmed, In Progress, Ready, Completed, Cancelled

    private BigDecimal totalAmount;
    private BigDecimal depositPaid = BigDecimal.ZERO;

    private LocalDate eventDate;
    private LocalDate orderDate = LocalDate.now();
    private LocalDate estimatedCompletion;

    @Embedded
    private Measurement measurements;

    @Column(length = 2000)
    private String notes;

    private String assignedArtisan = "Celoura Akuressa Atelier";

    public Order() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getDesignId() { return designId; }
    public void setDesignId(String designId) { this.designId = designId; }

    public String getDesignTitle() { return designTitle; }
    public void setDesignTitle(String designTitle) { this.designTitle = designTitle; }

    public String getGarmentCategory() { return garmentCategory; }
    public void setGarmentCategory(String garmentCategory) { this.garmentCategory = garmentCategory; }

    public String getColour() { return colour; }
    public void setColour(String colour) { this.colour = colour; }

    public String getFabric() { return fabric; }
    public void setFabric(String fabric) { this.fabric = fabric; }

    public String getSilhouette() { return silhouette; }
    public void setSilhouette(String silhouette) { this.silhouette = silhouette; }

    public String getNeckline() { return neckline; }
    public void setNeckline(String neckline) { this.neckline = neckline; }

    public String getSleeve() { return sleeve; }
    public void setSleeve(String sleeve) { this.sleeve = sleeve; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public BigDecimal getDepositPaid() { return depositPaid; }
    public void setDepositPaid(BigDecimal depositPaid) { this.depositPaid = depositPaid; }

    public LocalDate getEventDate() { return eventDate; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }

    public LocalDate getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDate orderDate) { this.orderDate = orderDate; }

    public LocalDate getEstimatedCompletion() { return estimatedCompletion; }
    public void setEstimatedCompletion(LocalDate estimatedCompletion) { this.estimatedCompletion = estimatedCompletion; }

    public Measurement getMeasurements() { return measurements; }
    public void setMeasurements(Measurement measurements) { this.measurements = measurements; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getAssignedArtisan() { return assignedArtisan; }
    public void setAssignedArtisan(String assignedArtisan) { this.assignedArtisan = assignedArtisan; }
}
