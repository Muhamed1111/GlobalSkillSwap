package com.globalskillswap.auth.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.globalskillswap.auth.entity.Application;
import com.globalskillswap.auth.entity.Job;
import com.globalskillswap.auth.entity.User;

import java.util.List;


public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findByJob(Job job);
    List<Application> findByUser(User user);
    boolean existsByUserAndJob(User user,Job job);
}