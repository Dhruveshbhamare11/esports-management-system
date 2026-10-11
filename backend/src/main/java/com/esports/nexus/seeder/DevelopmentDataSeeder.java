package com.esports.nexus.seeder;

import com.esports.nexus.game.Game;
import com.esports.nexus.game.GameRepository;
import com.esports.nexus.profile.PlayerProfile;
import com.esports.nexus.profile.PlayerProfileRepository;
import com.esports.nexus.registration.Registration;
import com.esports.nexus.registration.RegistrationRepository;
import com.esports.nexus.registration.RegistrationStatus;
import com.esports.nexus.team.Team;
import com.esports.nexus.team.TeamMember;
import com.esports.nexus.team.TeamMemberRepository;
import com.esports.nexus.team.TeamMemberRole;
import com.esports.nexus.team.TeamRepository;
import com.esports.nexus.tournament.Tournament;
import com.esports.nexus.tournament.TournamentFormat;
import com.esports.nexus.tournament.TournamentRepository;
import com.esports.nexus.tournament.TournamentStatus;
import com.esports.nexus.user.Role;
import com.esports.nexus.user.User;
import com.esports.nexus.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class DevelopmentDataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DevelopmentDataSeeder.class);

    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final PlayerProfileRepository playerProfileRepository;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final TournamentRepository tournamentRepository;
    private final RegistrationRepository registrationRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seeder.enabled:true}")
    private boolean seederEnabled;

    public DevelopmentDataSeeder(GameRepository gameRepository,
                                 UserRepository userRepository,
                                 PlayerProfileRepository playerProfileRepository,
                                 TeamRepository teamRepository,
                                 TeamMemberRepository teamMemberRepository,
                                 TournamentRepository tournamentRepository,
                                 RegistrationRepository registrationRepository,
                                 PasswordEncoder passwordEncoder) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.playerProfileRepository = playerProfileRepository;
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.tournamentRepository = tournamentRepository;
        this.registrationRepository = registrationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (!seederEnabled) {
            logger.info("Database seeding is disabled by configuration");
            return;
        }

        logger.info("Synchronizing eSports Nexus official games and tournaments...");

        // 1. Seed or Retrieve Canonical Games
        Game valorant = getOrCreateGame("Valorant", "valorant", "Tactical FPS", 5, "/images/games/valorant.webp");
        Game cs2 = getOrCreateGame("Counter-Strike 2", "cs2", "Tactical FPS", 5, "/images/games/counter-strike-2.webp");
        Game lol = getOrCreateGame("League of Legends", "lol", "MOBA", 5, "/images/games/league-of-legends.webp");
        Game pubgMobile = getOrCreateGame("PUBG MOBILE", "pubg-mobile", "Battle Royale", 4, "/images/games/pubg-mobile.webp");
        Game bgmi = getOrCreateGame("BGMI", "bgmi", "Battle Royale", 4, "/images/games/bgmi.webp");
        Game fortnite = getOrCreateGame("Fortnite", "fortnite", "Battle Royale", 2, "/images/games/fortnite.webp");
        Game pubg = getOrCreateGame("PUBG: BATTLEGROUNDS", "pubg-battlegrounds", "Battle Royale", 4, "/images/games/pubg-battlegrounds.webp");
        Game rl = getOrCreateGame("Rocket League", "rocket-league", "Vehicular Sports", 3, "/images/games/game-fallback.webp");
        Game dota2 = getOrCreateGame("Dota 2", "dota2", "MOBA", 5, "/images/games/game-fallback.webp");

        // 2. Seed Demo Users (if absent)
        String defaultHashedPassword = passwordEncoder.encode("NexusPlayer#2026");

        User captainKaizen = userRepository.findByUsername("kaizen_v").orElseGet(() -> {
            User u = new User("kaizen_v", "kaizen@nexus.gg", defaultHashedPassword);
            u.addRole(Role.CAPTAIN);
            userRepository.save(u);
            PlayerProfile p = new PlayerProfile(u, "Kaizen Vanguard");
            p.setLevel(42);
            p.setXp(8750);
            p.setRankTier("Apex Challenger (Division I)");
            p.setBio("Competitive Valorant IGL & Initiator. Leading Vanguard Sentinels in Season 4.");
            p.setAvatarUrl("https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80");
            playerProfileRepository.save(p);
            return u;
        });

        User captainValkyrie = userRepository.findByUsername("valkyriex").orElseGet(() -> {
            User u = new User("valkyriex", "valkyrie@nexus.gg", defaultHashedPassword);
            u.addRole(Role.CAPTAIN);
            userRepository.save(u);
            PlayerProfile p = new PlayerProfile(u, "ValkyrieX");
            p.setLevel(38);
            p.setXp(7120);
            p.setRankTier("Master Tier");
            playerProfileRepository.save(p);
            return u;
        });

        User organizerUser = userRepository.findByUsername("nexus_organizer").orElseGet(() -> {
            User u = new User("nexus_organizer", "organizer@nexus.gg", defaultHashedPassword);
            u.addRole(Role.ORGANIZER);
            userRepository.save(u);
            PlayerProfile p = new PlayerProfile(u, "Nexus Tournament Ops");
            playerProfileRepository.save(p);
            return u;
        });

        // 3. Seed Demo Teams (if absent)
        Team sentinels = teamRepository.findByTag("VNG").orElseGet(() -> {
            Team t = new Team(
                    "Vanguard Sentinels", "VNG", valorant, captainKaizen,
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
                    "Premier collegiate Valorant varsity squad competing in Division I.",
                    "North America", "Premier Division"
            );
            t.setSeasonPoints(1420);
            t.setRecruiting(false);
            teamRepository.save(t);
            TeamMember m = new TeamMember(t, captainKaizen, TeamMemberRole.CAPTAIN);
            teamMemberRepository.save(m);
            t.addMember(m);
            return t;
        });

        Team eclipse = teamRepository.findByTag("ECL").orElseGet(() -> {
            Team t = new Team(
                    "Eclipse Syndicate", "ECL", cs2, captainValkyrie,
                    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&q=80",
                    "European Tier-2 Counter-Strike roster focused on tactical executions.",
                    "Europe West", "Master Tier"
            );
            t.setSeasonPoints(1290);
            t.setRecruiting(true);
            teamRepository.save(t);
            TeamMember m = new TeamMember(t, captainValkyrie, TeamMemberRole.CAPTAIN);
            teamMemberRepository.save(m);
            t.addMember(m);
            return t;
        });

        // 4. Seed Canonical Tournaments Idempotently
        seedTournamentIfMissing(
                "PUBG MOBILE — Battle Royale Championship",
                pubgMobile, organizerUser, "/images/games/pubg-mobile.webp",
                TournamentFormat.ROUND_ROBIN, TournamentStatus.REGISTRATION_OPEN,
                "4v4 Squads", 25, "$20,000 USD", "South Asia / Global",
                Instant.now().plus(14, ChronoUnit.DAYS), Instant.now().plus(12, ChronoUnit.DAYS),
                "Official community championship for PUBG MOBILE. 25 elite squads battle across Erangel and Miramar with standard competitive point matrices."
        );

        seedTournamentIfMissing(
                "BGMI — India Squad Showdown",
                bgmi, organizerUser, "/images/games/bgmi.webp",
                TournamentFormat.SINGLE_ELIMINATION, TournamentStatus.CHECK_IN_LIVE,
                "4v4 Squads", 20, "15,000 PTS / $12,500 USD", "India / South Asia",
                Instant.now().plus(7, ChronoUnit.DAYS), Instant.now().plus(5, ChronoUnit.DAYS),
                "High-octane BGMI battle royale showdown featuring top tier roster matchups, real-time broadcast telemetry, and anti-cheat verification."
        );

        Tournament valTournament = seedTournamentIfMissing(
                "VALORANT — Tactical Masters Cup",
                valorant, organizerUser, "/images/games/valorant.webp",
                TournamentFormat.SINGLE_ELIMINATION, TournamentStatus.REGISTRATION_OPEN,
                "5v5", 16, "$15,000 USD", "North America",
                Instant.now().plus(18, ChronoUnit.DAYS), Instant.now().plus(15, ChronoUnit.DAYS),
                "Premier tactical FPS showcase. 16 qualifying collegiate and amateur rosters face off in double-elimination bracket play."
        );

        Tournament cs2Tournament = seedTournamentIfMissing(
                "Counter-Strike 2 — Elite Strike Series",
                cs2, organizerUser, "/images/games/counter-strike-2.webp",
                TournamentFormat.DOUBLE_ELIMINATION, TournamentStatus.IN_PROGRESS,
                "5v5", 32, "$25,000 USD", "Europe & UK",
                Instant.now().plus(5, ChronoUnit.DAYS), Instant.now().plus(3, ChronoUnit.DAYS),
                "Tier-2 invitational featuring Europe's highest ranked amateur squads on dedicated 128-tick tournament servers."
        );

        seedTournamentIfMissing(
                "League of Legends — Rift Champions",
                lol, organizerUser, "/images/games/league-of-legends.webp",
                TournamentFormat.SINGLE_ELIMINATION, TournamentStatus.UPCOMING,
                "5v5", 16, "$10,000 USD + Scholarships", "Global / Collegiate",
                Instant.now().plus(25, ChronoUnit.DAYS), Instant.now().plus(22, ChronoUnit.DAYS),
                "Summoner's Rift competitive invitational featuring best-of-3 quarter-finals and best-of-5 championship matches."
        );

        seedTournamentIfMissing(
                "Fortnite — Zero Build Open",
                fortnite, organizerUser, "/images/games/fortnite.webp",
                TournamentFormat.ROUND_ROBIN, TournamentStatus.REGISTRATION_OPEN,
                "2v2 Duos", 50, "$18,000 USD", "Global Online",
                Instant.now().plus(10, ChronoUnit.DAYS), Instant.now().plus(8, ChronoUnit.DAYS),
                "High-mobility Zero Build tournament testing gunplay, movement mechanics, and rotational awareness in custom private lobbies."
        );

        // 5. Seed Initial Registrations if Tournament is empty
        if (valTournament != null && valTournament.getCurrentTeams() == 0) {
            Registration reg1 = new Registration(valTournament, sentinels, captainKaizen, "Varsity roster verified");
            registrationRepository.save(reg1);
            valTournament.setCurrentTeams(1);
            tournamentRepository.save(valTournament);
        }

        if (cs2Tournament != null && cs2Tournament.getCurrentTeams() == 0) {
            Registration reg2 = new Registration(cs2Tournament, eclipse, captainValkyrie, "Official invitation accepted");
            registrationRepository.save(reg2);
            cs2Tournament.setCurrentTeams(1);
            tournamentRepository.save(cs2Tournament);
        }

        logger.info("eSports Nexus games and tournament sync completed successfully.");
    }

    private Game getOrCreateGame(String name, String code, String genre, int teamSize, String bannerUrl) {
        return gameRepository.findByCode(code).orElseGet(() -> {
            Game g = new Game(name, code, genre, teamSize, bannerUrl);
            return gameRepository.save(g);
        });
    }

    private Tournament seedTournamentIfMissing(
            String title, Game game, User organizer, String bannerUrl,
            TournamentFormat format, TournamentStatus status,
            String teamSizeFormat, int maxTeams, String prizePool, String region,
            Instant startDate, Instant registrationDeadline, String description) {

        if (tournamentRepository.existsByTitle(title)) {
            return null;
        }

        Tournament tournament = new Tournament(
                title, game, organizer, bannerUrl,
                format, status, teamSizeFormat, maxTeams,
                prizePool, region, startDate, registrationDeadline, description
        );
        return tournamentRepository.save(tournament);
    }
}
