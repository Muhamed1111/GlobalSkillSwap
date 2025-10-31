// LessonSession.java
package com.globalskillswap.auth.entity;

import com.globalskillswap.auth.enums.SessionStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="lesson_sessions")
public class LessonSession {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional=false) private SkillExchangeRequest exchange;

    @Enumerated(EnumType.STRING)
    private SessionStatus status = SessionStatus.SCHEDULED;

    private LocalDateTime scheduledAt;   
    private Integer durationMinutes;     
    @Column(length=255) private String meetingLink; 

    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public SkillExchangeRequest getSkillExchangeRequest(){
        return this.exchange;
    }
    public void setSkillExchangeRequest(SkillExchangeRequest exchange){
        this.exchange = exchange;  
    }
    public SessionStatus getStatus(){
        return this.status;
    }
    public void setStatus(SessionStatus status){
        this.status=status;
    }
    public LocalDateTime getScheduledAt () {
        return this.scheduledAt;
    }
    public void setScheduledAt(LocalDateTime time){
        this.scheduledAt = time;
    }
    public Integer getDurationMinutes(){
        return this.durationMinutes;
    }
    public void setDurationMinutes(Integer durationMinutes){
        this.durationMinutes= durationMinutes;
    }
    public String getMeetingLink(){
        return this.meetingLink;
    }
    public void setMeetingLink(String link){
        this.meetingLink=link;
    } 

}
