package com.globalskillswap.auth.repo;

import com.globalskillswap.auth.entity.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByUser_IdAndEventDateBetween(Long userId, LocalDate from, LocalDate to);
}
