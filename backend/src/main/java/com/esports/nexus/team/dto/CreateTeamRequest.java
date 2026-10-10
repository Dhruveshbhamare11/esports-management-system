package com.esports.nexus.team.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateTeamRequest {

    @NotBlank(message = "Team name is required")
    @Size(min = 3, max = 50, message = "Team name must be between 3 and 50 characters")
    private String name;

    @NotBlank(message = "Team tag is required")
    @Size(min = 2, max = 6, message = "Team tag must be between 2 and 6 characters")
    private String tag;

    @NotBlank(message = "Game ID is required")
    private String gameId;

    private String description;
    private String region = "Global";
    private String logoUrl;

    public CreateTeamRequest() {
    }

    public CreateTeamRequest(String name, String tag, String gameId, String description, String region, String logoUrl) {
        this.name = name;
        this.tag = tag;
        this.gameId = gameId;
        this.description = description;
        this.region = region;
        this.logoUrl = logoUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
}
