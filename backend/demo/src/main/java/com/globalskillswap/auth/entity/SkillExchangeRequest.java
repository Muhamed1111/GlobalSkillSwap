package com.globalskillswap.auth.entity;

import java.time.LocalDateTime;

import com.globalskillswap.auth.enums.RequestStatus;

import jakarta.persistence.*;
@Entity
@Table(name = "skill_exchange_requests")
public class SkillExchangeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private User requester;
    @ManyToOne(optional = false) private User receiver;
    
    @Column(nullable = false, length = 100)
    private String skill;

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.PENDING;
    
    @Column(length = 500) private String message;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime expiresAt = LocalDateTime.now().plusDays(7);

    private LocalDateTime scheduledAt;

    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public User getRequester(){
        return this.requester;
    }
    public void setRequester (User requester){
        this.requester = requester;
    }
    public User getReceiver(){
        return this.receiver;
    }
    public void setReceiver (User receiver){
        this.receiver = receiver;
    }
    public String getSkill(){
        return this.skill;
    }
    public void setSkill(String skill){
        this.skill = skill;
    }
    public RequestStatus getStatus(){
        return status;
    }
    public void setStatus(RequestStatus status){
        this.status= status;
    }
    public String getMessage() {
        return this.message;
    }
    public void setMessage(String message){
        this.message = message;
    }
    public LocalDateTime getCreatedAt(){
        return this.createdAt;
    }
    public void setCreatedAt(LocalDateTime time){
        this.createdAt=time;
    }
    public LocalDateTime getExpieresAt(){
        return this.expiresAt;
    }
    public void setExpiresAt(LocalDateTime time){
        this.expiresAt=time;
    }
     public LocalDateTime getScheduledAt(){
        return this.scheduledAt;
    }
    public void setScheduledAt(LocalDateTime time){
        this.scheduledAt=time;
    }

    
}
