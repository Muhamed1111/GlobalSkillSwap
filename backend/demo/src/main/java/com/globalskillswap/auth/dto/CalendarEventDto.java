package com.globalskillswap.auth.dto;

import java.time.LocalDate;

public class CalendarEventDto {
    private Long id;
    private String title;
    private LocalDate date;

    public CalendarEventDto() {}
    public CalendarEventDto(Long id, String title, LocalDate date) {
        this.id = id; this.title = title; this.date = date;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public LocalDate getDate() { return date; }
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDate(LocalDate date) { this.date = date; }
}
