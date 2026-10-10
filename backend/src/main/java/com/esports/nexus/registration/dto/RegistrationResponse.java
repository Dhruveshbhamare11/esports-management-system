package com.esports.nexus.registration.dto;

import com.esports.nexus.registration.RegistrationStatus;
import java.time.Instant;

public class RegistrationResponse {
    private String id;
    private String tournamentId;
    private String tournamentTitle;
    private String teamId;
    private String teamName;
    private String teamTag;
    private String registeredById;
    private String registeredByName;
    private RegistrationStatus status;
    private String registrationNotes;
    private Instant createdAt;

    public RegistrationResponse() {
    }

    public RegistrationResponse(String id, String tournamentId, String tournamentTitle, String teamId, String teamName,
                                String teamTag, String registeredById, String registeredByName, RegistrationStatus status,
                                String registrationNotes, Instant createdAt) {
        this.id = id;
        this.tournamentId = tournamentId;
        this.tournamentTitle = tournamentTitle;
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamTag = teamTag;
        this.registeredById = registeredById;
        this.registeredByName = registeredByName;
        this.status = status;
        this.registrationNotes = registrationNotes;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTournamentId() {
        return tournamentId;
    }

    public void setTournamentId(String tournamentId) {
        this.tournamentId = tournamentId;
    }

    public String getTournamentTitle() {
        return tournamentTitle;
    }

    public void setTournamentTitle(String tournamentTitle) {
        this.tournamentTitle = tournamentTitle;
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamTag() {
        return teamTag;
    }

    public void setTeamTag(String teamTag) {
        this.teamTag = teamTag;
    }

    public String getRegisteredById() {
        return registeredById;
    }

    public void setRegisteredById(String registeredById) {
        this.registeredById = registeredById;
    }

    public String getRegisteredByName() {
        return registeredByName;
    }

    public void setRegisteredByName(String registeredByName) {
        this.registeredByName = registeredByName;
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
}
