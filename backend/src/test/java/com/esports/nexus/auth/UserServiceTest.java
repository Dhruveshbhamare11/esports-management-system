package com.esports.nexus.auth;

import com.esports.nexus.common.ConflictException;
import com.esports.nexus.common.UnauthorizedException;
import com.esports.nexus.profile.PlayerProfileRepository;
import com.esports.nexus.user.Role;
import com.esports.nexus.user.User;
import com.esports.nexus.user.UserRepository;
import com.esports.nexus.user.UserService;
import com.esports.nexus.user.dto.LoginRequest;
import com.esports.nexus.user.dto.RegisterRequest;
import com.esports.nexus.user.dto.UserResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PlayerProfileRepository playerProfileRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository, playerProfileRepository, passwordEncoder);
    }

    @Test
    @DisplayName("Should successfully register user and hash password")
    void testRegisterUserSuccess() {
        RegisterRequest request = new RegisterRequest("newplayer", "player@nexus.gg", "secret123", "PLAYER", "New Player");

        when(userRepository.existsByUsername("newplayer")).thenReturn(false);
        when(userRepository.existsByEmail("player@nexus.gg")).thenReturn(false);
        when(passwordEncoder.encode("secret123")).thenReturn("$2a$10$hashedPasswordHere");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserResponse response = userService.register(request);

        assertNotNull(response);
        assertEquals("newplayer", response.getUsername());
        assertEquals("player@nexus.gg", response.getEmail());
        assertTrue(response.getRoles().contains(Role.PLAYER));

        verify(passwordEncoder).encode("secret123");
        verify(userRepository).save(any(User.class));
        verify(playerProfileRepository).save(any());
    }

    @Test
    @DisplayName("Should throw ConflictException on duplicate username")
    void testRegisterDuplicateUsername() {
        RegisterRequest request = new RegisterRequest("existinguser", "new@nexus.gg", "secret123", "PLAYER", null);

        when(userRepository.existsByUsername("existinguser")).thenReturn(true);

        assertThrows(ConflictException.class, () -> userService.register(request));
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should throw ConflictException on duplicate email")
    void testRegisterDuplicateEmail() {
        RegisterRequest request = new RegisterRequest("newuser", "existing@nexus.gg", "secret123", "PLAYER", null);

        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("existing@nexus.gg")).thenReturn(true);

        assertThrows(ConflictException.class, () -> userService.register(request));
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should authenticate with valid credentials")
    void testAuthenticateSuccess() {
        User user = new User("validuser", "user@nexus.gg", "$2a$10$hashed");
        LoginRequest request = new LoginRequest("validuser", "correctpass");

        when(userRepository.findByUsernameOrEmail("validuser", "validuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("correctpass", "$2a$10$hashed")).thenReturn(true);

        UserResponse response = userService.authenticate(request);

        assertNotNull(response);
        assertEquals("validuser", response.getUsername());
    }

    @Test
    @DisplayName("Should throw UnauthorizedException with invalid password")
    void testAuthenticateInvalidPassword() {
        User user = new User("validuser", "user@nexus.gg", "$2a$10$hashed");
        LoginRequest request = new LoginRequest("validuser", "wrongpass");

        when(userRepository.findByUsernameOrEmail("validuser", "validuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongpass", "$2a$10$hashed")).thenReturn(false);

        assertThrows(UnauthorizedException.class, () -> userService.authenticate(request));
    }
}
