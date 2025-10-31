package com.globalskillswap.auth.dto;
public record LessonCompleteDTO(
        Long sessionId,
        Integer actualMinutes,
        boolean noShow
) {}
