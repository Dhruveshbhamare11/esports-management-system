package com.esports.nexus.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerProfileRepository extends JpaRepository<PlayerProfile, String> {
    Optional<PlayerProfile> findByUserId(String userId);
}
