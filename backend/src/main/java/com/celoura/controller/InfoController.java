package com.celoura.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/info")
public class InfoController {

    @Value("${celoura.business.name}")
    private String name;

    @Value("${celoura.business.tagline}")
    private String tagline;

    @Value("${celoura.business.address}")
    private String address;

    @Value("${celoura.business.phone}")
    private String phone;

    @Value("${celoura.business.email}")
    private String email;

    @Value("${celoura.business.whatsapp}")
    private String whatsapp;

    @GetMapping
    public ResponseEntity<Map<String, String>> getBusinessInfo() {
        return ResponseEntity.ok(Map.of(
            "name", name,
            "tagline", tagline,
            "address", address,
            "phone", phone,
            "displayPhone", "+94 " + phone.substring(1, 3) + " " + phone.substring(3, 6) + " " + phone.substring(6),
            "email", email,
            "whatsapp", whatsapp,
            "whatsappUrl", "https://wa.me/" + whatsapp + "?text=Hello%20Celoura%20Fashion"
        ));
    }
}
