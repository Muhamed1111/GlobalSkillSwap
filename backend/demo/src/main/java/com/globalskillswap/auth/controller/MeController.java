package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.service.PointsService;
import com.globalskillswap.auth.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/me")
public class MeController {

    private final PointsService pointsService;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public MeController(PointsService pointsService, UserRepository userRepo, JwtUtil jwtUtil) {
        this.pointsService = pointsService;
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/score")
    public Map<String, Object> score(@RequestHeader("Authorization") String authHeader) {
        // 🔑 Izvuci token iz Authorization hedera
        String token = authHeader.replace("Bearer ", "");

        // 📧 Ekstrakcija emaila iz JWT tokena
        String email = jwtUtil.extractEmail(token);

        // 🔍 Pronađi korisnika u bazi
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // 🧮 Izračunaj ukupne poene
        int score = pointsService.getUserScore(user.getId());

        // 📤 Vrati odgovor kao JSON
        return Map.of("email", email, "score", score);
    }
}
