package com.esports.nexus.team.dto;

import java.util.List;

public class TeamResponse {
    private String id;
    private String name;
    private String tag;
    private String gameId;
    private String gameName;
    private String gameCode;
    private String captainId;
    private String captainName;
    private String logoUrl;
    private String description;
    private String region;
    private String division;
    private boolean recruiting;
    private int seasonPoints;
    private int membersCount;
    private List<TeamMemberResponse> members;

    public TeamResponse() {
    }

    public TeamResponse(String id, String name, String tag, String gameId, String gameName, String gameCode,
                        String captainId, String captainName, String logoUrl, String description,
                        String region, String division, boolean recruiting, int seasonPoints,
                        int membersCount, List<TeamMemberResponse> members) {
        this.id = id;
        this.name = name;
        this.tag = tag;
        this.gameId = gameId;
        this.gameName = gameName;
        this.gameCode = gameCode;
        this.captainId = captainId;
        this.captainName = captainName;
        this.logoUrl = logoUrl;
        this.description = description;
        this.region = region;
        this.division = division;
        this.recruiting = recruiting;
        this.seasonPoints = seasonPoints;
        this.membersCount = membersCount;
        this.members = members;
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

    public String getCaptainId() {
        return captainId;
    }

    public void setCaptainId(String captainId) {
        this.captainId = captainId;
    }

    public String getCaptainName() {
        return captainName;
    }

    public void setCaptainName(String captainName) {
        this.captainName = captainName;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
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

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public boolean isRecruiting() {
        return recruiting;
    }

    public void setRecruiting(boolean recruiting) {
        this.recruiting = recruiting;
    }

    public int getSeasonPoints() {
        return seasonPoints;
    }

    public void setSeasonPoints(int seasonPoints) {
        this.seasonPoints = seasonPoints;
    }

    public int getMembersCount() {
        return membersCount;
    }

    public void setMembersCount(int membersCount) {
        this.membersCount = membersCount;
    }

    public List<TeamMemberResponse> getMembers() {
        return members;
    }

    public void setMembers(List<TeamMemberResponse> members) {
        this.members = members;
    }
}
