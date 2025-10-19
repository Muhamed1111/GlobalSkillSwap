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
    public ResponseEntity<Notification> sendNotification(
            @RequestBody Map<String, Object> body,
            @RequestHeader("Authorization") String authHeader) {

        try {
            String token = authHeader.replace("Bearer ", "");
            String senderEmail = jwtUtil.extractEmail(token);

            User sender = userRepo.findByEmail(senderEmail);
            if (sender == null) {
                return ResponseEntity.status(404).build();
            }

            Long senderId = sender.getId();
            Long receiverId = Long.parseLong(body.get("userId").toString());

            String title = (String) body.getOrDefault("title", "New Notification");
            String redirectUrl = (String) body.getOrDefault("redirectUrl", null);
            NotificationType type = NotificationType.valueOf(((String) body.getOrDefault("type", "INFO")).toUpperCase());

            String message = "Student " + sender.getName() + " sent you a skill exchange request.";

            Notification notification = notificationService.createNotification(
                     receiverId,  title,  message,  type,  senderId, redirectUrl
            );

            return ResponseEntity.ok(notification);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
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
}
