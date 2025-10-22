package com.globalskillswap.auth.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.globalskillswap.auth.entity.PointsLedger;
import com.globalskillswap.auth.repo.PointsLedgerRepository;

@Service
public class PointsLedgerService {
    
    private final PointsLedgerRepository ledgerRepo;

    public PointsLedgerService(PointsLedgerRepository ledgerRepo){
        this.ledgerRepo=ledgerRepo;
    }
    public List<PointsLedger> getHistoryForUser(Long userId){
            return ledgerRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
