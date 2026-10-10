-- ==============================================================================
-- eSports Nexus Initial Relational Schema
-- Version: V1
-- Compliant with PRD Section 14 and MySQL 8.0+
-- ==============================================================================

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_username (username),
    INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. USER ROLES (Supports multiple roles e.g. PLAYER and CAPTAIN)
CREATE TABLE IF NOT EXISTS user_roles (
    user_id VARCHAR(36) NOT NULL,
    role VARCHAR(30) NOT NULL,
    PRIMARY KEY (user_id, role),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PLAYER PROFILES (1:1 with users)
CREATE TABLE IF NOT EXISTS player_profiles (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    banner_url VARCHAR(500),
    bio TEXT,
    level INT NOT NULL DEFAULT 1,
    xp INT NOT NULL DEFAULT 0,
    rank_tier VARCHAR(50) DEFAULT 'Unranked',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_player_profile_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. GAMES
CREATE TABLE IF NOT EXISTS games (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    genre VARCHAR(50) NOT NULL,
    team_size INT NOT NULL DEFAULT 5,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    banner_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_games_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. TEAMS
CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    tag VARCHAR(10) NOT NULL,
    game_id VARCHAR(36) NOT NULL,
    captain_id VARCHAR(36) NOT NULL,
    logo_url VARCHAR(500),
    description TEXT,
    region VARCHAR(50) NOT NULL DEFAULT 'Global',
    division VARCHAR(50) DEFAULT 'Open',
    recruiting BOOLEAN NOT NULL DEFAULT FALSE,
    season_points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_teams_game FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE RESTRICT,
    CONSTRAINT fk_teams_captain FOREIGN KEY (captain_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_teams_game (game_id),
    INDEX idx_teams_captain (captain_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    team_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'STARTER',
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_team_user (team_id, user_id),
    CONSTRAINT fk_team_members_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    CONSTRAINT fk_team_members_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_team_members_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. TEAM INVITATIONS
CREATE TABLE IF NOT EXISTS team_invitations (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    team_id VARCHAR(36) NOT NULL,
    inviter_id VARCHAR(36) NOT NULL,
    invitee_id VARCHAR(36) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    CONSTRAINT fk_invitations_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    CONSTRAINT fk_invitations_inviter FOREIGN KEY (inviter_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_invitations_invitee FOREIGN KEY (invitee_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_invitations_invitee (invitee_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. TOURNAMENTS
CREATE TABLE IF NOT EXISTS tournaments (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    game_id VARCHAR(36) NOT NULL,
    organizer_id VARCHAR(36) NOT NULL,
    banner_url VARCHAR(500),
    format VARCHAR(50) NOT NULL DEFAULT 'SINGLE_ELIMINATION',
    status VARCHAR(30) NOT NULL DEFAULT 'UPCOMING',
    team_size_format VARCHAR(20) NOT NULL DEFAULT '5v5',
    current_teams INT NOT NULL DEFAULT 0,
    max_teams INT NOT NULL DEFAULT 16,
    prize_pool VARCHAR(100),
    region VARCHAR(50) NOT NULL DEFAULT 'North America',
    start_date TIMESTAMP NOT NULL,
    registration_deadline TIMESTAMP NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_tournaments_game FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE RESTRICT,
    CONSTRAINT fk_tournaments_organizer FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_tournaments_status (status),
    INDEX idx_tournaments_game (game_id),
    INDEX idx_tournaments_start (start_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. REGISTRATIONS
CREATE TABLE IF NOT EXISTS registrations (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    tournament_id VARCHAR(36) NOT NULL,
    team_id VARCHAR(36) NOT NULL,
    registered_by_id VARCHAR(36) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    registration_notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_tournament_team (tournament_id, team_id),
    CONSTRAINT fk_reg_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
    CONSTRAINT fk_reg_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    CONSTRAINT fk_reg_user FOREIGN KEY (registered_by_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_reg_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. MATCHES
CREATE TABLE IF NOT EXISTS matches (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    tournament_id VARCHAR(36) NOT NULL,
    round_name VARCHAR(50) NOT NULL,
    round_index INT NOT NULL DEFAULT 1,
    match_number INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',
    scheduled_at TIMESTAMP NULL,
    winner_team_id VARCHAR(36) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_matches_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
    CONSTRAINT fk_matches_winner FOREIGN KEY (winner_team_id) REFERENCES teams(id) ON DELETE SET NULL,
    INDEX idx_matches_tournament_round (tournament_id, round_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. MATCH PARTICIPANTS
CREATE TABLE IF NOT EXISTS match_participants (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    match_id VARCHAR(36) NOT NULL,
    team_id VARCHAR(36) NOT NULL,
    seed INT NOT NULL DEFAULT 1,
    score INT NULL,
    is_winner BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE KEY uk_match_team (match_id, team_id),
    CONSTRAINT fk_participants_match FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    CONSTRAINT fk_participants_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. MATCH REPORTS
CREATE TABLE IF NOT EXISTS match_reports (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    match_id VARCHAR(36) NOT NULL,
    reporter_id VARCHAR(36) NOT NULL,
    reported_score_team_a INT NOT NULL,
    reported_score_team_b INT NOT NULL,
    evidence_notes TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING_CONFIRMATION',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reports_match FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_reporter FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. DISPUTES
CREATE TABLE IF NOT EXISTS disputes (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    match_id VARCHAR(36) NOT NULL,
    initiated_by_id VARCHAR(36) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    resolution_notes TEXT,
    resolved_by_id VARCHAR(36) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    CONSTRAINT fk_disputes_match FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    CONSTRAINT fk_disputes_initiator FOREIGN KEY (initiated_by_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_disputes_resolver FOREIGN KEY (resolved_by_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. COLLEGES
CREATE TABLE IF NOT EXISTS colleges (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    short_name VARCHAR(50) NOT NULL,
    mascot VARCHAR(50),
    logo_url VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. SEASONS
CREATE TABLE IF NOT EXISTS seasons (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    split_name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    prize_pool_description VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. SEASON PARTICIPANTS
CREATE TABLE IF NOT EXISTS season_participants (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    season_id VARCHAR(36) NOT NULL,
    college_id VARCHAR(36) NULL,
    team_id VARCHAR(36) NOT NULL,
    division VARCHAR(50) NOT NULL DEFAULT 'Division I',
    wins INT NOT NULL DEFAULT 0,
    losses INT NOT NULL DEFAULT 0,
    season_points INT NOT NULL DEFAULT 0,
    UNIQUE KEY uk_season_team (season_id, team_id),
    CONSTRAINT fk_sp_season FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE,
    CONSTRAINT fk_sp_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE SET NULL,
    CONSTRAINT fk_sp_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS achievements (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    rarity VARCHAR(30) NOT NULL DEFAULT 'COMMON',
    xp_reward INT NOT NULL DEFAULT 100,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. PLAYER ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS player_achievements (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    player_profile_id VARCHAR(36) NOT NULL,
    achievement_id VARCHAR(36) NOT NULL,
    unlocked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_profile_achievement (player_profile_id, achievement_id),
    CONSTRAINT fk_pa_profile FOREIGN KEY (player_profile_id) REFERENCES player_profiles(id) ON DELETE CASCADE,
    CONSTRAINT fk_pa_achievement FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    read_status BOOLEAN NOT NULL DEFAULT FALSE,
    link_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notifications_user (user_id, read_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 20. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50) NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_action (action),
    INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
