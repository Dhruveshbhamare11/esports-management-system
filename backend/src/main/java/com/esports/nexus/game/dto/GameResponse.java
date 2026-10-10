package com.esports.nexus.game.dto;

public class GameResponse {
    private String id;
    private String name;
    private String code;
    private String genre;
    private int teamSize;
    private boolean active;
    private String bannerUrl;

    public GameResponse() {
    }

    public GameResponse(String id, String name, String code, String genre, int teamSize, boolean active, String bannerUrl) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.genre = genre;
        this.teamSize = teamSize;
        this.active = active;
        this.bannerUrl = bannerUrl;
    }

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
}
