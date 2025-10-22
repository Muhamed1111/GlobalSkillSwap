package com.globalskillswap.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.entity.UserAchievement;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.security.JwtUtil;
import com.globalskillswap.auth.service.AchievementService;

import java.util.List;

import javax.print.DocFlavor.STRING;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/me/achievements")
public class AchievementController {
    private final AchievementService achievementService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    public AchievementController(AchievementService aService, JwtUtil jwt, UserRepository userRepo){
        this.achievementService=aService;
        this.jwtUtil=jwt;
        this.userRepo = userRepo;
    }
    @GetMapping
    public List<UserAchievement> getAchievement(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        User user = userRepo.findByEmail(email);
        return achievementService.getUserAchievements(user.getId());
    }
    @PostMapping("/unlock/{id}")
    public UserAchievement unlockAchievement(@RequestHeader("Authorization") String authHeader,@PathVariable Long id) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        User user = userRepo.findByEmail(email);
        return achievementService.unlockAchievement(user.getId(), id);
    }
    

    
}
