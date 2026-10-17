package com.celoura.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Measurement {

    private String bust;
    private String waist;
    private String hip;
    private String shoulder;
    private String armhole;
    private String sleeveLength;
    private String blouseLength;
    private String lehengaWaist;
    private String lehengaLength;
    private String unit = "inches";

    public Measurement() {}

    public Measurement(String bust, String waist, String hip, String shoulder, String armhole,
                       String sleeveLength, String blouseLength, String lehengaWaist, String lehengaLength, String unit) {
        this.bust = bust;
        this.waist = waist;
        this.hip = hip;
        this.shoulder = shoulder;
        this.armhole = armhole;
        this.sleeveLength = sleeveLength;
        this.blouseLength = blouseLength;
        this.lehengaWaist = lehengaWaist;
        this.lehengaLength = lehengaLength;
        this.unit = unit;
    }

    public String getBust() { return bust; }
    public void setBust(String bust) { this.bust = bust; }

    public String getWaist() { return waist; }
    public void setWaist(String waist) { this.waist = waist; }

    public String getHip() { return hip; }
    public void setHip(String hip) { this.hip = hip; }

    public String getShoulder() { return shoulder; }
    public void setShoulder(String shoulder) { this.shoulder = shoulder; }

    public String getArmhole() { return armhole; }
    public void setArmhole(String armhole) { this.armhole = armhole; }

    public String getSleeveLength() { return sleeveLength; }
    public void setSleeveLength(String sleeveLength) { this.sleeveLength = sleeveLength; }

    public String getBlouseLength() { return blouseLength; }
    public void setBlouseLength(String blouseLength) { this.blouseLength = blouseLength; }

    public String getLehengaWaist() { return lehengaWaist; }
    public void setLehengaWaist(String lehengaWaist) { this.lehengaWaist = lehengaWaist; }

    public String getLehengaLength() { return lehengaLength; }
    public void setLehengaLength(String lehengaLength) { this.lehengaLength = lehengaLength; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
}
