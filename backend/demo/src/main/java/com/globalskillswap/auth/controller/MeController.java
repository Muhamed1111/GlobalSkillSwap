package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.service.PointsService;
import com.globalskillswap.auth.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public Map<String, Object> score(@RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        int score = pointsService.getUserScore(user.getId());
        return Map.of("email", email, "score", score);
    }

    @GetMapping("/leaderboard")
    public List<Map<String, Object>> leaderboard() {
        List<User> users = userRepo.findAll();
        return users.stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("username", u.getUsername());
            map.put("email", u.getEmail());
            map.put("points", pointsService.getUserScore(u.getId()));
            return map;
        }).collect(Collectors.toList());
    }
}
