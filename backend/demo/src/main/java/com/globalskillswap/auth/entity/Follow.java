package com.globalskillswap.auth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "follows",
    uniqueConstraints = @UniqueConstraint(columnNames = {"follower_id", "followed_id"})
)
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "follower_id", nullable = false)
    private Long followerId;

    @Column(name = "followed_id", nullable = false)
    private Long followedId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // --- Getteri i setteri ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFollowerId() { return followerId; }
    public void setFollowerId(Long followerId) { this.followerId = followerId; }

    public Long getFollowedId() { return followedId; }
    public void setFollowedId(Long followedId) { this.followedId = followedId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
