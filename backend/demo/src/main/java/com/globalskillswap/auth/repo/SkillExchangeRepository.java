package com.globalskillswap.auth.repo;

import com.globalskillswap.auth.entity.SkillExchangeRequest;
import com.globalskillswap.auth.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface SkillExchangeRepository extends JpaRepository<SkillExchangeRequest, Long> {
    List<SkillExchangeRequest> findByReceiverIdOrderByCreatedAtDesc(Long receiverId);
    List<SkillExchangeRequest> findByRequesterIdOrderByCreatedAtDesc(Long requesterId);
    boolean existsByRequesterIdAndReceiverIdAndStatusIn(Long reqId, Long recId, Collection<RequestStatus> statuses);
}
