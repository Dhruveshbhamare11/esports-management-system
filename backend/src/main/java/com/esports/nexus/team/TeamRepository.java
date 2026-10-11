package com.esports.nexus.team;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, String> {
    Optional<Team> findByName(String name);
    Optional<Team> findByTag(String tag);
    boolean existsByName(String name);
    boolean existsByTag(String tag);
    List<Team> findByGameId(String gameId);
    List<Team> findByRecruitingTrue();
    List<Team> findByGameIdAndRecruitingTrue(String gameId);
}
