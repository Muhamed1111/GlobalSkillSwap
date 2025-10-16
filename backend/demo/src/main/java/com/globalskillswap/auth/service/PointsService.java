package com.globalskillswap.auth.service;

import com.globalskillswap.auth.repo.PointsLedgerRepository;
import com.globalskillswap.auth.entity.PointsLedger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PointsService {

    private final PointsLedgerRepository ledgerRepo;

    public PointsService(PointsLedgerRepository ledgerRepo) {
        this.ledgerRepo = ledgerRepo;
    }

    @Transactional
    public void addPoints(Long userId, int delta, String reason) {
        PointsLedger pl = new PointsLedger(userId, delta, reason);
        ledgerRepo.save(pl);
    }

    public int getUserScore(Long userId) {
        return ledgerRepo.sumPointsByUserId(userId);
    }
}
