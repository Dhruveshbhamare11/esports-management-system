package com.esports.nexus.tournament;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, String> {
    @Override
    @EntityGraph(attributePaths = {"game", "organizer"})
    List<Tournament> findAll();

    @EntityGraph(attributePaths = {"game", "organizer"})
    List<Tournament> findByGameId(String gameId);

    @EntityGraph(attributePaths = {"game", "organizer"})
    List<Tournament> findByStatus(TournamentStatus status);

    @EntityGraph(attributePaths = {"game", "organizer"})
    List<Tournament> findByGameIdAndStatus(String gameId, TournamentStatus status);

    boolean existsByTitle(String title);
}
