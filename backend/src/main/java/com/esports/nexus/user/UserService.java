package com.esports.nexus.user;

import com.esports.nexus.common.ConflictException;
import com.esports.nexus.common.ResourceNotFoundException;
import com.esports.nexus.common.UnauthorizedException;
import com.esports.nexus.profile.PlayerProfile;
import com.esports.nexus.profile.PlayerProfileRepository;
import com.esports.nexus.user.dto.LoginRequest;
import com.esports.nexus.user.dto.RegisterRequest;
import com.esports.nexus.user.dto.UserResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PlayerProfileRepository playerProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PlayerProfileRepository playerProfileRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.playerProfileRepository = playerProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ConflictException("Username is already taken: " + request.getUsername());
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email is already registered: " + request.getEmail());
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getUsername(), request.getEmail(), hashedPassword);

        // Assign additional roles if requested
        if ("CAPTAIN".equalsIgnoreCase(request.getRole())) {
            user.addRole(Role.CAPTAIN);
        } else if ("ORGANIZER".equalsIgnoreCase(request.getRole())) {
            user.addRole(Role.ORGANIZER);
        }

        User savedUser = userRepository.save(user);

        // Create initial player profile
        String displayName = request.getDisplayName() != null && !request.getDisplayName().isBlank()
                ? request.getDisplayName()
                : request.getUsername();
        PlayerProfile profile = new PlayerProfile(savedUser, displayName);
        playerProfileRepository.save(profile);

        return toUserResponse(savedUser, profile);
    }

    @Transactional(readOnly = true)
    public UserResponse authenticate(LoginRequest request) {
        User user = userRepository.findByUsernameOrEmail(request.getUsername(), request.getUsername())
                .orElseThrow(() -> new UnauthorizedException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid username or password");
        }

        PlayerProfile profile = playerProfileRepository.findByUserId(user.getId()).orElse(null);
        return toUserResponse(user, profile);
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        PlayerProfile profile = playerProfileRepository.findByUserId(userId).orElse(null);
        return toUserResponse(user, profile);
    }

    @Transactional(readOnly = true)
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        PlayerProfile profile = playerProfileRepository.findByUserId(user.getId()).orElse(null);
        return toUserResponse(user, profile);
    }

    public UserResponse toUserResponse(User user, PlayerProfile profile) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles(),
                profile != null ? profile.getDisplayName() : user.getUsername(),
                profile != null ? profile.getAvatarUrl() : null,
                profile != null ? profile.getLevel() : 1,
                profile != null ? profile.getXp() : 0,
                profile != null ? profile.getRankTier() : "Unranked"
        );
    }
}
