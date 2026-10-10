package com.esports.nexus.tournament;

import com.esports.nexus.common.BadRequestException;
import com.esports.nexus.common.ForbiddenException;
import com.esports.nexus.game.Game;
import com.esports.nexus.game.GameRepository;
import com.esports.nexus.tournament.dto.CreateTournamentRequest;
import com.esports.nexus.tournament.dto.TournamentResponse;
import com.esports.nexus.tournament.dto.UpdateTournamentRequest;
import com.esports.nexus.user.Role;
import com.esports.nexus.user.User;
import com.esports.nexus.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TournamentServiceTest {

    @Mock
    private TournamentRepository tournamentRepository;

    @Mock
    private GameRepository gameRepository;

    @Mock
    private UserRepository userRepository;

    private TournamentService tournamentService;

    @BeforeEach
    void setUp() {
        tournamentService = new TournamentService(tournamentRepository, gameRepository, userRepository);
    }

    @Test
    @DisplayName("Should create tournament when user has ORGANIZER role")
    void testCreateTournamentAuthorized() {
        Game game = new Game("Valorant", "valorant", "FPS", 5, "banner.png");
        User organizer = new User("org_user", "org@nexus.gg", "hashed");
        organizer.addRole(Role.ORGANIZER);

        CreateTournamentRequest request = new CreateTournamentRequest();
        request.setTitle("Championship Open");
        request.setGameId(game.getId());
        request.setMaxTeams(16);
        request.setStartDate(Instant.now().plusSeconds(86400));

        when(gameRepository.findById(game.getId())).thenReturn(Optional.of(game));
        when(userRepository.findByUsername("org_user")).thenReturn(Optional.of(organizer));
        when(tournamentRepository.save(any(Tournament.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TournamentResponse response = tournamentService.createTournament(request, "org_user");

        assertNotNull(response);
        assertEquals("Championship Open", response.getTitle());
        assertEquals(TournamentStatus.REGISTRATION_OPEN, response.getStatus());
    }

    @Test
    @DisplayName("Should reject tournament creation when user lacks ORGANIZER/ADMIN role")
    void testCreateTournamentUnauthorized() {
        Game game = new Game("Valorant", "valorant", "FPS", 5, "banner.png");
        User player = new User("plain_player", "player@nexus.gg", "hashed"); // only has Role.PLAYER

        CreateTournamentRequest request = new CreateTournamentRequest();
        request.setTitle("Unauthorized Tourney");
        request.setGameId(game.getId());
        request.setStartDate(Instant.now().plusSeconds(86400));

        when(gameRepository.findById(game.getId())).thenReturn(Optional.of(game));
        when(userRepository.findByUsername("plain_player")).thenReturn(Optional.of(player));

        assertThrows(ForbiddenException.class, () -> tournamentService.createTournament(request, "plain_player"));
        verify(tournamentRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should prevent reopening a completed tournament")
    void testInvalidStatusTransition() {
        Game game = new Game("Valorant", "valorant", "FPS", 5, "banner.png");
        User organizer = new User("org_user", "org@nexus.gg", "hashed");
        organizer.addRole(Role.ORGANIZER);

        Tournament tournament = new Tournament();
        tournament.setStatus(TournamentStatus.COMPLETED);
        tournament.setOrganizer(organizer);
        tournament.setGame(game);

        UpdateTournamentRequest updateRequest = new UpdateTournamentRequest();
        updateRequest.setStatus(TournamentStatus.UPCOMING);

        when(tournamentRepository.findById("tourney-1")).thenReturn(Optional.of(tournament));
        when(userRepository.findByUsername("org_user")).thenReturn(Optional.of(organizer));

        assertThrows(BadRequestException.class, () -> tournamentService.updateTournament("tourney-1", updateRequest, "org_user"));
    }
}
