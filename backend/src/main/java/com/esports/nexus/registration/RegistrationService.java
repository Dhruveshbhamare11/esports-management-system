package com.esports.nexus.registration;

import com.esports.nexus.common.BadRequestException;
import com.esports.nexus.common.ConflictException;
import com.esports.nexus.common.ForbiddenException;
import com.esports.nexus.common.ResourceNotFoundException;
import com.esports.nexus.registration.dto.RegisterTournamentRequest;
import com.esports.nexus.registration.dto.RegistrationResponse;
import com.esports.nexus.team.Team;
import com.esports.nexus.team.TeamRepository;
import com.esports.nexus.tournament.Tournament;
import com.esports.nexus.tournament.TournamentRepository;
import com.esports.nexus.tournament.TournamentStatus;
import com.esports.nexus.user.Role;
import com.esports.nexus.user.User;
import com.esports.nexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final TournamentRepository tournamentRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    public RegistrationService(RegistrationRepository registrationRepository,
                               TournamentRepository tournamentRepository,
                               TeamRepository teamRepository,
                               UserRepository userRepository) {
        this.registrationRepository = registrationRepository;
        this.tournamentRepository = tournamentRepository;
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public RegistrationResponse registerTeam(String tournamentId, RegisterTournamentRequest request, String username) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament not found with ID: " + tournamentId));

        if (tournament.getStatus() != TournamentStatus.REGISTRATION_OPEN && tournament.getStatus() != TournamentStatus.CHECK_IN_LIVE) {
            throw new BadRequestException("Registration is closed for this tournament. Current status: " + tournament.getStatus());
        }

        if (tournament.getRegistrationDeadline() != null && Instant.now().isAfter(tournament.getRegistrationDeadline())) {
            throw new BadRequestException("The registration deadline for this tournament has passed");
        }

        if (tournament.getCurrentTeams() >= tournament.getMaxTeams()) {
            throw new BadRequestException("Tournament has reached maximum capacity (" + tournament.getMaxTeams() + " teams)");
        }

        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with ID: " + request.getTeamId()));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        boolean isCaptain = team.getCaptain().getId().equals(user.getId());
        boolean isAdmin = user.getRoles().contains(Role.ADMIN);

        if (!isCaptain && !isAdmin) {
            throw new ForbiddenException("Only the designated team captain can register this team for competitions");
        }

        if (!team.getGame().getId().equals(tournament.getGame().getId())) {
            throw new BadRequestException("Team game (" + team.getGame().getName() + ") does not match tournament game (" + tournament.getGame().getName() + ")");
        }

        if (registrationRepository.existsByTournamentIdAndTeamId(tournament.getId(), team.getId())) {
            throw new ConflictException("Team '" + team.getName() + "' is already registered for this tournament");
        }

        Registration registration = new Registration(tournament, team, user, request.getNotes());
        Registration saved = registrationRepository.save(registration);

        // Atomically increment team count
        tournament.setCurrentTeams(tournament.getCurrentTeams() + 1);
        tournamentRepository.save(tournament);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<RegistrationResponse> getTournamentRegistrations(String tournamentId) {
        if (!tournamentRepository.existsById(tournamentId)) {
            throw new ResourceNotFoundException("Tournament not found with ID: " + tournamentId);
        }
        return registrationRepository.findByTournamentId(tournamentId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public RegistrationResponse toResponse(Registration reg) {
        return new RegistrationResponse(
                reg.getId(),
                reg.getTournament().getId(),
                reg.getTournament().getTitle(),
                reg.getTeam().getId(),
                reg.getTeam().getName(),
                reg.getTeam().getTag(),
                reg.getRegisteredBy().getId(),
                reg.getRegisteredBy().getUsername(),
                reg.getStatus(),
                reg.getRegistrationNotes(),
                reg.getCreatedAt()
        );
    }
}
