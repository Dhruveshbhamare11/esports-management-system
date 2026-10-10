package com.esports.nexus.team;

import com.esports.nexus.common.ApiResponse;
import com.esports.nexus.team.dto.CreateTeamRequest;
import com.esports.nexus.team.dto.TeamResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TeamResponse>>> getAllTeams(
            @RequestParam(required = false) String gameId,
            @RequestParam(required = false) Boolean recruiting) {
        List<TeamResponse> teams = teamService.getAllTeams(gameId, recruiting);
        return ResponseEntity.ok(ApiResponse.ok(teams));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TeamResponse>> getTeamById(@PathVariable String id) {
        TeamResponse team = teamService.getTeamById(id);
        return ResponseEntity.ok(ApiResponse.ok(team));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TeamResponse>> createTeam(
            @Valid @RequestBody CreateTeamRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        TeamResponse created = teamService.createTeam(request, username);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Team successfully created", created));
    }
}
