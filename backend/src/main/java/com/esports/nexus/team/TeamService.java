package com.esports.nexus.team;

import com.esports.nexus.common.ConflictException;
import com.esports.nexus.common.ResourceNotFoundException;
import com.esports.nexus.game.Game;
import com.esports.nexus.game.GameRepository;
import com.esports.nexus.profile.PlayerProfile;
import com.esports.nexus.profile.PlayerProfileRepository;
import com.esports.nexus.team.dto.CreateTeamRequest;
import com.esports.nexus.team.dto.TeamMemberResponse;
import com.esports.nexus.team.dto.TeamResponse;
import com.esports.nexus.user.Role;
import com.esports.nexus.user.User;
import com.esports.nexus.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final PlayerProfileRepository playerProfileRepository;

    public TeamService(TeamRepository teamRepository,
                       TeamMemberRepository teamMemberRepository,
                       GameRepository gameRepository,
                       UserRepository userRepository,
                       PlayerProfileRepository playerProfileRepository) {
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.playerProfileRepository = playerProfileRepository;
    }

    @Transactional(readOnly = true)
    public List<TeamResponse> getAllTeams(String gameId, Boolean recruiting) {
        List<Team> teams;
        if (gameId != null && !gameId.isBlank()) {
            if (Boolean.TRUE.equals(recruiting)) {
                teams = teamRepository.findByGameIdAndRecruitingTrue(gameId);
            } else {
                teams = teamRepository.findByGameId(gameId);
            }
        } else if (Boolean.TRUE.equals(recruiting)) {
            teams = teamRepository.findByRecruitingTrue();
        } else {
            teams = teamRepository.findAll();
        }

        return teams.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TeamResponse getTeamById(String id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with ID: " + id));
        return toResponse(team);
    }

    @Transactional
    public TeamResponse createTeam(CreateTeamRequest request, String captainUsername) {
        if (teamRepository.existsByName(request.getName())) {
            throw new ConflictException("Team name already registered: " + request.getName());
        }
        if (teamRepository.existsByTag(request.getTag())) {
            throw new ConflictException("Team tag already in use: " + request.getTag());
        }

        Game game = gameRepository.findById(request.getGameId())
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with ID: " + request.getGameId()));

        User captain = userRepository.findByUsername(captainUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Captain user not found: " + captainUsername));

        // Ensure user has CAPTAIN role
        if (!captain.getRoles().contains(Role.CAPTAIN)) {
            captain.addRole(Role.CAPTAIN);
            userRepository.save(captain);
        }

        Team team = new Team(
                request.getName(),
                request.getTag().toUpperCase(),
                game,
                captain,
                request.getLogoUrl(),
                request.getDescription(),
                request.getRegion(),
                "Premier Division"
        );

        // Add captain as initial team member (persisted via cascade)
        TeamMember captainMember = new TeamMember(team, captain, TeamMemberRole.CAPTAIN);
        team.addMember(captainMember);

        Team savedTeam = teamRepository.save(team);

        return toResponse(savedTeam);
    }

    public TeamResponse toResponse(Team team) {
        List<TeamMemberResponse> memberResponses = team.getMembers().stream()
                .map(m -> {
                    PlayerProfile profile = playerProfileRepository.findByUserId(m.getUser().getId()).orElse(null);
                    return new TeamMemberResponse(
                            m.getId(),
                            m.getUser().getId(),
                            m.getUser().getUsername(),
                            profile != null ? profile.getDisplayName() : m.getUser().getUsername(),
                            profile != null ? profile.getAvatarUrl() : null,
                            m.getRole(),
                            m.getJoinedAt()
                    );
                })
                .collect(Collectors.toList());

        return new TeamResponse(
                team.getId(),
                team.getName(),
                team.getTag(),
                team.getGame().getId(),
                team.getGame().getName(),
                team.getGame().getCode(),
                team.getCaptain().getId(),
                team.getCaptain().getUsername(),
                team.getLogoUrl(),
                team.getDescription(),
                team.getRegion(),
                team.getDivision(),
                team.isRecruiting(),
                team.getSeasonPoints(),
                memberResponses.size(),
                memberResponses
        );
    }
}
