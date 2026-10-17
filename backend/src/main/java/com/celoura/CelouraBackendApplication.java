package com.celoura;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CelouraBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CelouraBackendApplication.class, args);
        System.out.println("✨ Celoura Haute Couture Spring Boot Backend is active on port 8080 ✨");
    }
}
