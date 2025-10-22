package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.service.PointsService;
import com.globalskillswap.auth.security.JwtUtil;

import org.springframework.http.ResponseEntity;
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
            map.put("id", u.getId());
            return map;
        }).collect(Collectors.toList());
    }

   @PutMapping("/update")
public ResponseEntity<?> updateUser(
        @RequestHeader("Authorization") String authHeader,
        @RequestBody User updatedUser
) {
    try {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Missing or invalid token"));
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User existingUser = userRepo.findByEmail(email);
        if (existingUser == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }

        // ✅ Provjeri da li već postoji drugi korisnik sa istim emailom
        if (!updatedUser.getEmail().equals(existingUser.getEmail())
                && userRepo.findByEmail(updatedUser.getEmail()) != null) {
            return ResponseEntity.status(409).body(Map.of("error", "Email već postoji u sistemu!"));
        }

        // ✅ Provjeri da li već postoji drugi korisnik sa istim usernameom
        if (!updatedUser.getUsername().equals(existingUser.getUsername())
                && userRepo.findByUsername(updatedUser.getUsername()) != null) {
            return ResponseEntity.status(409).body(Map.of("error", "Korisničko ime već postoji!"));
        }

        // ✅ Ažuriraj dozvoljena polja
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEducation(updatedUser.getEducation());
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());

        userRepo.save(existingUser);

        return ResponseEntity.ok(Map.of(
                "message", "Profil uspješno ažuriran!",
                "user", existingUser
        ));

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError()
                .body(Map.of("error", "Greška pri ažuriranju profila"));
    }
}


}
