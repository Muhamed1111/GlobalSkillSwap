package com.globalskillswap.auth.service;

import com.globalskillswap.auth.entity.Follow;
import com.globalskillswap.auth.repo.FollowRepository;
import com.globalskillswap.auth.security.JwtUtil;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FollowService {

    private final FollowRepository followRepository;

 
    public FollowService(FollowRepository followRepository) {
        this.followRepository = followRepository;
       
    }

    public Follow followUser(Long followerId, Long followedId) {
        Follow f = new Follow();
        f.setFollowerId(followerId);
        f.setFollowedId(followedId);
        f.setCreatedAt(LocalDateTime.now());
        return followRepository.save(f);
    }

    public void unfollowUser(Long followerId, Long followedId) {
        followRepository.findByFollowerIdAndFollowedId(followerId, followedId)
                .ifPresent(followRepository::delete);
    }

    public List<Follow> getFollowers(Long userId) {
        return followRepository.findByFollowedId(userId);
    }

    public List<Follow> getFollowing(Long userId) {
        return followRepository.findByFollowerId(userId);
    }

    public boolean existsByFollowerAndFollowed(Long followerId, Long followedId) {
        return followRepository.existsByFollowerIdAndFollowedId(followerId, followedId);
    }
}
