package com.globalskillswap.auth.mapper;

import com.globalskillswap.auth.dto.CalendarEventDto;
import com.globalskillswap.auth.entity.CalendarEvent;
import org.springframework.stereotype.Component;

@Component
public class CalendarMapper {
    public CalendarEventDto toDto(CalendarEvent e) {
        return new CalendarEventDto(e.getId(), e.getTitle(), e.getEventDate());
    }
}
