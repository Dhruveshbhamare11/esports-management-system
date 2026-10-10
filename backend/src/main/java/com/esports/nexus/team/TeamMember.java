package com.esports.nexus.team;

import com.esports.nexus.user.User;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "team_members")
public class TeamMember {

    @Id
    @Column(length = 36, nullable = false, updatable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TeamMemberRole role = TeamMemberRole.STARTER;

    @Column(name = "joined_at", nullable = false, updatable = false)
    private Instant joinedAt;

    public TeamMember() {
        this.id = UUID.randomUUID().toString();
        this.joinedAt = Instant.now();
    }

    public TeamMember(Team team, User user, TeamMemberRole role) {
        this.id = UUID.randomUUID().toString();
        this.team = team;
        this.user = user;
        this.role = role;
        this.joinedAt = Instant.now();
    }

    @PrePersist
    protected void onCreate() {
        if (id == null) id = UUID.randomUUID().toString();
        if (joinedAt == null) joinedAt = Instant.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TeamMemberRole getRole() {
        return role;
    }

    public void setRole(TeamMemberRole role) {
        this.role = role;
    }

    public Instant getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Instant joinedAt) {
        this.joinedAt = joinedAt;
    }
}
