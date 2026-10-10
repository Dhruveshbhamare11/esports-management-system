package com.esports.nexus.registration;

import com.esports.nexus.common.BadRequestException;
import com.esports.nexus.common.ConflictException;
import com.esports.nexus.common.ForbiddenException;
import com.esports.nexus.game.Game;
import com.esports.nexus.registration.dto.RegisterTournamentRequest;
import com.esports.nexus.registration.dto.RegistrationResponse;
import com.esports.nexus.team.Team;
import com.esports.nexus.team.TeamRepository;
import com.esports.nexus.tournament.Tournament;
import com.esports.nexus.tournament.TournamentRepository;
import com.esports.nexus.tournament.TournamentStatus;
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
public class RegistrationServiceTest {

    @Mock
    private RegistrationRepository registrationRepository;

    @Mock
    private TournamentRepository tournamentRepository;

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private UserRepository userRepository;

    private RegistrationService registrationService;

    @BeforeEach
    void setUp() {
        registrationService = new RegistrationService(registrationRepository, tournamentRepository, teamRepository, userRepository);
    }

    @Test
    @DisplayName("Should successfully register eligible squad for tournament")
    void testRegisterTeamSuccess() {
        Game game = new Game("Valorant", "valorant", "FPS", 5, "banner.png");
        User captain = new User("captain_dan", "dan@nexus.gg", "hashed");
        Team team = new Team("Alpha Sentinels", "ALP", game, captain, "logo.png", "desc", "NA", "Premier");

        Tournament tournament = new Tournament();
        tournament.setId("t1");
        tournament.setStatus(TournamentStatus.REGISTRATION_OPEN);
        tournament.setGame(game);
        tournament.setMaxTeams(16);
        tournament.setCurrentTeams(0);
        tournament.setRegistrationDeadline(Instant.now().plusSeconds(86400));

        RegisterTournamentRequest request = new RegisterTournamentRequest(team.getId(), "Ready to compete");

        when(tournamentRepository.findById("t1")).thenReturn(Optional.of(tournament));
        when(teamRepository.findById(team.getId())).thenReturn(Optional.of(team));
        when(userRepository.findByUsername("captain_dan")).thenReturn(Optional.of(captain));
        when(registrationRepository.existsByTournamentIdAndTeamId("t1", team.getId())).thenReturn(false);
        when(registrationRepository.save(any(Registration.class))).thenAnswer(invocation -> invocation.getArgument(0));

        RegistrationResponse response = registrationService.registerTeam("t1", request, "captain_dan");

        assertNotNull(response);
        assertEquals("Alpha Sentinels", response.getTeamName());
        assertEquals(RegistrationStatus.APPROVED, response.getStatus());
        assertEquals(1, tournament.getCurrentTeams());

        verify(registrationRepository).save(any(Registration.class));
        verify(tournamentRepository).save(tournament);
    }

    @Test
    @DisplayName("Should reject registration when tournament status is closed")
    void testRegisterClosedTournament() {
        Tournament tournament = new Tournament();
        tournament.setId("t1");
        tournament.setStatus(TournamentStatus.COMPLETED);

        RegisterTournamentRequest request = new RegisterTournamentRequest("team-1", null);

        when(tournamentRepository.findById("t1")).thenReturn(Optional.of(tournament));

        assertThrows(BadRequestException.class, () -> registrationService.registerTeam("t1", request, "captain_dan"));
        verify(registrationRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should reject registration if deadline has passed")
    void testRegisterPastDeadline() {
        Tournament tournament = new Tournament();
        tournament.setId("t1");
        tournament.setStatus(TournamentStatus.REGISTRATION_OPEN);
        tournament.setRegistrationDeadline(Instant.now().minusSeconds(3600)); // 1 hour ago

        RegisterTournamentRequest request = new RegisterTournamentRequest("team-1", null);

        when(tournamentRepository.findById("t1")).thenReturn(Optional.of(tournament));

        assertThrows(BadRequestException.class, () -> registrationService.registerTeam("t1", request, "captain_dan"));
        verify(registrationRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should reject registration if team is already registered")
    void testRegisterDuplicateTeam() {
        Game game = new Game("Valorant", "valorant", "FPS", 5, "banner.png");
        User captain = new User("captain_dan", "dan@nexus.gg", "hashed");
        Team team = new Team("Alpha Sentinels", "ALP", game, captain, null, null, "NA", "Premier");

        Tournament tournament = new Tournament();
        tournament.setId("t1");
        tournament.setStatus(TournamentStatus.REGISTRATION_OPEN);
        tournament.setGame(game);
        tournament.setMaxTeams(16);
        tournament.setCurrentTeams(4);

        RegisterTournamentRequest request = new RegisterTournamentRequest(team.getId(), null);

        when(tournamentRepository.findById("t1")).thenReturn(Optional.of(tournament));
        when(teamRepository.findById(team.getId())).thenReturn(Optional.of(team));
        when(userRepository.findByUsername("captain_dan")).thenReturn(Optional.of(captain));
        when(registrationRepository.existsByTournamentIdAndTeamId("t1", team.getId())).thenReturn(true);

        assertThrows(ConflictException.class, () -> registrationService.registerTeam("t1", request, "captain_dan"));
        verify(registrationRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should reject registration when user is not the team captain")
    void testRegisterNonCaptainForbidden() {
        Game game = new Game("Valorant", "valorant", "FPS", 5, "banner.png");
        User realCaptain = new User("captain_dan", "dan@nexus.gg", "hashed");
        User impostor = new User("impostor_bob", "bob@nexus.gg", "hashed");
        Team team = new Team("Alpha Sentinels", "ALP", game, realCaptain, null, null, "NA", "Premier");

        Tournament tournament = new Tournament();
        tournament.setId("t1");
        tournament.setStatus(TournamentStatus.REGISTRATION_OPEN);
        tournament.setGame(game);
        tournament.setMaxTeams(16);

        RegisterTournamentRequest request = new RegisterTournamentRequest(team.getId(), null);

        when(tournamentRepository.findById("t1")).thenReturn(Optional.of(tournament));
        when(teamRepository.findById(team.getId())).thenReturn(Optional.of(team));
        when(userRepository.findByUsername("impostor_bob")).thenReturn(Optional.of(impostor));

        assertThrows(ForbiddenException.class, () -> registrationService.registerTeam("t1", request, "impostor_bob"));
        verify(registrationRepository, never()).save(any());
    }
}
