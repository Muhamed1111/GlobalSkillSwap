package com.globalskillswap.auth.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "user_achievements")
public class UserAchievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "achievement_id")
    private AchievementTemplate achievement;

    private boolean unlocked = false;
    private OffsetDateTime unlockedAt;

    // Getteri i setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public AchievementTemplate getAchievement() { return achievement; }
    public void setAchievement(AchievementTemplate achievement) { this.achievement = achievement; }

    public boolean isUnlocked() { return unlocked; }
    public void setUnlocked(boolean unlocked) { this.unlocked = unlocked; }

    public OffsetDateTime getUnlockedAt() { return unlockedAt; }
    public void setUnlockedAt(OffsetDateTime unlockedAt) { this.unlockedAt = unlockedAt; }
}
