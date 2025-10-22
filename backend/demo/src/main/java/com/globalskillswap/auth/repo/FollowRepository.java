package com.globalskillswap.auth.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.globalskillswap.auth.entity.Follow;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByFollowerId(Long followerId);
    List<Follow> findByFollowedId(Long followedId);
    Optional<Follow> findByFollowerIdAndFollowedId(Long followerId, Long followedId);
    boolean existsByFollowerIdAndFollowedId(Long followerId, Long followedId);
}
