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
    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(Long userId, String title, String messsage, NotificationType type,  Long senderId, String redirectUrl){
        Notification n = new Notification();
        n.setUserId(userId);
        n.setTitle(title);
        n.setMessage(messsage);
        n.setType(type);
        n.setRedirectUrl(redirectUrl);
        n.setSenderId(senderId);
        n.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(n);
    }

     public Notification createNotification(Long userId, String title, String messsage, NotificationType type, Long senderId){

        return createNotification(userId, title, messsage, type, senderId,  null);
    }

    public List<Notification> getNotificationForUser(Long userId){
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void deleteNotification(Long id){
        if(notificationRepository.existsById(id))
            notificationRepository.deleteById(id);
    }

    public void deleteAllForUser(Long userId){
        List<Notification> n = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        notificationRepository.deleteAll(n);
    }

}
