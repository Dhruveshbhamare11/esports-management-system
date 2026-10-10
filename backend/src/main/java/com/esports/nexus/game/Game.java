package com.esports.nexus.game;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @Column(length = 36, nullable = false, updatable = false)
    private String id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false, length = 50)
    private String genre;

    @Column(name = "team_size", nullable = false)
    private int teamSize = 5;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "banner_url", length = 500)
    private String bannerUrl;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public Game() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = Instant.now();
    }

    public Game(String name, String code, String genre, int teamSize, String bannerUrl) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.code = code;
        this.genre = genre;
        this.teamSize = teamSize;
        this.bannerUrl = bannerUrl;
        this.active = true;
        this.createdAt = Instant.now();
    }

    @PrePersist
    protected void onCreate() {
        if (id == null) id = UUID.randomUUID().toString();
        if (createdAt == null) createdAt = Instant.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getTeamSize() {
        return teamSize;
    }

    public void setTeamSize(int teamSize) {
        this.teamSize = teamSize;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
