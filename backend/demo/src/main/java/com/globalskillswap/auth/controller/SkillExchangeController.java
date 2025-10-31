package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.dto.SkillExchangeCreateDTO;
import com.globalskillswap.auth.security.JwtUtil;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.service.SkillExchangeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/exchange")
@CrossOrigin
public class SkillExchangeController {

    private final SkillExchangeService service;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    public SkillExchangeController(SkillExchangeService service, JwtUtil jwtUtil, UserRepository userRepo) {
        this.service = service;
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
    }

    
    private Long getUserIdFromToken(String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        return userRepo.findByEmail(email).getId();
    }

   
    @PostMapping("/request")
    public ResponseEntity<?> request(@RequestHeader("Authorization") String auth,
                                     @RequestBody SkillExchangeCreateDTO dto) {
        return ResponseEntity.ok(service.create(getUserIdFromToken(auth), dto));
    }
    @GetMapping("/incoming")
    public ResponseEntity<?> incoming(@RequestHeader("Authorization") String auth) {
        return ResponseEntity.ok(service.incoming(getUserIdFromToken(auth)));
    }

    @GetMapping("/outgoing")
    public ResponseEntity<?> outgoing(@RequestHeader("Authorization") String auth) {
        return ResponseEntity.ok(service.outgoing(getUserIdFromToken(auth)));
    }

    
    @PutMapping("/{id}/accept")
    public ResponseEntity<?> accept(@RequestHeader("Authorization") String auth,
                                @PathVariable Long id,
                                @RequestParam(required = false) String when) {
    LocalDateTime at = null;
    if (when != null) {
        at = OffsetDateTime.parse(when).toLocalDateTime();
     
    }
    
    return ResponseEntity.ok(service.accept(getUserIdFromToken(auth), id, at));
}

    
    @PutMapping("/{id}/decline")
    public ResponseEntity<?> decline(@RequestHeader("Authorization") String auth,
                                     @PathVariable Long id) {
        service.declined(getUserIdFromToken(auth), id);
        return ResponseEntity.ok("Declined");
    }
    @PutMapping("/{id}/scheduled")
    public ResponseEntity<?> schedule(@RequestHeader("Authorization") 
    String authHeader, 
    @PathVariable Long id,
    @RequestParam("at") String at
    ){
        LocalDateTime time = LocalDateTime.parse(at.replace("Z", ""));
    return ResponseEntity.ok(service.scheduled(getUserIdFromToken(authHeader), id, time));
    }
}
