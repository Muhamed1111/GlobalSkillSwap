// SkillExchangeDTO.java
package com.globalskillswap.auth.dto;
import java.time.LocalDateTime;

public record SkillExchangeDTO(
        Long id,
        Long requesterId, String requesterName,
        Long receiverId,  String receiverName,
        String skill,  
        String status,
        String message,
        LocalDateTime createdAt,
        LocalDateTime scheduledAt
) {}
