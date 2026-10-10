package com.esports.nexus.tournament;

import com.esports.nexus.game.Game;
import com.esports.nexus.user.User;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tournaments")
public class Tournament {

    @Id
    @Column(length = 36, nullable = false, updatable = false)
    private String id;

    @Column(nullable = false, length = 150)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;

    @Column(name = "banner_url", length = 500)
    private String bannerUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private TournamentFormat format = TournamentFormat.SINGLE_ELIMINATION;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TournamentStatus status = TournamentStatus.UPCOMING;

    @Column(name = "team_size_format", nullable = false, length = 20)
    private String teamSizeFormat = "5v5";

    @Column(name = "current_teams", nullable = false)
    private int currentTeams = 0;

    @Column(name = "max_teams", nullable = false)
    private int maxTeams = 16;

    @Column(name = "prize_pool", length = 100)
    private String prizePool;

    @Column(nullable = false, length = 50)
    private String region = "North America";

    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @Column(name = "registration_deadline")
    private Instant registrationDeadline;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Tournament() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public Tournament(String title, Game game, User organizer, String bannerUrl,
                      TournamentFormat format, TournamentStatus status, String teamSizeFormat,
                      int maxTeams, String prizePool, String region, Instant startDate,
                      Instant registrationDeadline, String description) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.game = game;
        this.organizer = organizer;
        this.bannerUrl = bannerUrl;
        this.format = format;
        this.status = status;
        this.teamSizeFormat = teamSizeFormat;
        this.currentTeams = 0;
        this.maxTeams = maxTeams;
        this.prizePool = prizePool;
        this.region = region;
        this.startDate = startDate;
        this.registrationDeadline = registrationDeadline;
        this.description = description;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PrePersist
    protected void onCreate() {
        if (id == null) id = UUID.randomUUID().toString();
        if (createdAt == null) createdAt = Instant.now();
        if (updatedAt == null) updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }

    // Getters and Setters
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

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public User getOrganizer() {
        return organizer;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
