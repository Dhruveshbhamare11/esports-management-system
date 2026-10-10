package com.esports.nexus.game;

import com.esports.nexus.common.ApiResponse;
import com.esports.nexus.game.dto.GameResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GameResponse>>> getAllGames() {
        List<GameResponse> games = gameService.getAllActiveGames();
        return ResponseEntity.ok(ApiResponse.ok(games));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GameResponse>> getGameById(@PathVariable String id) {
        GameResponse game = gameService.getGameById(id);
        return ResponseEntity.ok(ApiResponse.ok(game));
    }
}
