package com.celoura.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    private String customerEmail;

    private String designId;

    private String designTitle;

    @Column(nullable = false)
    private Integer rating = 5;

    private String reviewTitle;

    @Column(nullable = false, length = 2000)
    private String comment;

    private String garmentCategory;

    private String location = "Sri Lanka";

    private Boolean verifiedPurchase = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Review() {}

    public Review(String customerName, String customerEmail, String designId, String designTitle, 
                  Integer rating, String reviewTitle, String comment, String garmentCategory, 
                  String location, Boolean verifiedPurchase) {
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.designId = designId;
        this.designTitle = designTitle;
        this.rating = rating;
        this.reviewTitle = reviewTitle;
        this.comment = comment;
        this.garmentCategory = garmentCategory;
        this.location = location != null ? location : "Sri Lanka";
        this.verifiedPurchase = verifiedPurchase != null ? verifiedPurchase : true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getDesignId() { return designId; }
    public void setDesignId(String designId) { this.designId = designId; }

    public String getDesignTitle() { return designTitle; }
    public void setDesignTitle(String designTitle) { this.designTitle = designTitle; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getReviewTitle() { return reviewTitle; }
    public void setReviewTitle(String reviewTitle) { this.reviewTitle = reviewTitle; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getGarmentCategory() { return garmentCategory; }
    public void setGarmentCategory(String garmentCategory) { this.garmentCategory = garmentCategory; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Boolean getVerifiedPurchase() { return verifiedPurchase; }
    public void setVerifiedPurchase(Boolean verifiedPurchase) { this.verifiedPurchase = verifiedPurchase; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
