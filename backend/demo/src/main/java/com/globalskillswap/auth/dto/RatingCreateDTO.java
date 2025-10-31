
package com.globalskillswap.auth.dto;
public record RatingCreateDTO(
        Long sessionId,
        int stars,
        String comment
) {}
 
