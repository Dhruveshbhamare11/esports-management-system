package com.esports.nexus.registration;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, String> {
    List<Registration> findByTournamentId(String tournamentId);
    List<Registration> findByTeamId(String teamId);
    boolean existsByTournamentIdAndTeamId(String tournamentId, String teamId);
}
