package com.globalskillswap.auth.dto;

import java.time.LocalDateTime;

public record SkillExchangeCreateDTO(
        Long receiverId,
        String skill,
        String message,
        LocalDateTime preferredTime
) {}
