package com.globalskillswap.auth.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globalskillswap.auth.entity.UserAchievement;

public interface UserAchievementsRepository extends JpaRepository<UserAchievement,Long>  {
    List<UserAchievement> findByUserId(Long userId);
} 
