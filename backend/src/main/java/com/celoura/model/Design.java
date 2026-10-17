package com.celoura.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "designs")
public class Design {

    @Id
    private String id; // e.g. CEL-DSG-01

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category; // Frocks & Gowns, Saree Blouses, Designer Skirts, Couture Blouses, Bridal Lehengas

    @Column(nullable = false)
    private BigDecimal price;

    private String priceFormatted;

    @Column(nullable = false)
    private String image;

    private String fabric;
    private String color;
    
    @Column(length = 1000)
    private String embroidery;

    private String silhouette;

    @Column(length = 2000)
    private String description;

    private Boolean featured = false;
    private Boolean customizable = true;

    public Design() {}

    public Design(String id, String title, String category, BigDecimal price, String priceFormatted,
                  String image, String fabric, String color, String embroidery, String silhouette,
                  String description, Boolean featured, Boolean customizable) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.priceFormatted = priceFormatted;
        this.image = image;
        this.fabric = fabric;
        this.color = color;
        this.embroidery = embroidery;
        this.silhouette = silhouette;
        this.description = description;
        this.featured = featured;
        this.customizable = customizable;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getPriceFormatted() { return priceFormatted; }
    public void setPriceFormatted(String priceFormatted) { this.priceFormatted = priceFormatted; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getFabric() { return fabric; }
    public void setFabric(String fabric) { this.fabric = fabric; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getEmbroidery() { return embroidery; }
    public void setEmbroidery(String embroidery) { this.embroidery = embroidery; }

    public String getSilhouette() { return silhouette; }
    public void setSilhouette(String silhouette) { this.silhouette = silhouette; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public Boolean getCustomizable() { return customizable; }
    public void setCustomizable(Boolean customizable) { this.customizable = customizable; }
}
