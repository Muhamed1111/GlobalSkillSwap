package com.globalskillswap.auth.service;

import com.globalskillswap.auth.entity.PointsLedger;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.PointsLedgerRepository;
import com.globalskillswap.auth.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class PointsLedgerService {

    private final PointsLedgerRepository ledgerRepo;
    private final UserRepository userRepo;


    public PointsLedgerService(PointsLedgerRepository ledgerRepo,
                               UserRepository userRepo,
                               NotificationService notifications) {
        this.ledgerRepo = ledgerRepo;
        this.userRepo = userRepo;
    }

    public List<PointsLedger> getHistoryForUser(Long userId) {
        return ledgerRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    
    public void addPoints(Long userId, int delta, String reason) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        
        PointsLedger entry = new PointsLedger();
        entry.setUserId(userId);
        entry.setDelta(delta);
        entry.setReason(reason);
        entry.setCreatedAt(Instant.now());
        ledgerRepo.save(entry);

        user.setSkillPoints(user.getSkillPoints() + delta);
        userRepo.save(user);

    }
}
