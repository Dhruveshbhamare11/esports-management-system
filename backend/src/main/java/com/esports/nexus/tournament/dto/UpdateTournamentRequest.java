package com.esports.nexus.tournament.dto;

import com.esports.nexus.tournament.TournamentStatus;

public class UpdateTournamentRequest {
    private String title;
    private TournamentStatus status;
    private String bannerUrl;
    private String prizePool;
    private String description;

    public UpdateTournamentRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public TournamentStatus getStatus() {
        return status;
    }

    public void setStatus(TournamentStatus status) {
        this.status = status;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public String getPrizePool() {
        return prizePool;
    }

    public void setPrizePool(String prizePool) {
        this.prizePool = prizePool;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
