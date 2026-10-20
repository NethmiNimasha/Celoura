package com.celoura.dto;

public class RecommendationRequest {

    private String occasion;
    private String category;
    private String bodyShape;
    private String undertone;
    private String embellishment;
    private String budget;
    private String notes;

    public RecommendationRequest() {}

    public RecommendationRequest(String occasion, String category, String bodyShape, 
                                 String undertone, String embellishment, String budget, String notes) {
        this.occasion = occasion;
        this.category = category;
        this.bodyShape = bodyShape;
        this.undertone = undertone;
        this.embellishment = embellishment;
        this.budget = budget;
        this.notes = notes;
    }

    public String getOccasion() { return occasion; }
    public void setOccasion(String occasion) { this.occasion = occasion; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBodyShape() { return bodyShape; }
    public void setBodyShape(String bodyShape) { this.bodyShape = bodyShape; }

    public String getUndertone() { return undertone; }
    public void setUndertone(String undertone) { this.undertone = undertone; }

    public String getEmbellishment() { return embellishment; }
    public void setEmbellishment(String embellishment) { this.embellishment = embellishment; }

    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
