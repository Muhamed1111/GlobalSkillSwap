package com.globalskillswap.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.security.JwtUtil;

import org.springframework.web.bind.annotation.RequestMapping;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository repo;
    private final JwtUtil jwtUtil;

    public UserController(UserRepository repo, JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);
            if (email == null) {
                return ResponseEntity.status(401).body("Nevazeci token");
            }
            List<User> users = repo.findAll();
            return ResponseEntity.ok(users);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Greska pri dohvacanju usera");
        }

    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser (@RequestHeader("Authorization") String authHeader){

        try{
            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);
            if(email==null){
                return ResponseEntity.status(401).body("Nevazeci token");
            }
            User user = repo.findByEmail(email);
            if(user==null){
                return ResponseEntity.status(404).body("Korisnik nije ulogovan");
            }
            return ResponseEntity.ok(user);
        }catch(Exception e){
            return ResponseEntity.internalServerError().body("Greska pri dohvacanju usera");
        }
    }
    @GetMapping("/myId")
    public ResponseEntity<?> getCurrentUserId(@RequestHeader("Authorization") String authHeader){
        try{
            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);
            if(email == null){
                return ResponseEntity.status(401).body("Nevazeci token");
            }

            User user = repo.findByEmail(email);
            if(user == null){
                return ResponseEntity.status(404).body("Korisnik nije pronadjen");
            }
            return ResponseEntity.ok(user.getId());

        }catch(Exception e){
            return ResponseEntity.internalServerError().body("Nepostojeci id ili nepostojeci user" + "++++++++++++++++++++++++");
        }
    }
}
