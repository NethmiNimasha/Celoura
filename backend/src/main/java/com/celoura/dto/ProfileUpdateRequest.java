package com.celoura.dto;

import jakarta.validation.constraints.NotBlank;

public class ProfileUpdateRequest {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotBlank(message = "Phone number cannot be empty")
    private String phone;

    private String address;
    private String currentPassword;
    private String newPassword;

    public ProfileUpdateRequest() {}

    public ProfileUpdateRequest(String name, String phone, String address, String currentPassword, String newPassword) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCurrentPassword() { return currentPassword; }
    public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
