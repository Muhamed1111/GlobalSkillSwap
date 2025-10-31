package com.globalskillswap.auth.service;

import com.globalskillswap.auth.entity.CalendarEvent;
import com.globalskillswap.auth.entity.User;
import com.globalskillswap.auth.repo.CalendarEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalendarService {

    private final CalendarEventRepository repo;

    public CalendarService(CalendarEventRepository repo) {
        this.repo = repo;
    }
    public List<CalendarEvent> getEventsFor(Long userId, LocalDate from, LocalDate to) {
    return repo.findByUser_IdAndEventDateBetween(userId, from, to);
}

    public CalendarEvent addEvent(User user, String title, LocalDate date) {
        CalendarEvent e = new CalendarEvent();
        e.setUser(user);
        e.setTitle(title);
        e.setEventDate(date);
        return repo.save(e);
    }

    public List<CalendarEvent> getEventsFor(User user, LocalDate from, LocalDate to) {
        return repo.findByUser_IdAndEventDateBetween(user.getId(), from, to);
    }
}
