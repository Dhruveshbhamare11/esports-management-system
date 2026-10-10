package com.esports.nexus.tournament;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, String> {
    List<Tournament> findByGameId(String gameId);
    List<Tournament> findByStatus(TournamentStatus status);
    List<Tournament> findByGameIdAndStatus(String gameId, TournamentStatus status);
}
