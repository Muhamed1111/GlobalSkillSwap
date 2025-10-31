package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.dto.LessonCompleteDTO;
import com.globalskillswap.auth.security.JwtUtil;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.service.LessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin
public class LessonController {

    private final LessonService service;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    public LessonController(LessonService service, JwtUtil jwtUtil, UserRepository userRepo) {
        this.service = service;
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
    }
    private Long getUserId(String auth) {
        String token = auth.substring(7);
        String email = jwtUtil.extractEmail(token);
        return userRepo.findByEmail(email).getId();
    }
    @PutMapping("/complete")
    public ResponseEntity<?> complete(@RequestHeader("Authorization") String auth,
                                      @RequestBody LessonCompleteDTO dto) {
        service.complete(getUserId(auth), dto);
        return ResponseEntity.ok("Lesson completed!");
    }
}
