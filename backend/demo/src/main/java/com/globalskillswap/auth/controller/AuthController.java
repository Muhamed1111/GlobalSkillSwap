package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ---------- SIGNUP ----------
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email već postoji"));
        }

        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username već postoji"));
        }

        // Hashiraj lozinku
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(Date.valueOf(LocalDate.now()));
        userRepository.save(user);

        // Kreiraj JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registracija uspješna");
        response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "surname", user.getSurname(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "createdAt", user.getCreatedAt()
        ));
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    // ---------- LOGIN ----------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email i lozinka su obavezni"));
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Korisnik nije pronađen"));
        }

        // Provjeri hashiranu lozinku
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Pogrešna lozinka"));
        }

        // Generiši novi token
        String token = jwtUtil.generateToken(email);

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("name", user.getName());
        userData.put("surname", user.getSurname());
        userData.put("username", user.getUsername());
        userData.put("email", user.getEmail());
        userData.put("education", user.getEducation());
        userData.put("provider", user.getProvider());
        userData.put("createdAt", user.getCreatedAt());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login uspješan");
        response.put("user", userData);
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    // ---------- VERIFY TOKEN ----------
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("error", "Token nije poslan"));
            }

            String token = authHeader.substring(7);
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body(Map.of("error", "Token nije validan"));
            }

            String email = jwtUtil.extractEmail(token);
            return ResponseEntity.ok(Map.of("email", email, "status", "valid"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Nevažeći token"));
        }
    }

    // ---------- GET PROFILE ----------
    @GetMapping("/me")
    public ResponseEntity<?> getProfile(@RequestParam String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Korisnik nije pronađen"));
        }

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("name", user.getName());
        userData.put("surname", user.getSurname());
        userData.put("username", user.getUsername());
        userData.put("email", user.getEmail());
        userData.put("education", user.getEducation());
        userData.put("provider", user.getProvider());
        userData.put("createdAt", user.getCreatedAt());

        return ResponseEntity.ok(userData);
    }

    // ---------- TEST PING ----------
    @PostMapping("/ping")
    public ResponseEntity<?> ping(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of(
                "status", "pong",
                "data", body
        ));
    }
}
