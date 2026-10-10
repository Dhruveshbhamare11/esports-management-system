package com.esports.nexus.team;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, String> {
    List<TeamMember> findByTeamId(String teamId);
    boolean existsByTeamIdAndUserId(String teamId, String userId);
}
