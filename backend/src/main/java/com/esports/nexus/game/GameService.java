package com.esports.nexus.game;

import com.esports.nexus.common.ResourceNotFoundException;
import com.esports.nexus.game.dto.GameResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Transactional(readOnly = true)
    public List<GameResponse> getAllActiveGames() {
        return gameRepository.findByActiveTrue().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public GameResponse getGameById(String id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with ID: " + id));
        return toResponse(game);
    }

    @Transactional(readOnly = true)
    public Game getGameEntityById(String id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with ID: " + id));
    }

    public GameResponse toResponse(Game game) {
        return new GameResponse(
                game.getId(),
                game.getName(),
                game.getCode(),
                game.getGenre(),
                game.getTeamSize(),
                game.isActive(),
                game.getBannerUrl()
        );
    }
}
