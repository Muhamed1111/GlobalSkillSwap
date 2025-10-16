package com.globalskillswap.auth.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globalskillswap.auth.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill,Long> {
    boolean existsByName(String name);
}
