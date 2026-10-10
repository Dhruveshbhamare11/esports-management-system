package com.esports.nexus.tournament;

import com.esports.nexus.common.ApiResponse;
import com.esports.nexus.tournament.dto.CreateTournamentRequest;
import com.esports.nexus.tournament.dto.TournamentResponse;
import com.esports.nexus.tournament.dto.UpdateTournamentRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tournaments")
public class TournamentController {

    private final TournamentService tournamentService;

    public TournamentController(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TournamentResponse>>> getAllTournaments(
            @RequestParam(required = false) String gameId,
            @RequestParam(required = false) TournamentStatus status) {
        List<TournamentResponse> tournaments = tournamentService.getAllTournaments(gameId, status);
        return ResponseEntity.ok(ApiResponse.ok(tournaments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TournamentResponse>> getTournamentById(@PathVariable String id) {
        TournamentResponse tournament = tournamentService.getTournamentById(id);
        return ResponseEntity.ok(ApiResponse.ok(tournament));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TournamentResponse>> createTournament(
            @Valid @RequestBody CreateTournamentRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        TournamentResponse created = tournamentService.createTournament(request, username);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Tournament created successfully", created));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<TournamentResponse>> updateTournament(
            @PathVariable String id,
            @RequestBody UpdateTournamentRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        TournamentResponse updated = tournamentService.updateTournament(id, request, username);
        return ResponseEntity.ok(ApiResponse.ok("Tournament updated successfully", updated));
    }
}
