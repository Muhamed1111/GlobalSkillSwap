package com.globalskillswap.auth.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globalskillswap.auth.entity.AchievementTemplate;

public interface AchievementsRepository extends JpaRepository<AchievementTemplate,Long> {
    
}
