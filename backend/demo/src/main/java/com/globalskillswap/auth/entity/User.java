package com.globalskillswap.auth.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 20)
    private String name;

    @NotBlank
    @Column(nullable = false, length = 20)
    private String surname;

    @NotBlank
    @Column(nullable = false, length = 10)
    private String username;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true, length = 30)
    private String email;

    @Column
    private Integer isActive;

    @Column(length = 100)
    private String education;

    @Column(length = 10)
    private String provider;

    @NotBlank
    @Column(nullable = false, length = 20)
    private String password;

    @Column
    private java.sql.Date createdAt;

    // ---------- Constructors ----------
    public User() {}

    // Po želji: konstruktor bez createdAt
    public User(String name, String surname, String username, String email, String password) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // ---------- Getteri i setteri ----------
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

    public Integer getIsActive() { return isActive; }
    public void setIsActive(Integer isActive) { this.isActive = isActive; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public java.sql.Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(java.sql.Date createdAt) { this.createdAt = createdAt; }
}
