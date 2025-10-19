package com.globalskillswap.auth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name= "applications" )
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="job_id",nullable = false)
    
    private Job job;
    private LocalDateTime apppliedAt = LocalDateTime.now();
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public User getUser(){
        return this.user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Job getJob(){
        return this.job;
    }
    public void setJob(Job job){
        this.job = job;
    }
    public LocalDateTime getAppliedAt(){
        return this.apppliedAt;
    }
    public void setAppliedAt(LocalDateTime appliedAt){
        this.apppliedAt=appliedAt;
    }

    
}
