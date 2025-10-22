package com.globalskillswap.auth.service;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.globalskillswap.auth.entity.AchievementTemplate;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.entity.UserAchievement;
import com.globalskillswap.auth.repo.AchievementsRepository;
import com.globalskillswap.auth.repo.UserAchievementsRepository;

@Service
public class AchievementService{
    private final UserAchievementsRepository userAchievementRepo;
    private final AchievementsRepository templateRepo;
    public AchievementService(UserAchievementsRepository userRepo, AchievementsRepository templateRepo){
        this.userAchievementRepo = userRepo;
        this.templateRepo = templateRepo;
    }
    public List<UserAchievement> getUserAchievements(Long id){
        return userAchievementRepo.findByUserId(id);
    }

    public void assignAllAchievementsToNewUser(Long userId){
        List<AchievementTemplate> templates = templateRepo.findAll();
        templates.forEach(t->{
            UserAchievement ua = new UserAchievement();
            ua.setUserId(userId);
            ua.setAchievement(t);
            userAchievementRepo.save(ua);
        });
    }
    public UserAchievement unlockAchievement(Long userId, Long achievementId){
        List<UserAchievement> achievements = userAchievementRepo.findByUserId(userId);
        for(UserAchievement ua : achievements){
            if(ua.getAchievement().getId().equals(achievementId)&&!ua.isUnlocked()){
                ua.setUnlocked(true);
                ua.setUnlockedAt(OffsetDateTime.now());
                return userAchievementRepo.save(ua);
            }
        }
        throw new RuntimeException("Achievements not found or already possesed");
    }    
}