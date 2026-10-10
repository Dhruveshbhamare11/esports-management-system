package com.esports.nexus.tournament.dto;

import com.esports.nexus.tournament.TournamentFormat;
import com.esports.nexus.tournament.TournamentStatus;
import java.time.Instant;

public class TournamentResponse {
    private String id;
    private String title;
    private String gameId;
    private String gameName;
    private String gameCode;
    private String organizerId;
    private String organizerName;
    private String bannerUrl;
    private TournamentFormat format;
    private TournamentStatus status;
    private String teamSizeFormat;
    private int currentTeams;
    private int maxTeams;
    private String prizePool;
    private String region;
    private Instant startDate;
    private Instant registrationDeadline;
    private String description;

    public TournamentResponse() {
    }

    public TournamentResponse(String id, String title, String gameId, String gameName, String gameCode,
                              String organizerId, String organizerName, String bannerUrl,
                              TournamentFormat format, TournamentStatus status, String teamSizeFormat,
                              int currentTeams, int maxTeams, String prizePool, String region,
                              Instant startDate, Instant registrationDeadline, String description) {
        this.id = id;
        this.title = title;
        this.gameId = gameId;
        this.gameName = gameName;
        this.gameCode = gameCode;
        this.organizerId = organizerId;
        this.organizerName = organizerName;
        this.bannerUrl = bannerUrl;
        this.format = format;
        this.status = status;
        this.teamSizeFormat = teamSizeFormat;
        this.currentTeams = currentTeams;
        this.maxTeams = maxTeams;
        this.prizePool = prizePool;
        this.region = region;
        this.startDate = startDate;
        this.registrationDeadline = registrationDeadline;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getGameCode() {
        return gameCode;
    }

    public void setGameCode(String gameCode) {
        this.gameCode = gameCode;
    }

    public String getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(String organizerId) {
        this.organizerId = organizerId;
    }

    public String getOrganizerName() {
        return organizerName;
    }

    public void setOrganizerName(String organizerName) {
        this.organizerName = organizerName;
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

    public TournamentStatus getStatus() {
        return status;
    }

    public void setStatus(TournamentStatus status) {
        this.status = status;
    }

    public String getTeamSizeFormat() {
        return teamSizeFormat;
    }

    public void setTeamSizeFormat(String teamSizeFormat) {
        this.teamSizeFormat = teamSizeFormat;
    }

    public int getCurrentTeams() {
        return currentTeams;
    }

    public void setCurrentTeams(int currentTeams) {
        this.currentTeams = currentTeams;
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
