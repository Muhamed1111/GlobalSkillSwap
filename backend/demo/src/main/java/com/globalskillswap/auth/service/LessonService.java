package com.globalskillswap.auth.service;

import com.globalskillswap.auth.dto.LessonCompleteDTO;
import com.globalskillswap.auth.entity.LessonSession;
import com.globalskillswap.auth.enums.NotificationType;
import com.globalskillswap.auth.enums.SessionStatus;
import com.globalskillswap.auth.repo.LessionSessionRepository;
import com.globalskillswap.auth.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LessonService {

    private final LessionSessionRepository sessionRepo;
    private final PointsLedgerService points;        // postoji kod tebe
    private final AchievementService achievements;   // postoji kod tebe
    private final NotificationService notifications; // postoji kod tebe
    private final UserRepository userRepo;

    public LessonService(LessionSessionRepository sessionRepo,
                         PointsLedgerService points,
                         AchievementService achievements,
                         NotificationService notifications,
                         UserRepository userRepo) {
        this.sessionRepo = sessionRepo;
        this.points = points;
        this.achievements = achievements;
        this.notifications = notifications;
        this.userRepo = userRepo;
    }

    public void complete(Long actorId, LessonCompleteDTO dto) {
        LessonSession s = sessionRepo.findById(dto.sessionId()).orElseThrow();
        var ex = s.getSkillExchangeRequest();

        // samo učesnici mogu završiti
        if (!(ex.getRequester().getId().equals(actorId) || ex.getReceiver().getId().equals(actorId)))
            throw new RuntimeException("Unauthorized");

        s.setStatus(dto.noShow() ? SessionStatus.NO_SHOW : SessionStatus.COMPLETED);
        s.setDurationMinutes(dto.actualMinutes());
        sessionRepo.save(s);

        if (dto.noShow()) return;

        // bodovi: mentor +5, student +3
        var mentor  = ex.getReceiver();
        var student = ex.getRequester();

        points.addPoints(mentor.getId(), 5, "LESSON_GIVEN");
        points.addPoints(student.getId(), 3, "LESSON_RECEIVED");

        mentor.setLessonsGiven(mentor.getLessonsGiven() + 1);
        student.setLessonsReceived(student.getLessonsReceived() + 1);
        userRepo.save(mentor);
        userRepo.save(student);

        // achievements (primjeri kôdova, koristi tvoj templating)
        achievements.unlockIfEligible(mentor.getId(), "FIRST_LESSON_GIVEN");
        achievements.unlockIfEligible(student.getId(), "FIRST_LESSON_RECEIVED");

        notifications.createNotification(
            student.getId(),
            mentor.getId(),
            "Lesson completed",
            "Dodijeljeni su ti XP bodovi!",
            NotificationType.INFO,
            "/profile");
            
        notifications.createNotification(
            mentor.getId(),
            student.getId(),
            "Rate",
            "Rate" + mentor.getUsername() + " and help others in reviewing",
            NotificationType.SYSTEM,
            "/rate");
    }
}
