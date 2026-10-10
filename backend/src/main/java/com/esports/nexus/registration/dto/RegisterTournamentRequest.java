package com.esports.nexus.registration.dto;

import jakarta.validation.constraints.NotBlank;

public class RegisterTournamentRequest {

    @NotBlank(message = "Team ID is required")
    private String teamId;

    private String notes;

    public RegisterTournamentRequest() {
    }

    public RegisterTournamentRequest(String teamId, String notes) {
        this.teamId = teamId;
        this.notes = notes;
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
