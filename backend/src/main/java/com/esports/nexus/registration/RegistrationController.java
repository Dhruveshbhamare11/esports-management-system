package com.esports.nexus.registration;

import com.esports.nexus.common.ApiResponse;
import com.esports.nexus.registration.dto.RegisterTournamentRequest;
import com.esports.nexus.registration.dto.RegistrationResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tournaments/{tournamentId}/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RegistrationResponse>> registerTeam(
            @PathVariable String tournamentId,
            @Valid @RequestBody RegisterTournamentRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        RegistrationResponse response = registrationService.registerTeam(tournamentId, request, username);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Roster successfully registered for tournament", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RegistrationResponse>>> getRegistrations(
            @PathVariable String tournamentId) {
        List<RegistrationResponse> registrations = registrationService.getTournamentRegistrations(tournamentId);
        return ResponseEntity.ok(ApiResponse.ok(registrations));
    }
}
