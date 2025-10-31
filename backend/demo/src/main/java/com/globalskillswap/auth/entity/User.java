package com.globalskillswap.auth.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.sql.Date;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 50)
    private String name;

    @NotBlank
    @Column(nullable = false, length = 50)
    private String surname;

    @NotBlank
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column
    private Boolean isActive = true;

    @Column(length = 255)
    private String education;

    @Column(length = 50)
    private String provider;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String password;

    @Column(name = "created_at")
    private Date createdAt = new Date(System.currentTimeMillis());

    @Column(name = "skill_points", nullable = false)
    private int skillPoints = 0;

    @Column(name = "lessons_given", nullable = false)
    private int lessonsGiven = 0;

    @Column(name = "lessons_received", nullable = false)
    private int lessonsReceived = 0;

  
    public User() {}

    public User(String name, String surname, String username, String email, String password) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = new Date(System.currentTimeMillis());
    }

   
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public int getSkillPoints() { return skillPoints; }
    public void setSkillPoints(int skillPoints) { this.skillPoints = skillPoints; }

    public int getLessonsGiven() { return lessonsGiven; }
    public void setLessonsGiven(int lessonsGiven) { this.lessonsGiven = lessonsGiven; }

    public int getLessonsReceived() { return lessonsReceived; }
    public void setLessonsReceived(int lessonsReceived) { this.lessonsReceived = lessonsReceived; }
}
