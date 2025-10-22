package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.entity.ChatMessage;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.service.ChatService;
import com.globalskillswap.auth.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public ChatController(ChatService chatService, UserRepository userRepo, JwtUtil jwtUtil) {
        this.chatService = chatService;
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    // 🔹 GET konverzacija između ulogovanog i drugog korisnika
    @GetMapping("/{receiverId}")
    public ResponseEntity<?> getConversation(@PathVariable Long receiverId,
                                             @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            User sender = userRepo.findByEmail(email);
            if (sender == null) return ResponseEntity.status(401).body("Unauthorized");

            List<ChatMessage> msgs = chatService.getConversation(sender.getId(), receiverId);
            return ResponseEntity.ok(msgs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // 🔹 POST nova poruka
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestHeader("Authorization") String authHeader,
                                         @RequestBody ChatMessage message) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            User sender = userRepo.findByEmail(email);
            if (sender == null) return ResponseEntity.status(401).body("Unauthorized");

            message.setSenderId(sender.getId());
            ChatMessage saved = chatService.sendMessage(message);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
