package com.globalskillswap.auth.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globalskillswap.auth.entity.LessonSession;

public interface LessionSessionRepository extends JpaRepository<LessonSession,Long>{
    Optional<LessonSession> findByExchangeId(Long exchangeId);
    
}
