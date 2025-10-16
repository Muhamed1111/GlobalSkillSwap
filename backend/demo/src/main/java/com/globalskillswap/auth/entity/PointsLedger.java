package com.globalskillswap.auth.entity;

import java.time.Instant;

import jakarta.persistence.*;
@Entity
@Table(name="points_ledger")
public class PointsLedger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="user_id",nullable = false)
    private Long userId;

    private int delta;
    private String reason;

    @Column(name="created_at")
    private Instant createdAt = Instant.now();
    public PointsLedger(){}
    public PointsLedger(Long userId,int delta,String reason){
        this.userId=userId;
        this.delta=delta;
        this.reason=reason;
    }

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id=id;
    }

    public Long getUserId(){
        return userId;
    }
    public void setUserId(Long userId){
        this.userId=userId;
    }
    public int getDelta(){return delta;}
    public void setDelta(int delta){
        this.delta=delta;
    }
     public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    
}
