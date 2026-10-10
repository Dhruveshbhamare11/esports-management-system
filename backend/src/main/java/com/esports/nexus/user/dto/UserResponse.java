package com.esports.nexus.user.dto;

import com.esports.nexus.user.Role;
import java.util.Set;

public class UserResponse {
    private String id;
    private String username;
    private String email;
    private Set<Role> roles;
    private String displayName;
    private String avatarUrl;
    private int level;
    private int xp;
    private String rankTier;

    public UserResponse() {
    }

    public UserResponse(String id, String username, String email, Set<Role> roles, String displayName, String avatarUrl, int level, int xp, String rankTier) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.displayName = displayName;
        this.avatarUrl = avatarUrl;
        this.level = level;
        this.xp = xp;
        this.rankTier = rankTier;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getXp() {
        return xp;
    }

    public void setXp(int xp) {
        this.xp = xp;
    }

    public String getRankTier() {
        return rankTier;
    }

    public void setRankTier(String rankTier) {
        this.rankTier = rankTier;
    }
}
