package com.globalskillswap.auth.controller;

import com.globalskillswap.auth.entity.Notification;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.enums.NotificationType;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.security.JwtUtil;
import com.globalskillswap.auth.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    public NotificationController(NotificationService notificationService, JwtUtil jwtUtil, UserRepository userRepo) {
        this.notificationService = notificationService;
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(
            @RequestBody Map<String, Object> body,
            @RequestHeader("Authorization") String authHeader) {

        try {
            // 🔹 Ekstrakcija korisnika iz tokena
            String token = authHeader.replace("Bearer ", "");
            String senderEmail = jwtUtil.extractEmail(token);

            // 🔹 Pronađi pošiljaoca
            User sender = userRepo.findByEmail(senderEmail);
            if (sender == null) {
                return ResponseEntity.status(404).body("Sender not found.");
            }

            // 🔹 Pronađi primaoca (userId = mentor)
            Long receiverId = Long.parseLong(body.get("userId").toString());
            User receiver = userRepo.findById(receiverId).orElse(null);
            if (receiver == null) {
                return ResponseEntity.status(404).body("Receiver not found.");
            }

            // 🔹 Ostali podaci
            String title = (String) body.getOrDefault("title", "New Notification");
            String redirectUrl = (String) body.getOrDefault("redirectUrl", null);
            String typeStr = (String) body.getOrDefault("type", "INFO");
            NotificationType type = NotificationType.valueOf(typeStr.toUpperCase());

            // 🔹 Poruka
            String message = "Student " + sender.getName() + " sent you a skill exchange request.";

            // 🔹 Kreiraj notifikaciju
            Notification notification = notificationService.createNotification(
                    sender.getId(), receiver.getId(), title, message, type, redirectUrl
                    
            );
            
            return ResponseEntity.ok(notification);

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid notification type or parameters.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Server error while sending notification.");
        }
    }

    // 🔹 Dohvatanje notifikacija za određenog korisnika
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getNotificationForUser(userId);
        return ResponseEntity.ok(notifications);
    }

    // 🔹 Brisanje jedne notifikacije
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id) {
        try {
            notificationService.deleteNotification(id);
            return ResponseEntity.ok("Notification deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to delete notification.");
        }
    }

    // 🔹 Brisanje svih notifikacija korisnika
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteAllUserNotifications(@PathVariable Long userId) {
        try {
            notificationService.deleteAllForUser(userId);
            return ResponseEntity.ok("All notifications deleted for user ID: " + userId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to delete user notifications.");
        }
    }

    // ✅ Dohvati notifikacije prijavljenog korisnika (preko tokena)
        @GetMapping("/me")
        public ResponseEntity<?> getMyNotifications(@RequestHeader("Authorization") String authHeader) {

            try {
                // 🔹 Izvuci email iz tokena (sub = email)
                String token = authHeader.replace("Bearer ", "");
                String email = jwtUtil.extractEmail(token);

                // 🔹 Pronađi korisnika
                User user = userRepo.findByEmail(email);
                if (user == null) {
                    return ResponseEntity.status(404).body("User not found.");
                }

                // 🔹 Vrati notifikacije po userId
                List<Notification> notifications = notificationService.getNotificationForUser(user.getId());
                return ResponseEntity.ok(notifications);

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().body("Error fetching notifications.");
            }
        }
}