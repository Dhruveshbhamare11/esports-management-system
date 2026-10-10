package com.esports.nexus.tournament.dto;

import com.esports.nexus.tournament.TournamentFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public class CreateTournamentRequest {

    @NotBlank(message = "Tournament title is required")
    private String title;

    @NotBlank(message = "Game ID is required")
    private String gameId;

    private String bannerUrl;

    @NotNull(message = "Tournament format is required")
    private TournamentFormat format = TournamentFormat.SINGLE_ELIMINATION;

    private String teamSizeFormat = "5v5";

    @Min(value = 2, message = "Maximum teams must be at least 2")
    private int maxTeams = 16;

    private String prizePool;
    private String region = "North America";

    @NotNull(message = "Start date is required")
    private Instant startDate;

    private Instant registrationDeadline;
    private String description;

    public CreateTournamentRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public TournamentFormat getFormat() {
        return format;
    }

    public void setFormat(TournamentFormat format) {
        this.format = format;
    }

    public String getTeamSizeFormat() {
        return teamSizeFormat;
    }

    public void setTeamSizeFormat(String teamSizeFormat) {
        this.teamSizeFormat = teamSizeFormat;
    }

    public int getMaxTeams() {
        return maxTeams;
    }

    public void setMaxTeams(int maxTeams) {
        this.maxTeams = maxTeams;
    }

    public String getPrizePool() {
        return prizePool;
    }

    public void setPrizePool(String prizePool) {
        this.prizePool = prizePool;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getRegistrationDeadline() {
        return registrationDeadline;
    }

    public void setRegistrationDeadline(Instant registrationDeadline) {
        this.registrationDeadline = registrationDeadline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
