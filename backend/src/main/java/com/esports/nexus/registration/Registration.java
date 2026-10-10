package com.esports.nexus.registration;

import com.esports.nexus.team.Team;
import com.esports.nexus.tournament.Tournament;
import com.esports.nexus.user.User;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "registrations", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"tournament_id", "team_id"})
})
public class Registration {

    @Id
    @Column(length = 36, nullable = false, updatable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registered_by_id", nullable = false)
    private User registeredBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RegistrationStatus status = RegistrationStatus.PENDING;

    @Column(name = "registration_notes", columnDefinition = "TEXT")
    private String registrationNotes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Registration() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public Registration(Tournament tournament, Team team, User registeredBy, String registrationNotes) {
        this.id = UUID.randomUUID().toString();
        this.tournament = tournament;
        this.team = team;
        this.registeredBy = registeredBy;
        this.status = RegistrationStatus.APPROVED; // Initial auto-approve for demonstration, subject to check-in
        this.registrationNotes = registrationNotes;
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

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public User getRegisteredBy() {
        return registeredBy;
    }

    public void setRegisteredBy(User registeredBy) {
        this.registeredBy = registeredBy;
    }

    public RegistrationStatus getStatus() {
        return status;
    }

    public void setStatus(RegistrationStatus status) {
        this.status = status;
    }

    public String getRegistrationNotes() {
        return registrationNotes;
    }

    public void setRegistrationNotes(String registrationNotes) {
        this.registrationNotes = registrationNotes;
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
