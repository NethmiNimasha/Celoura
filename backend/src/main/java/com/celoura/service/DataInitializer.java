package com.celoura.service;

import com.celoura.model.Design;
import com.celoura.model.Measurement;
import com.celoura.model.Order;
import com.celoura.model.User;
import com.celoura.repository.DesignRepository;
import com.celoura.repository.OrderRepository;
import com.celoura.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DesignRepository designRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DesignRepository designRepository,
                           OrderRepository orderRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.designRepository = designRepository;
        this.orderRepository = orderRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        initUsers();
        initDesigns();
    }

    private void initUsers() {
        if (userRepository.count() == 0) {
            userRepository.save(new User(
                "Celoura Admin",
                "admin@celourafashion.com",
                "0771699754",
                passwordEncoder.encode("admin123"),
                "ROLE_ADMIN"
            ));

            userRepository.save(new User(
                "Ayesha Jayawardena",
                "ayesha.j@example.com",
                "0771234567",
                passwordEncoder.encode("password123"),
                "ROLE_CUSTOMER"
            ));

            userRepository.save(new User(
                "Nethmi Nimasha",
                "nethunanayakkara315@gmail.com",
                "0771699754",
                passwordEncoder.encode("password123"),
                "ROLE_CUSTOMER"
            ));
        }
    }

    private void initDesigns() {
        // No hard-coded seed designs; designs are created dynamically via Admin panel
    }
}

