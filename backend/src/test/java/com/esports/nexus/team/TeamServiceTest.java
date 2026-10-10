package com.esports.nexus.team;

import com.esports.nexus.common.ConflictException;
import com.esports.nexus.game.Game;
import com.esports.nexus.game.GameRepository;
import com.esports.nexus.profile.PlayerProfileRepository;
import com.esports.nexus.team.dto.CreateTeamRequest;
import com.esports.nexus.team.dto.TeamResponse;
import com.esports.nexus.user.Role;
import com.esports.nexus.user.User;
import com.esports.nexus.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TeamServiceTest {

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private TeamMemberRepository teamMemberRepository;

    @Mock
    private GameRepository gameRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PlayerProfileRepository playerProfileRepository;

    private TeamService teamService;

    @BeforeEach
    void setUp() {
        teamService = new TeamService(teamRepository, teamMemberRepository, gameRepository, userRepository, playerProfileRepository);
    }

    @Test
    @DisplayName("Should create team and assign creator as CAPTAIN")
    void testCreateTeamSuccess() {
        Game game = new Game("Valorant", "valorant", "FPS", 5, "banner.jpg");
        User user = new User("kaizen", "kaizen@nexus.gg", "hashed");
        CreateTeamRequest request = new CreateTeamRequest("Apex Squad", "APX", game.getId(), "Competitive team", "NA", "logo.png");

        when(teamRepository.existsByName("Apex Squad")).thenReturn(false);
        when(teamRepository.existsByTag("APX")).thenReturn(false);
        when(gameRepository.findById(game.getId())).thenReturn(Optional.of(game));
        when(userRepository.findByUsername("kaizen")).thenReturn(Optional.of(user));
        when(teamRepository.save(any(Team.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TeamResponse response = teamService.createTeam(request, "kaizen");

        assertNotNull(response);
        assertEquals("Apex Squad", response.getName());
        assertEquals("APX", response.getTag());
        assertEquals("kaizen", response.getCaptainName());
        verify(teamRepository).save(any(Team.class));
        assertEquals(1, response.getMembersCount());
        assertTrue(user.getRoles().contains(Role.CAPTAIN));
    }

    @Test
    @DisplayName("Should reject team creation on duplicate team name")
    void testCreateTeamDuplicateName() {
        CreateTeamRequest request = new CreateTeamRequest("Existing Team", "EXT", "game-1", null, "NA", null);
        when(teamRepository.existsByName("Existing Team")).thenReturn(true);

        assertThrows(ConflictException.class, () -> teamService.createTeam(request, "captain"));
        verify(teamRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should reject team creation on duplicate team tag")
    void testCreateTeamDuplicateTag() {
        CreateTeamRequest request = new CreateTeamRequest("New Team", "EXT", "game-1", null, "NA", null);
        when(teamRepository.existsByName("New Team")).thenReturn(false);
        when(teamRepository.existsByTag("EXT")).thenReturn(true);

        assertThrows(ConflictException.class, () -> teamService.createTeam(request, "captain"));
        verify(teamRepository, never()).save(any());
    }
}
