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

        if (gameRepository.count() > 0) {
            logger.info("Existing database records detected. Skipping development seeder.");
            return;
        }

        logger.info("Initializing eSports Nexus development seed data...");

        // 1. Seed Games
        Game valorant = new Game("Valorant", "valorant", "Tactical FPS", 5,
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80");
        Game cs2 = new Game("Counter-Strike 2", "cs2", "Tactical FPS", 5,
                "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80");
        Game lol = new Game("League of Legends", "lol", "MOBA", 5,
                "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80");
        Game rl = new Game("Rocket League", "rocket-league", "Vehicular Sports", 3,
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80");
        Game dota2 = new Game("Dota 2", "dota2", "MOBA", 5,
                "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80");

        gameRepository.save(valorant);
        gameRepository.save(cs2);
        gameRepository.save(lol);
        gameRepository.save(rl);
        gameRepository.save(dota2);

        // 2. Seed Demo Users
        // Default dev password is "NexusPlayer#2026" hashed with BCrypt
        String defaultHashedPassword = passwordEncoder.encode("NexusPlayer#2026");

        User captainKaizen = new User("kaizen_v", "kaizen@nexus.gg", defaultHashedPassword);
        captainKaizen.addRole(Role.CAPTAIN);
        userRepository.save(captainKaizen);

        PlayerProfile profileKaizen = new PlayerProfile(captainKaizen, "Kaizen Vanguard");
        profileKaizen.setLevel(42);
        profileKaizen.setXp(8750);
        profileKaizen.setRankTier("Apex Challenger (Division I)");
        profileKaizen.setBio("Competitive Valorant IGL & Initiator. Leading Vanguard Sentinels in Season 4.");
        profileKaizen.setAvatarUrl("https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80");
        playerProfileRepository.save(profileKaizen);

        User captainValkyrie = new User("valkyriex", "valkyrie@nexus.gg", defaultHashedPassword);
        captainValkyrie.addRole(Role.CAPTAIN);
        userRepository.save(captainValkyrie);

        PlayerProfile profileValkyrie = new PlayerProfile(captainValkyrie, "ValkyrieX");
        profileValkyrie.setLevel(38);
        profileValkyrie.setXp(7120);
        profileValkyrie.setRankTier("Master Tier");
        playerProfileRepository.save(profileValkyrie);

        User organizerUser = new User("nexus_organizer", "organizer@nexus.gg", defaultHashedPassword);
        organizerUser.addRole(Role.ORGANIZER);
        userRepository.save(organizerUser);

        PlayerProfile profileOrganizer = new PlayerProfile(organizerUser, "Nexus Tournament Ops");
        playerProfileRepository.save(profileOrganizer);

        // 3. Seed Demo Teams
        Team sentinels = new Team(
                "Vanguard Sentinels", "VNG", valorant, captainKaizen,
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
                "Premier collegiate Valorant varsity squad competing in Division I.",
                "North America", "Premier Division"
        );
        sentinels.setSeasonPoints(1420);
        sentinels.setRecruiting(false);
        teamRepository.save(sentinels);

        TeamMember member1 = new TeamMember(sentinels, captainKaizen, TeamMemberRole.CAPTAIN);
        teamMemberRepository.save(member1);
        sentinels.addMember(member1);

        Team eclipse = new Team(
                "Eclipse Syndicate", "ECL", cs2, captainValkyrie,
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&q=80",
                "European Tier-2 Counter-Strike roster focused on tactical executions.",
                "Europe West", "Master Tier"
        );
        eclipse.setSeasonPoints(1290);
        eclipse.setRecruiting(true);
        teamRepository.save(eclipse);

        TeamMember member2 = new TeamMember(eclipse, captainValkyrie, TeamMemberRole.CAPTAIN);
        teamMemberRepository.save(member2);
        eclipse.addMember(member2);

        // 4. Seed Demo Tournaments
        Tournament apexChampionship = new Tournament(
                "Nexus Apex Championship 2026", valorant, organizerUser,
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
                TournamentFormat.SINGLE_ELIMINATION, TournamentStatus.REGISTRATION_OPEN,
                "5v5", 16, "$15,000 USD", "North America",
                Instant.now().plus(14, ChronoUnit.DAYS),
                Instant.now().plus(12, ChronoUnit.DAYS),
                "The premier collegiate Valorant championship of Season 4. 16 qualifying squads."
        );
        tournamentRepository.save(apexChampionship);

        Tournament cs2Open = new Tournament(
                "Counter-Strike 2 Ironclad Open", cs2, organizerUser,
                "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
                TournamentFormat.DOUBLE_ELIMINATION, TournamentStatus.CHECK_IN_LIVE,
                "5v5", 32, "$25,000 USD", "Europe & UK",
                Instant.now().plus(8, ChronoUnit.DAYS),
                Instant.now().plus(6, ChronoUnit.DAYS),
                "Tier-2 invitational featuring Europe's highest ranked amateur squads."
        );
        tournamentRepository.save(cs2Open);

        // 5. Seed Registration
        Registration reg1 = new Registration(apexChampionship, sentinels, captainKaizen, "Varsity roster roster-checked");
        registrationRepository.save(reg1);
        apexChampionship.setCurrentTeams(1);
        tournamentRepository.save(apexChampionship);

        Registration reg2 = new Registration(cs2Open, eclipse, captainValkyrie, "Official invitation accepted");
        registrationRepository.save(reg2);
        cs2Open.setCurrentTeams(1);
        tournamentRepository.save(cs2Open);

        logger.info("eSports Nexus development seed data successfully applied.");
    }
}
