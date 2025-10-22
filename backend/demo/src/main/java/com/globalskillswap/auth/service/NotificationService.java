package com.globalskillswap.auth.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.globalskillswap.auth.entity.Notification;
import com.globalskillswap.auth.enums.NotificationType;
import com.globalskillswap.auth.repo.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Kreira novu notifikaciju između pošiljaoca i primaoca.
     * 
     * @param senderId    - ID korisnika koji šalje (iz tokena)
     * @param receiverId  - ID korisnika koji prima (mentor)
     * @param title       - Naslov notifikacije
     * @param message     - Poruka notifikacije
     * @param type        - Tip notifikacije (REQUEST, INFO, SYSTEM, ...)
     * @param redirectUrl - URL na koji vodi notifikacija (npr. /requests)
     * @return Sačuvani Notification objekat
     */
    public Notification createNotification(Long senderId, Long receiverId, String title, String message,
                                           NotificationType type, String redirectUrl) {
        if (receiverId == null || senderId == null) {
            throw new IllegalArgumentException("SenderId and ReceiverId cannot be null.");
        }

        Notification notification = new Notification();
        notification.setSenderId(senderId);
        notification.setUserId(receiverId); // userId = primalac
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type != null ? type : NotificationType.INFO);
        notification.setRedirectUrl(redirectUrl);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    /**
     * Dohvata sve notifikacije za određenog korisnika (po receiverId).
     */
    public List<Notification> getNotificationForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Briše jednu notifikaciju po ID-u.
     */
    public void deleteNotification(Long id) {
        if (notificationRepository.existsById(id)) {
            notificationRepository.deleteById(id);
        }
    }

    /**
     * Briše sve notifikacije koje pripadaju određenom korisniku.
     */
    public void deleteAllForUser(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        notificationRepository.deleteAll(notifications);
    }
}
