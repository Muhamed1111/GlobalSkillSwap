package com.globalskillswap.auth.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

import com.globalskillswap.auth.dto.SkillExchangeCreateDTO;
import com.globalskillswap.auth.dto.SkillExchangeDTO;
import com.globalskillswap.auth.entity.LessonSession;
import com.globalskillswap.auth.entity.SkillExchangeRequest;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.enums.NotificationType;
import com.globalskillswap.auth.enums.RequestStatus;
import com.globalskillswap.auth.enums.SessionStatus;
import com.globalskillswap.auth.repo.LessionSessionRepository;
import com.globalskillswap.auth.repo.SkillExchangeRepository;
import com.globalskillswap.auth.repo.UserRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class SkillExchangeService {

    private final SkillExchangeRepository exchangeRepo;
    private final LessionSessionRepository lessionRepo;
    private final UserRepository userRepo;
    private final CalendarService calendarService;
    private final NotificationService notificationService;

    public SkillExchangeService(
            SkillExchangeRepository r1,
            LessionSessionRepository r2,
            UserRepository r3,
            NotificationService s1,
            CalendarService calendarService) {
        this.exchangeRepo = r1;
        this.lessionRepo = r2;
        this.userRepo = r3;
        notificationService = s1;
        this.calendarService = calendarService;
    }

    public SkillExchangeDTO create(Long requesterId, SkillExchangeCreateDTO dto) {
        if (requesterId.equals(dto.receiverId())) {
            throw new IllegalArgumentException("Ne mozes sam sebi slati zahjteve");
        }
        User requester = userRepo.findById(requesterId).orElseThrow();
        User receiver = userRepo.findById(dto.receiverId()).orElseThrow();
        String skill = dto.skill();

        boolean exists = exchangeRepo.existsByRequesterIdAndReceiverIdAndStatusIn(requesterId, dto.receiverId(),
                List.of(RequestStatus.PENDING, RequestStatus.ACCEPTED));

        if (exists)
            throw new IllegalStateException("Vec postoji aktivan request");

        SkillExchangeRequest ex = new SkillExchangeRequest();
        ex.setRequester(requester);
        ex.setReceiver(receiver);
        ex.setSkill(skill);
        ex.setMessage(dto.message());
        ex.setCreatedAt(dto.preferredTime());
        exchangeRepo.save(ex);

        notificationService.createNotification(
                requester.getId(),
                receiver.getId(),
                "Novi zahtjev 👋",
                requester.getUsername() + " želi lekciju iz " + skill,
                NotificationType.REQUEST,
                "/exchange/incoming");

        return toDTO(ex);
    }

    public List<SkillExchangeDTO> incoming(Long receiverId) {
        return exchangeRepo.findByReceiverIdOrderByCreatedAtDesc(receiverId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public List<SkillExchangeDTO> outgoing(Long requesterId) {
        return exchangeRepo.findByRequesterIdOrderByCreatedAtDesc(requesterId)
                .stream().map(this::toDTO).toList();
    }

    public SkillExchangeDTO accept(Long actorId, Long id, LocalDateTime when) {

    SkillExchangeRequest ex = exchangeRepo.findById(id).orElseThrow();

    if (!ex.getReceiver().getId().equals(actorId))
        throw new RuntimeException("Unauthorized");

    if (ex.getStatus() != RequestStatus.PENDING)
        throw new IllegalStateException("Nije u PENDING");

    ex.setStatus(RequestStatus.ACCEPTED);

    if (when != null)
        ex.setScheduledAt(when);

    exchangeRepo.save(ex);

   
    LessonSession s = new LessonSession();
    s.setSkillExchangeRequest(ex);
    s.setScheduledAt(ex.getScheduledAt() != null ? ex.getScheduledAt() : LocalDateTime.now().plusDays(1));
    s.setStatus(SessionStatus.SCHEDULED);
    lessionRepo.save(s);

    
    LocalDateTime sessionTime = ex.getScheduledAt() != null
            ? ex.getScheduledAt()
            : LocalDateTime.now().plusDays(1);

    LocalDate sessionDate = sessionTime.toLocalDate();

    User requester = ex.getRequester();
    User receiver = ex.getReceiver();
    String skill = ex.getSkill();

    calendarService.addEvent(
            requester,
            skill + " lesson with " + receiver.getUsername(),
            sessionDate
    );

    calendarService.addEvent(
            receiver,
            skill + " lesson with " + requester.getUsername(),
            sessionDate
    );

    
    notificationService.createNotification(
            requester.getId(),
            receiver.getId(),
            "Zahtjev prihvaćen ✅",
            receiver.getUsername() + " je prihvatio pomoć za " + skill,
            NotificationType.INFO,
            "/exchange/outgoing"
    );

    return toDTO(ex);
}


    public void declined(Long actorId, Long id) {
        SkillExchangeRequest ex = exchangeRepo.findById(id).orElseThrow();
        if (!ex.getReceiver().getId().equals(actorId))
            throw new RuntimeException("Unauthorized");
        ex.setStatus(RequestStatus.DECLINED);
        exchangeRepo.save(ex);
        User receiver = ex.getReceiver();
        User requester = ex.getRequester();
        notificationService.createNotification(
                receiver.getId(),
                requester.getId(),
                "Zahtjev odbijen ❌",
                receiver.getUsername() + " nije u mogućnosti sada pomoći",
                NotificationType.INFO,
                "/exchange/outgoing");

    }
    @Transactional
    public SkillExchangeDTO scheduled(Long userId,Long id,LocalDateTime at){
        SkillExchangeRequest req = exchangeRepo.findById(id).orElseThrow(()-> 
        new IllegalArgumentException("There is no such request"));
        if(!req.getReceiver().getId().equals(userId)){
            throw new IllegalAccessError("Unauthorized");
        }
        if(!req.getStatus().equals(RequestStatus.ACCEPTED)){
            throw new IllegalStateException("Request must be in ACCEPT state");
        }
        req.setScheduledAt(at);
        exchangeRepo.save(req);

        return mapToDTO(req);


    }
    private SkillExchangeDTO toDTO(SkillExchangeRequest e) {
        return new SkillExchangeDTO(
                e.getId(),
                e.getRequester().getId(), e.getRequester().getUsername(),
                e.getReceiver().getId(), e.getReceiver().getUsername(),
                e.getSkill(),
                e.getStatus().name(),
                e.getMessage(),
                e.getCreatedAt(),
                e.getScheduledAt());
    }
    private SkillExchangeDTO mapToDTO(SkillExchangeRequest req) {
    return new SkillExchangeDTO(
            req.getId(),
            req.getRequester().getId(),req.getRequester().getUsername(),
            req.getReceiver().getId(),req.getReceiver().getUsername(),
            req.getSkill(),
            req.getStatus().name(),
            req.getMessage(),
            req.getCreatedAt(),
            req.getScheduledAt()
    );
}

}
