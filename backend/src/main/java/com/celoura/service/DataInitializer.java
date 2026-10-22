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
    private final com.celoura.repository.ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DesignRepository designRepository,
                           OrderRepository orderRepository,
                           com.celoura.repository.ReviewRepository reviewRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.designRepository = designRepository;
        this.orderRepository = orderRepository;
        this.reviewRepository = reviewRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        initUsers();
        initDesigns();
        initReviews();
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

    private void initReviews() {
        if (reviewRepository.count() == 0) {
            reviewRepository.save(new com.celoura.model.Review(
                "Ayesha Jayawardena",
                "ayesha.j@example.com",
                null,
                "Royal Empress Bridal Ensemble",
                5,
                "Breathtaking Masterpiece & Exact Fit!",
                "My bridal lehenga from Celoura was beyond my wildest dreams! The antique 24K gold zardozi embroidery was intricately handcrafted. Master tailors in the Akuressa atelier ensured the measurements fit like a second skin.",
                "Bridal Lehengas",
                "Colombo, Sri Lanka",
                true
            ));

            reviewRepository.save(new com.celoura.model.Review(
                "Dilani Wickramasinghe",
                "dilani.w@example.com",
                null,
                "Handcrafted Aari Saree Blouse",
                5,
                "Exquisite Neckline & Premium Silk",
                "I ordered a customized sweetheart Aari embroidery saree blouse for a family wedding. The finish, sleeve embroidery, and piping were flawless. Delivered right on time!",
                "Saree Blouses",
                "Galle, Sri Lanka",
                true
            ));

            reviewRepository.save(new com.celoura.model.Review(
                "Shenaya Fernando",
                "shenaya.f@example.com",
                null,
                "Velvet Couture Evening Frock",
                5,
                "Royal Black & Gold Elegance",
                "The Italian micro-velvet fabric combined with gold threadwork felt so opulent. Everyone at the evening reception asked where I got it custom-made. Celoura is my go-to haute couture brand!",
                "Frocks & Gowns",
                "Matara, Sri Lanka",
                true
            ));

            reviewRepository.save(new com.celoura.model.Review(
                "Kavindi Perera",
                "kavindi.p@example.com",
                null,
                "Flared Brocade Designer Skirt",
                5,
                "Gorgeous 6-Meter Flare!",
                "The flare and can-can structure gave the skirt such an elegant royal sway. Their online custom measurement guidance made ordering seamless and effortless.",
                "Designer Skirts",
                "Kandy, Sri Lanka",
                true
            ));
        }
    }
}

