package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.entity.Follow;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.security.JwtUtil;
import com.globalskillswap.auth.service.FollowService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public FollowController(FollowService followService, UserRepository userRepo, JwtUtil jwtUtil) {
        this.followService = followService;
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    // ✅ FOLLOW korisnika
    @PostMapping("/{followedId}")
    public ResponseEntity<?> followUser(
            @PathVariable Long followedId,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String followerEmail = jwtUtil.extractEmail(token);
        User follower = userRepo.findByEmail(followerEmail);

        if (follower == null || Objects.equals(follower.getId(), followedId)) {
            return ResponseEntity.badRequest().body("Invalid follow request");
        }

        boolean alreadyFollowing = followService.existsByFollowerAndFollowed(follower.getId(), followedId);
        if (alreadyFollowing) {
            return ResponseEntity.badRequest().body("Already following this user");
        }

        Follow follow = followService.followUser(follower.getId(), followedId);
        return ResponseEntity.ok(follow);
    }

    // ✅ UNFOLLOW korisnika
    @DeleteMapping("/{followedId}")
    public ResponseEntity<?> unfollowUser(
            @PathVariable Long followedId,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String followerEmail = jwtUtil.extractEmail(token);
        User follower = userRepo.findByEmail(followerEmail);

        if (follower == null) {
            return ResponseEntity.badRequest().body("Invalid unfollow request");
        }

        followService.unfollowUser(follower.getId(), followedId);
        return ResponseEntity.ok("User unfollowed successfully");
    }

 // ✅ Lista followers (ko prati određenog korisnika)
    @GetMapping("/followers/{email}")
    public ResponseEntity<List<User>> getFollowers(@PathVariable String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found for email: " + email);
        }

        List<Follow> follows = followService.getFollowers(user.getId());
        List<User> followers = new ArrayList<>();

        for (Follow f : follows) {
            User follower = userRepo.findById(f.getFollowerId()).orElse(null);
            if (follower != null) followers.add(follower);
        }

        System.out.println("Followers for " + email + ": " + followers.size());
        return ResponseEntity.ok(followers);
    }

    // ✅ Lista following (koga user prati)
    @GetMapping("/following/{email}")
    public ResponseEntity<List<User>> getFollowing(@PathVariable String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found for email: " + email);
        }

        List<Follow> follows = followService.getFollowing(user.getId());
        List<User> following = new ArrayList<>();

        for (Follow f : follows) {
            User followed = userRepo.findById(f.getFollowedId()).orElse(null);
            if (followed != null) following.add(followed);
        }

        System.out.println("Following for " + email + ": " + following.size());
        return ResponseEntity.ok(following);
    }
}
