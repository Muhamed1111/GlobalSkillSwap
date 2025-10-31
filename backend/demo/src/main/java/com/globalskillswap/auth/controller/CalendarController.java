package com.globalskillswap.auth.controller;
import com.globalskillswap.auth.repo.UserRepository;
import com.globalskillswap.auth.security.JwtUtil;
import com.globalskillswap.auth.service.CalendarService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin
public class CalendarController {

    private final CalendarService calendarService;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public CalendarController(CalendarService calendarService, UserRepository userRepo, JwtUtil jwtUtil) {
        this.calendarService = calendarService;
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    private Long getUserId(String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        return userRepo.findByEmail(email).getId();
    }

    // ✅ Dohvati moje evente za mjesec
    @GetMapping("/my")
    public ResponseEntity<?> getMyEvents(
            @RequestHeader("Authorization") String auth,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        Long userId = getUserId(auth);

        var events = calendarService.getEventsFor(userId, from, to)
                .stream()
                .map(e -> new CalendarEventDTO(e.getId(), e.getTitle(), e.getEventDate()))
                .toList();

        return ResponseEntity.ok(events);
    }

    record CalendarEventDTO(Long id, String title, LocalDate date) {}
}
