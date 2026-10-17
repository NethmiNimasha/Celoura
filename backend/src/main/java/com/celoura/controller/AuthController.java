package com.celoura.controller;

import com.celoura.dto.AuthRequest;
import com.celoura.dto.AuthResponse;
import com.celoura.dto.RegisterRequest;
import com.celoura.model.User;
import com.celoura.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody RegisterRequest request) {
        return register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = userService.authenticate(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@Valid @RequestBody AuthRequest request) {
        return login(request);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(@RequestParam String email) {
        return userService.findByEmail(email)
            .map(user -> ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "phone", user.getPhone(),
                "role", user.getRole()
            )))
            .orElse(ResponseEntity.notFound().build());
    }
}
