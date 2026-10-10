package com.esports.nexus.team.dto;

import com.esports.nexus.team.TeamMemberRole;
import java.time.Instant;

public class TeamMemberResponse {
    private String id;
    private String userId;
    private String username;
    private String displayName;
    private String avatarUrl;
    private TeamMemberRole role;
    private Instant joinedAt;

    public TeamMemberResponse() {
    }

    public TeamMemberResponse(String id, String userId, String username, String displayName, String avatarUrl, TeamMemberRole role, Instant joinedAt) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.displayName = displayName;
        this.avatarUrl = avatarUrl;
        this.role = role;
        this.joinedAt = joinedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
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
