package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.dto.LoginRequest;
import com.globalskillswap.auth.dto.SignupRequest;
import com.globalskillswap.auth.security.JwtUtil;
import com.globalskillswap.auth.service.AuthService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    // ---------- SIGNUP ----------
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            return ResponseEntity.ok(authService.signup(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ---------- LOGIN ----------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
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

            Claims claims = jwtUtil.extractAllClaims(token);
            return ResponseEntity.ok(Map.of(
                    "email", claims.getSubject(),
                    "name", claims.get("name"),
                    "surname", claims.get("surname"),
                    "username", claims.get("username")
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Nevažeći token"));
        }
    }

    // ---------- TEST PING ----------
    @PostMapping("/ping")
    public ResponseEntity<?> ping(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("status", "pong", "data", body));
    }
}
