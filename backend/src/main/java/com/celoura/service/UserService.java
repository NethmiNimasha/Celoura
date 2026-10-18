package com.celoura.service;

import com.celoura.dto.AuthRequest;
import com.celoura.dto.AuthResponse;
import com.celoura.dto.RegisterRequest;
import com.celoura.model.User;
import com.celoura.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email address is already registered.");
        }

        String role = request.getEmail().toLowerCase().contains("admin") ? "ROLE_ADMIN" : "ROLE_CUSTOMER";
        User user = new User(
            request.getName(),
            request.getEmail(),
            request.getPhone(),
            passwordEncoder.encode(request.getPassword()),
            role
        );

        User saved = userRepository.save(user);
        return new AuthResponse(
            "Account created successfully",
            saved.getId(),
            saved.getName(),
            saved.getEmail(),
            saved.getPhone(),
            saved.getRole(),
            "celoura-auth-token-" + saved.getId()
        );
    }

    public AuthResponse authenticate(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        return new AuthResponse(
            "Login successful",
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPhone(),
            user.getRole(),
            "celoura-auth-token-" + user.getId()
        );
    }

    public AuthResponse authenticateAdmin(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Invalid admin credentials."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid admin credentials.");
        }

        if (!"ROLE_ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new org.springframework.security.access.AccessDeniedException("Access Denied: This account does not possess administrator privileges.");
        }

        return new AuthResponse(
            "Admin login successful",
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPhone(),
            user.getRole(),
            "celoura-admin-token-" + user.getId()
        );
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
