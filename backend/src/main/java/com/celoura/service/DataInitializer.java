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
        initOrders();
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
        if (designRepository.count() == 0) {
            List<Design> designs = List.of(
                new Design(
                    "CEL-DSG-07",
                    "Aurelia Gold Velvet Evening Frock",
                    "Frocks & Gowns",
                    new BigDecimal("28000"),
                    "LKR 28,000",
                    "/images/frock-evening.jpg",
                    "Italian Micro-Velvet & Zari",
                    "Obsidian Black & 24K Gold",
                    "Handcrafted Zari Florals & Gilded Belt Detailing",
                    "A-Line Flared Frock with Gilded Belt",
                    "A show-stopping tailored evening frock crafted with an A-line flounce skirt, hand-embroidered golden waistline belt, and intricate sleeve cuffs.",
                    true,
                    true
                ),
                new Design(
                    "CEL-DSG-08",
                    "Royal Aari Bridal Saree Blouse",
                    "Saree Blouses",
                    new BigDecimal("16500"),
                    "LKR 16,500",
                    "/images/saree-blouse.jpg",
                    "Pure Raw Silk & Black Velvet",
                    "Deep Black Velvet & Antique Gold",
                    "Dense Aari Maggam Handwork, Paisley Sleeve & Scalloped Neck",
                    "Structured Sweetheart Saree Blouse with Dori",
                    "Handcrafted bridal saree blouse featuring heirloom aari and zardozi threadwork, structured sweetheart bustline, and custom dori tie-backs with latkan tassels.",
                    true,
                    true
                ),
                new Design(
                    "CEL-DSG-10",
                    "Noor Obsidian Flared Designer Skirt",
                    "Designer Skirts",
                    new BigDecimal("18500"),
                    "LKR 18,500",
                    "/images/skirt-flare.jpg",
                    "Heavy Silk & Banarasi Brocade Border",
                    "Midnight Obsidian & Gold",
                    "Wide Antique Bullion Zari Border",
                    "Circular Flared Skirt (5-Meter Gher)",
                    "High-waisted flared maxi skirt with a 5-meter circle sweep and built-in can-can volume. Perfect for pairing with ethnic crop tops or contemporary blouses.",
                    true,
                    true
                ),
                new Design(
                    "CEL-DSG-12",
                    "Valerie Corset Peplum Couture Blouse",
                    "Couture Blouses",
                    new BigDecimal("14000"),
                    "LKR 14,000",
                    "/images/blouse-designer.jpg",
                    "Structured Duchess Satin & Sheer Organza",
                    "Obsidian Black & Champagne Gold",
                    "Crystal Beaded Boning & Scalloped Sweetheart",
                    "Boned Corset Bodice with Peplum Flare",
                    "Bespoke boned corset blouse top with sheer puff sleeves and hand-embroidered gold filigree across the bustier.",
                    true,
                    true
                ),
                new Design(
                    "CEL-DSG-01",
                    "The Royal Empress Bridal Lehenga",
                    "Bridal Lehengas",
                    new BigDecimal("185000"),
                    "LKR 185,000",
                    "/images/royal-bloom.jpg",
                    "Raw Silk & Zari Mesh",
                    "Obsidian Black & Imperial Gold",
                    "Handcrafted Antique Gold Zardozi & Dabka",
                    "Circular Flared (6-Meter Gher)",
                    "An awe-inspiring masterpiece crafted for the modern royal bride. Features multi-layered circular flare with hand-embellished peacock and floral motifs in 24K antique bullion thread.",
                    true,
                    true
                )
            );
            designRepository.saveAll(designs);
        }
    }

    private void initOrders() {
        if (orderRepository.count() == 0) {
            Order order1 = new Order();
            order1.setId("CEL-8291");
            order1.setCustomerName("Nethmi Nimasha");
            order1.setCustomerPhone("0771699754");
            order1.setCustomerEmail("nethunanayakkara315@gmail.com");
            order1.setDesignId("CEL-DSG-07");
            order1.setDesignTitle("Aurelia Gold Velvet Evening Frock");
            order1.setGarmentCategory("Frocks & Gowns");
            order1.setColour("Obsidian Black & 24K Gold");
            order1.setFabric("Italian Micro-Velvet & Zari");
            order1.setSilhouette("A-Line Flared Frock");
            order1.setNeckline("Sweetheart Neck");
            order1.setSleeve("Full Embellished Sleeve");
            order1.setStatus("In Progress");
            order1.setTotalAmount(new BigDecimal("28000"));
            order1.setDepositPaid(new BigDecimal("15000"));
            order1.setOrderDate(LocalDate.now().minusDays(5));
            order1.setEventDate(LocalDate.now().plusDays(20));
            order1.setEstimatedCompletion(LocalDate.now().plusDays(15));
            order1.setAssignedArtisan("Master Tailor Sugath (Akuressa Workshop)");
            order1.setNotes("Tailored fitting at Akuressa boutique.");
            order1.setMeasurements(new Measurement("34", "26", "36", "14", "15", "22", "14.5", "28", "41", "inches"));
            orderRepository.save(order1);
        }
    }
}
