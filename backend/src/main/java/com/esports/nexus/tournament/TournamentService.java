package com.esports.nexus.tournament;

import com.esports.nexus.common.BadRequestException;
import com.esports.nexus.common.ForbiddenException;
import com.esports.nexus.common.ResourceNotFoundException;
import com.esports.nexus.game.Game;
import com.esports.nexus.game.GameRepository;
import com.esports.nexus.tournament.dto.CreateTournamentRequest;
import com.esports.nexus.tournament.dto.TournamentResponse;
import com.esports.nexus.tournament.dto.UpdateTournamentRequest;
import com.esports.nexus.user.Role;
import com.esports.nexus.user.User;
import com.esports.nexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TournamentService {

    private final TournamentRepository tournamentRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    public TournamentService(TournamentRepository tournamentRepository,
                             GameRepository gameRepository,
                             UserRepository userRepository) {
        this.tournamentRepository = tournamentRepository;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<TournamentResponse> getAllTournaments(String gameId, TournamentStatus status) {
        List<Tournament> tournaments;
        if (gameId != null && !gameId.isBlank()) {
            if (status != null) {
                tournaments = tournamentRepository.findByGameIdAndStatus(gameId, status);
            } else {
                tournaments = tournamentRepository.findByGameId(gameId);
            }
        } else if (status != null) {
            tournaments = tournamentRepository.findByStatus(status);
        } else {
            tournaments = tournamentRepository.findAll();
        }

        return tournaments.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TournamentResponse getTournamentById(String id) {
        Tournament tournament = tournamentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament not found with ID: " + id));
        return toResponse(tournament);
    }

    @Transactional(readOnly = true)
    public Tournament getTournamentEntityById(String id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament not found with ID: " + id));
    }

    @Transactional
    public TournamentResponse createTournament(CreateTournamentRequest request, String organizerUsername) {
        Game game = gameRepository.findById(request.getGameId())
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with ID: " + request.getGameId()));

        User organizer = userRepository.findByUsername(organizerUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Organizer user not found: " + organizerUsername));

        if (!organizer.getRoles().contains(Role.ORGANIZER) && !organizer.getRoles().contains(Role.ADMIN)) {
            throw new ForbiddenException("Only users with ORGANIZER or ADMIN role can create tournaments");
        }

        Tournament tournament = new Tournament(
                request.getTitle(),
                game,
                organizer,
                request.getBannerUrl(),
                request.getFormat(),
                TournamentStatus.REGISTRATION_OPEN,
                request.getTeamSizeFormat() != null ? request.getTeamSizeFormat() : game.getTeamSize() + "v" + game.getTeamSize(),
                request.getMaxTeams(),
                request.getPrizePool(),
                request.getRegion(),
                request.getStartDate(),
                request.getRegistrationDeadline(),
                request.getDescription()
        );

        Tournament saved = tournamentRepository.save(tournament);
        return toResponse(saved);
    }

    @Transactional
    public TournamentResponse updateTournament(String id, UpdateTournamentRequest request, String organizerUsername) {
        Tournament tournament = tournamentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament not found with ID: " + id));

        User user = userRepository.findByUsername(organizerUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + organizerUsername));

        boolean isOwner = tournament.getOrganizer().getId().equals(user.getId());
        boolean isAdmin = user.getRoles().contains(Role.ADMIN);

        if (!isOwner && !isAdmin) {
            throw new ForbiddenException("You do not have permission to modify this tournament");
        }

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            tournament.setTitle(request.getTitle());
        }
        if (request.getBannerUrl() != null) {
            tournament.setBannerUrl(request.getBannerUrl());
        }
        if (request.getPrizePool() != null) {
            tournament.setPrizePool(request.getPrizePool());
        }
        if (request.getDescription() != null) {
            tournament.setDescription(request.getDescription());
        }

        // Validate status transition
        if (request.getStatus() != null) {
            validateStatusTransition(tournament.getStatus(), request.getStatus());
            tournament.setStatus(request.getStatus());
        }

        Tournament updated = tournamentRepository.save(tournament);
        return toResponse(updated);
    }

    private void validateStatusTransition(TournamentStatus current, TournamentStatus target) {
        if (current == TournamentStatus.COMPLETED && target != TournamentStatus.COMPLETED) {
            throw new BadRequestException("Completed tournaments cannot be reopened");
        }
        if (current == TournamentStatus.CANCELLED && target != TournamentStatus.CANCELLED) {
            throw new BadRequestException("Cancelled tournaments cannot be modified");
        }
    }

    public TournamentResponse toResponse(Tournament tournament) {
        return new TournamentResponse(
                tournament.getId(),
                tournament.getTitle(),
                tournament.getGame().getId(),
                tournament.getGame().getName(),
                tournament.getGame().getCode(),
                tournament.getOrganizer().getId(),
                tournament.getOrganizer().getUsername(),
                tournament.getBannerUrl(),
                tournament.getFormat(),
                tournament.getStatus(),
                tournament.getTeamSizeFormat(),
                tournament.getCurrentTeams(),
                tournament.getMaxTeams(),
                tournament.getPrizePool(),
                tournament.getRegion(),
                tournament.getStartDate(),
                tournament.getRegistrationDeadline(),
                tournament.getDescription()
        );
    }
}
