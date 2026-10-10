# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# eSports Nexus — 3D Gamified eSports Management Platform

**Project Type:** Full-stack web application  
**Development Method:** AI-assisted vibe coding using Google Antigravity  
**Frontend:** React + TypeScript + Vite  
**Backend:** Java + Spring Boot  
**Database:** MySQL  
**Design Direction:** Premium gaming UI + immersive 3D + modern SaaS dashboard  
**Target Audience:** College eSports communities, amateur players, teams, tournament organizers, and gaming clubs

---

# 1. PROJECT VISION

## 1.1 Product Overview

Build a premium, fully functional eSports management platform that brings players, teams, tournaments, match schedules, competitive rankings, and gaming communities together in one centralized application.

The website must combine the visual quality of a modern gaming platform with the usability and reliability of a professional management system.

It should not look like a generic admin dashboard, a basic college project, or a collection of unrelated UI templates.

Every major screen must feel like part of one consistent gaming ecosystem.

The platform should support two equally important experiences:

1. **Public gaming experience:** Discover tournaments, explore teams, view competitive rankings, inspect player profiles, and browse matches.
2. **Authenticated management experience:** Create teams, register for tournaments, manage rosters, schedule matches, submit scores, resolve disputes, and manage competitions.

The system must use real backend APIs and persistent database records. Demo data may be used initially, but it must be loaded from the backend rather than permanently hardcoded into the frontend.

## 1.2 Product Mission

Make competitive gaming easier to organize, easier to join, and more engaging to experience.

## 1.3 Core Value Proposition

A unified platform where players build their competitive identity, teams discover opportunities, and organizers run tournaments with less manual effort.

## 1.4 Product Differentiators

- Persistent player profiles with verified tournament histories.
- A team finder for players looking for teammates.
- Tournament registration and automated bracket generation.
- Verified match reporting and dispute resolution.
- College leagues and season-based rankings.
- Gamified achievements, experience points, and progression.
- Immersive 3D design and premium gaming visuals.

---

# 2. DESIGN REFERENCE AND VISUAL DIRECTION

Use the visual references previously discussed in the project conversation as inspiration for the overall quality and style: dark gaming dashboards, tournament bracket interfaces, player statistics, esports profiles, and cinematic competitive gaming websites.

The implementation should combine the strongest elements of these references into one coherent design system rather than copying unrelated layouts from multiple templates.

## 2.1 Visual Identity

The product should feel futuristic, competitive, premium, immersive, and technically sophisticated.

### Color palette

- Primary background: `#080B14`
- Secondary background: `#0D1220`
- Card background: `#111827`
- Elevated surface: `#172033`
- Primary accent: `#8B5CF6`
- Secondary accent: `#06B6D4`
- Highlight accent: `#A3E635`
- Primary text: `#F8FAFC`
- Secondary text: `#94A3B8`
- Border color: `rgba(148, 163, 184, 0.16)`
- Error state: `#F87171`
- Success state: `#34D399`

Use purple and cyan as the dominant accent combination. Lime should be reserved for selected competitive highlights, active indicators, or special achievements.

Do not use every accent color everywhere.

### Background treatment

Use a combination of:

- Deep navy and near-black backgrounds.
- Subtle radial gradients.
- Fine grid patterns.
- Very restrained noise or grain textures.
- Soft ambient glow behind important elements.
- Layered panels with controlled transparency.
- Carefully selected gaming imagery.

Avoid excessive gradients, glowing borders around every card, or backgrounds that compete with the content.

### Typography

Use a bold display font for headlines and a clean sans-serif for interface content.

Recommended combination:

- Display: Space Grotesk or Sora.
- Interface and body: Inter or Manrope.
- Numeric statistics: a consistent tabular-numeric style.

Use large typography only for important headings, hero copy, tournament names, and key statistics.

Maintain a clear hierarchy across every page.

## 2.2 Design Principles

1. The interface must look premium before any animation begins.
2. Information must remain readable against dark backgrounds.
3. Every screen must share the same navigation, spacing, colors, and component language.
4. Gamification must enhance the experience, not obstruct normal tasks.
5. 3D effects must be purposeful and performant.
6. Important actions must always be easy to find.
7. Desktop layouts should feel expansive, while mobile layouts must remain genuinely usable.
8. Every visible button, link, filter, tab, and menu must have a defined behavior.
9. Use real, relevant gaming imagery rather than generic placeholder graphics wherever possible.
10. Do not use emoji as a substitute for professional icons or game artwork.

---

# 3. 3D AND GAMIFICATION STRATEGY

3D should be a signature visual feature, not an excuse to overload every page with heavy animations.

## 3.1 Homepage 3D Hero

Create a cinematic hero section containing:

- A large, immersive 3D gaming-inspired object.
- A futuristic trophy, holographic arena, abstract energy core, or floating geometric gaming structure.
- Controlled lighting and purple-cyan reflections.
- A subtle camera movement or mouse-responsive parallax effect.
- Small floating particles or decorative energy elements.
- A strong headline and two clear calls to action.
- An atmospheric background that does not reduce text contrast.

Suggested hero headline:

**ENTER THE ARENA. OWN YOUR LEGACY.**

Supporting copy:

Discover tournaments, build your squad, compete with the community, and track your journey through competitive gaming.

Primary CTA: `Explore Tournaments`

Secondary CTA: `Build Your Team`

The 3D object must not overlap the main text or interfere with navigation.

Use React Three Fiber and Three.js if a genuine interactive 3D scene adds meaningful value. Use optimized GLB/GLTF models, lightweight procedural geometry, or CSS-based depth effects as appropriate.

Do not make the entire application dependent on a massive 3D asset.

## 3.2 Motion and Interaction

Implement:

- Smooth page transitions where appropriate.
- Subtle card elevation and tilt on desktop hover.
- Animated tab indicators.
- Staggered entrance animations for hero content.
- Animated counters for important statistics.
- Smooth modal and drawer transitions.
- Progress animations for player levels and tournament completion.
- Lightweight particle or ambient effects in selected areas.
- Animated bracket progression when results are finalized.
- Loading skeletons and polished empty states.

Use Framer Motion, now commonly imported through the `motion` package, or another compatible motion library.

Respect the user's reduced-motion preference. Disable unnecessary parallax and elaborate motion on devices where it harms accessibility or performance.

## 3.3 Gamification System

Build a meaningful competitive progression system.

Each player may have:

- XP (experience points).
- A level.
- Achievements.
- Tournament participation history.
- Verified match statistics.
- Earned badges.
- Seasonal ranking.

Example achievement concepts:

- First Blood: first verified match win.
- Squad Leader: captain of an active team.
- Tournament Veteran: participation in multiple tournaments.
- Undefeated Run: a defined winning streak.
- Champion: winner of a completed tournament.

Achievements must be awarded by backend rules or authorized administrative actions, not by arbitrary frontend state.

XP and levels are a progression feature. They must not be presented as an official skill rating unless a separate rating algorithm has been implemented.

---

# 4. TECHNOLOGY STACK

Use the following architecture unless the existing repository contains a compatible implementation that should be preserved.

## 4.1 Frontend

- React.
- TypeScript.
- Vite.
- React Router.
- Tailwind CSS.
- shadcn/ui where appropriate.
- Lucide React icons.
- Framer Motion or Motion.
- React Three Fiber.
- Three.js.
- Drei helpers for React Three Fiber.
- TanStack Query for API data fetching and caching.
- React Hook Form.
- Zod for form validation.
- Recharts for analytics.
- A lightweight toast notification library.

Use a consistent set of dependencies. Avoid installing multiple libraries that solve the same problem.

Do not blindly install every suggested package. Check compatibility with the existing repository and current package versions.

## 4.2 Backend

- Java 21 LTS.
- Spring Boot.
- Spring Web.
- Spring Security.
- Spring Data JPA.
- Hibernate.
- Bean Validation.
- Maven.
- Flyway for database migrations.
- JUnit 5 and Mockito.
- Spring Boot Actuator where appropriate.

The backend must enforce all important business rules.

## 4.3 Database

Use MySQL for persistent data.

Primary tables should include:

- users
- player_profiles
- games
- teams
- team_members
- tournaments
- registrations
- matches
- match_participants
- match_reports
- disputes
- achievements
- player_achievements
- notifications
- seasons
- colleges
- audit_logs

Create proper foreign keys, indexes, unique constraints, and transactional operations.

Do not use browser local storage as a replacement for the database.

Local storage may be used for harmless UI preferences such as a theme selection, but not as the authoritative storage for users, teams, scores, or tournament registrations.

## 4.4 Integration and Development Tools

- Git and GitHub.
- Postman.
- MySQL Workbench.
- IntelliJ IDEA or VS Code.
- Google Antigravity.
- Environment variables for configuration.
- Docker Compose as an optional development setup.

---

# 5. APPLICATION ARCHITECTURE

Implement a modular monolith initially.

The React frontend communicates with Spring Boot through HTTP APIs. Spring Boot validates requests, applies business rules, manages authorization, and reads or writes data using JPA and MySQL.

Request flow:

React UI → API client → Spring Boot controller → service layer → repository → MySQL.

Responses return through the same chain.

## 5.1 Backend Architecture Rules

- Controllers must not contain large blocks of business logic.
- Services must implement tournament and team rules.
- Repositories must handle database access.
- DTOs must be used for appropriate API request and response objects.
- Entities must not be exposed carelessly to the frontend.
- Use centralized exception handling.
- Validate all external input.
- Use transactions for operations involving multiple related records.
- Implement pagination for potentially large lists.
- Use consistent API response and error formats.
- Keep configuration and secrets outside source code.

## 5.2 Authentication

Implement secure authentication using Spring Security.

Use either:

- Secure session-based authentication with HTTP-only cookies; or
- A carefully implemented token-based strategy when needed.

For a same-site React and Spring Boot application, session authentication is a reasonable initial choice.

Never store passwords in plaintext.

Implement role-based authorization for:

- PLAYER
- CAPTAIN
- ORGANIZER
- ADMIN

A captain may also be a player. Model this correctly so that permissions do not unnecessarily exclude overlapping responsibilities.

Public pages may be viewed without login. Sensitive management actions must require appropriate authorization.

---

# 6. INFORMATION ARCHITECTURE AND ROUTES

Create a complete route structure.

## 6.1 Public Routes

- `/` — Home.
- `/tournaments` — Tournament discovery.
- `/tournaments/:id` — Tournament details.
- `/matches` — Match schedule and results.
- `/leaderboards` — Competitive standings.
- `/teams` — Team discovery.
- `/teams/:id` — Team profile.
- `/players/:id` — Public player profile.
- `/seasons` — College and community seasons.
- `/login` — Login.
- `/register` — Account registration.

## 6.2 Player Routes

- `/dashboard` — Player overview.
- `/dashboard/profile` — Profile settings.
- `/dashboard/teams` — My teams.
- `/dashboard/registrations` — My tournament registrations.
- `/dashboard/matches` — My matches.
- `/dashboard/achievements` — Achievements and progression.
- `/dashboard/notifications` — Notifications.

## 6.3 Captain Routes

- `/team/manage/:id` — Team management.
- `/team/manage/:id/roster` — Roster management.
- `/team/manage/:id/invitations` — Invitations.
- `/team/manage/:id/tournaments` — Team registrations.

## 6.4 Organizer Routes

- `/organizer` — Organizer dashboard.
- `/organizer/tournaments` — Managed tournaments.
- `/organizer/tournaments/create` — Tournament creation.
- `/organizer/tournaments/:id` — Tournament administration.
- `/organizer/tournaments/:id/registrations` — Registration management.
- `/organizer/tournaments/:id/bracket` — Bracket management.
- `/organizer/tournaments/:id/matches` — Match administration.
- `/organizer/tournaments/:id/disputes` — Dispute queue.
- `/organizer/analytics` — Analytics.

## 6.5 Admin Routes

- `/admin` — Platform overview.
- `/admin/users` — User management.
- `/admin/games` — Game management.
- `/admin/tournaments` — Tournament moderation.
- `/admin/disputes` — Platform-wide dispute management.
- `/admin/audit-logs` — Audit history.

Use protected route guards for user experience, but enforce permissions on the backend as well.

---

# 7. HOMEPAGE EXPERIENCE

The homepage is the most important visual showcase.

It must communicate the product's identity within a few seconds and immediately give users a way to discover competitions.

## Section 1: Premium Navigation

Build a floating or carefully integrated dark navigation bar.

Include:

- Product logo and wordmark.
- Home.
- Tournaments.
- Teams.
- Leaderboards.
- Seasons.
- Login or profile menu.
- Primary CTA for tournament discovery or registration.

Requirements:

- Transparent or translucent appearance over the hero.
- Subtle border and backdrop blur.
- Clear active navigation state.
- Responsive mobile menu.
- Keyboard-accessible interactions.
- Sticky behavior where useful.

Do not make the navigation so tall that it consumes the hero.

## Section 2: Cinematic Hero

Create a split or layered composition.

Left side:

- Small live/community indicator.
- Large headline.
- Supporting copy.
- Primary and secondary CTA.
- Optional trust indicators or community statistics.

Right side:

- Interactive 3D trophy or arena object.
- Ambient particles.
- Layered depth.
- Controlled lighting.
- Small floating interface elements if they remain readable.

Include a subtle downward scroll cue.

Avoid fake live-player counts or unsupported claims such as thousands of active users.

## Section 3: Competitive Snapshot

Create a row of statistics or compact data panels.

Possible values:

- Upcoming tournaments.
- Registered teams.
- Completed matches.
- Active seasons.

These values must come from the backend or be clearly identified as sample demo data during development.

Use small animations, clear labels, and restrained accent colors.

## Section 4: Featured Tournaments

Create a premium tournament showcase.

Each tournament card should display:

- Game artwork or event banner.
- Tournament name.
- Game title.
- Format.
- Registration status.
- Start date.
- Team capacity or registration count.
- Prize information only when configured.
- View details CTA.
- Registration CTA when the user is eligible.

Cards should feel like gaming event posters integrated into a structured interface.

Use image overlays only where needed for readability.

## Section 5: Tournament Bracket Preview

Display a compact bracket preview or a visual progression from quarterfinals to the final.

Use realistic sample matchups from seeded data.

Provide a link to the complete tournament bracket.

Do not implement the bracket as an unstructured list of team names.

## Section 6: Top Teams and Players

Create horizontal cards or a responsive grid showing:

- Team emblem or avatar.
- Team name.
- Game.
- Verified match record.
- Ranking or season points.
- Public profile link.

Use meaningful visual distinctions without assigning invented official rankings.

## Section 7: Player Progression Preview

Introduce the Player Passport concept.

Show a sample profile with:

- Level and XP.
- Achievement badges.
- Match history.
- Win/loss statistics.
- Competitive milestones.

Use demo data that is clearly marked as a preview.

## Section 8: Team Finder

Show players who have opted into recruitment discovery.

Allow visitors to filter by:

- Game.
- Preferred role.
- Region.
- Availability.
- Experience range.

Respect privacy settings. Never expose private contact information or sensitive account details.

## Section 9: College League

Introduce the season and college competition system.

Include:

- Participating colleges.
- Current standings.
- Upcoming fixtures.
- Season progress.
- Join or learn-more CTA.

Only display actual colleges and real participation records once verified data is available. Otherwise use clearly labeled demo records.

## Section 10: Final CTA and Footer

Use a visually striking final section inviting users to join the platform.

Footer should include:

- Navigation.
- Help and support.
- Privacy policy.
- Terms of service.
- Contact information.
- Social links only when configured.

The complete homepage must feel balanced. Do not turn every section into an oversized animated banner.

---

# 8. TOURNAMENT DISCOVERY AND DETAILS

## 8.1 Discovery Page

Create a searchable and filterable tournament listing.

Filters:

- Game.
- Tournament status.
- Registration status.
- Format.
- Date range.
- Region where relevant.

Include:

- Search field.
- Sort controls.
- Filter chips.
- Responsive tournament grid.
- Pagination or progressive loading.
- Loading skeletons.
- Empty states.
- Error states.

Filters must actually change the displayed data and be connected to backend query parameters where appropriate.

## 8.2 Tournament Details

Display:

- Event banner.
- Tournament title.
- Organizer.
- Game.
- Description.
- Rules.
- Format.
- Registration deadline.
- Start and end dates.
- Team size.
- Registration capacity.
- Current status.
- Prize information if applicable.
- Registered participants where public.
- Match schedule.
- Bracket.
- Final standings.

Registration must validate:

- User authentication.
- Organizer-defined eligibility.
- Team membership.
- Roster size.
- Registration deadline.
- Duplicate registrations.
- Tournament capacity.
- Current tournament status.

Use a clear registration status such as Pending, Approved, Rejected, Checked In, or Withdrawn as appropriate to the workflow.

Do not treat clicking the registration button as proof that a registration has succeeded. Wait for the backend response and display the correct status.

---

# 9. TEAM MANAGEMENT AND PLAYER PASSPORT

## 9.1 Team Creation

Users should be able to create teams with:

- Team name.
- Logo or avatar.
- Game.
- Description.
- Preferred region.
- Recruitment status.
- Roster.
- Captain designation.

Validate names, duplicate membership, game compatibility, and roster limits.

## 9.2 Roster Management

Implement:

- Invitations.
- Invitation acceptance and rejection.
- Member removal with appropriate permissions.
- Captain role changes.
- Membership history where useful.
- Recruitment status.
- Roster validation.

Do not allow a user to join a team without an authorized invitation or permitted joining workflow.

## 9.3 Smart Team Finder

Create a searchable player directory for users who have opted into discovery.

Match profiles based on:

- Game.
- Preferred role.
- Region.
- Availability.
- Language preferences where appropriate.
- Experience range.

Begin with a transparent rule-based matching score. Do not claim AI-powered recommendations unless an actual recommendation system exists.

## 9.4 Player Passport

Each player should have a public profile with:

- Avatar and gaming identity.
- Supported games.
- Current team.
- Verified tournament participation.
- Match history.
- Win/loss record.
- Achievements.
- Season points.
- Recent milestones.

Statistics must be calculated from appropriate backend records.

Clearly separate verified statistics from manually entered profile information.

---

# 10. MATCH BRACKETS AND RESULT MANAGEMENT

## 10.1 Bracket Engine

Initially support single-elimination tournaments.

The bracket generator must:

- Accept eligible registered teams.
- Validate participant counts.
- Support non-power-of-two participant counts.
- Assign byes when required.
- Create valid first-round matches.
- Determine winners from verified results.
- Advance winners to the appropriate next-round matches.
- Track tournament completion.
- Prevent duplicate or invalid match progression.

Add round robin and double elimination after the first format is reliable.

Bracket generation must be performed by the backend, not simulated only in the React interface.

## 10.2 Match Management

Each match should include:

- Match ID.
- Tournament.
- Round.
- Participants.
- Scheduled start.
- Match status.
- Scores.
- Winner.
- Result submission history.
- Relevant timestamps.

Suggested statuses:

- Scheduled.
- Ready.
- Live.
- Awaiting Result.
- Under Dispute.
- Completed.
- Cancelled.

Only implement statuses that correspond to actual supported transitions.

## 10.3 Result Verification

Support a defined workflow:

1. Authorized participant submits the score.
2. Opponent confirms or disputes the result.
3. The organizer reviews disputed results.
4. An authorized decision finalizes the score.
5. The bracket and standings update.
6. An audit record captures the decision.

Where evidence is supported, store file metadata and protected references rather than public filesystem paths.

Use transactions to prevent inconsistent bracket progression.

---

# 11. LEADERBOARDS, SEASONS, AND ACHIEVEMENTS

## 11.1 Leaderboards

Provide separate views for:

- Players.
- Teams.
- Games.
- Tournaments.
- College seasons.

Each leaderboard should state what is being ranked and how points are calculated.

## 11.2 Season Management

Organizers should be able to create seasons and define:

- Season name.
- Start and end dates.
- Eligible games.
- Participating colleges or teams.
- Scoring rules.
- Scheduled competitions.
- Season standings.

The backend should calculate standings using verified tournament results and the configured scoring policy.

## 11.3 Achievements

Create a small initial collection of achievements.

Award achievements through deterministic backend rules.

Prevent duplicate achievement awards and keep a record of when an achievement was earned.

Do not build a complex economy, purchasable XP, or paid loot-box system.

---

# 12. ORGANIZER DASHBOARD

The organizer dashboard should use the same premium visual system but prioritize speed, clarity, and management tasks.

Display:

- Total managed tournaments.
- Upcoming matches.
- Pending registrations.
- Matches awaiting results.
- Open disputes.
- Tournament completion progress.
- Registration trends.
- Recent administrative activity.

Include quick actions:

- Create Tournament.
- Manage Registrations.
- Generate Bracket.
- Schedule Match.
- Review Results.
- Resolve Dispute.

Use charts only where they provide useful information.

All statistics must be based on real backend queries or clearly labeled sample data.

Include loading, empty, and error states for every major data panel.

---

# 13. ADMIN DASHBOARD

Implement administrative functions for:

- User management.
- Role management.
- Game management.
- Tournament moderation.
- Dispute oversight.
- Abuse and fair-play reports.
- Audit logs.
- Basic system health.

Sensitive operations require backend authorization and should generate audit records.

Avoid hard deletion of important competitive records when a reversible status change or soft-delete workflow is more appropriate.

The admin dashboard should be efficient and readable, rather than overloaded with unnecessary animations.

---

# 14. DATABASE AND API REQUIREMENTS

## 14.1 Initial Database Schema

Design relational tables for:

- users
- player_profiles
- games
- teams
- team_members
- team_invitations
- tournaments
- registrations
- matches
- match_participants
- match_reports
- disputes
- seasons
- colleges
- season_participants
- achievements
- player_achievements
- notifications
- audit_logs

Define primary keys, foreign keys, unique constraints, appropriate indexes, and relationships before building advanced features.

Use Flyway migrations to version the schema.

Do not automatically overwrite a developer's existing database during startup.

## 14.2 API Structure

Use versioned REST APIs.

Example endpoints:

### Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

### Games and Tournaments

- `GET /api/v1/games`
- `GET /api/v1/tournaments`
- `GET /api/v1/tournaments/{id}`
- `POST /api/v1/tournaments`
- `PATCH /api/v1/tournaments/{id}`
- `POST /api/v1/tournaments/{id}/registrations`

### Teams

- `GET /api/v1/teams`
- `GET /api/v1/teams/{id}`
- `POST /api/v1/teams`
- `POST /api/v1/teams/{id}/invitations`
- `PATCH /api/v1/teams/{id}/members/{memberId}`

### Matches

- `GET /api/v1/tournaments/{id}/matches`
- `POST /api/v1/tournaments/{id}/bracket`
- `POST /api/v1/matches/{id}/reports`
- `POST /api/v1/matches/{id}/confirm`
- `POST /api/v1/matches/{id}/disputes`

### Rankings and Profiles

- `GET /api/v1/leaderboards`
- `GET /api/v1/players/{id}`
- `GET /api/v1/players/{id}/matches`
- `GET /api/v1/players/{id}/achievements`

These are proposed API contracts. Implement them according to the chosen authorization and data model.

Use appropriate HTTP status codes and meaningful error messages. Validate every endpoint on the server.

---

# 15. DUMMY DATA AND DEMO MODE

Create a repeatable development dataset containing:

- 30–50 demo users.
- 4–6 games.
- 8–12 teams.
- 6–10 tournaments.
- Upcoming and completed tournaments.
- Realistic registration records.
- Match schedules and finalized scores.
- Leaderboard data derived from those results.
- Example player achievements.
- A small number of disputed matches.

Keep IDs and foreign-key relationships consistent.

Use development-only seed mechanisms or versioned seed scripts.

Do not ship a publicly accessible default administrator account with a known password.

Provide safe local development instructions for creating demo accounts.

All important application features must read and write through the backend and database.

When no data exists, display polished empty states instead of invented production statistics.

---

# 16. UI COMPONENT SYSTEM

Build reusable components before implementing every page independently.

Suggested shared components:

- AppShell.
- PublicNavbar.
- DashboardSidebar.
- MobileNavigation.
- HeroSection.
- TournamentCard.
- TournamentStatusBadge.
- TeamCard.
- PlayerCard.
- MatchCard.
- BracketView.
- LeaderboardTable.
- PlayerLevelCard.
- AchievementBadge.
- SearchBar.
- FilterPanel.
- Modal.
- ConfirmationDialog.
- ToastNotifications.
- LoadingSkeleton.
- EmptyState.
- ErrorState.
- Pagination.
- DataTable.
- StatCard.
- ChartPanel.
- FormField.

Define shared spacing, colors, typography, border radii, shadows, animation durations, and focus styles.

Avoid recreating the same component with slightly different styles on every page.

Create a consistent icon policy using Lucide React. Use real game logos or suitable licensed artwork where available.

---

# 17. IMAGE AND ASSET STRATEGY

The quality of the images is a major part of the product's visual identity.

Use relevant assets for:

- The homepage hero.
- Featured game banners.
- Tournament posters.
- Team logos.
- Player avatars.
- Achievement illustrations.
- Empty states.

Preferred order:

1. Suitable licensed or original assets.
2. Optimized 3D models and original procedural visuals.
3. Relevant image assets from a reliable source.
4. Carefully designed local placeholders when no suitable asset exists.

Do not hotlink random images without checking licensing, availability, and suitability.

Do not use random images unrelated to the selected game.

Optimize images, provide fallbacks, use appropriate aspect ratios, and lazy-load non-critical images.

Keep image paths and asset configuration organized.

Never allow missing images to break the page layout.

---

# 18. RESPONSIVE DESIGN AND ACCESSIBILITY

Support:

- Desktop: 1440px and above.
- Standard laptop: around 1280px.
- Tablet: around 768px.
- Mobile: 360px and above.

Use responsive grids, flexible typography, and layouts that adapt to narrow screens.

On mobile:

- Convert sidebars into accessible drawers.
- Stack hero content appropriately.
- Simplify decorative 3D scenes.
- Use scrollable or carefully restructured brackets.
- Make touch targets sufficiently large.
- Prevent horizontal overflow.
- Keep primary actions visible.
- Use responsive tables or mobile-friendly record cards.

Accessibility requirements:

- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Accessible form labels.
- Suitable color contrast.
- Reduced-motion support.
- Alternative text for meaningful images.
- Accessible dialogs and menus.
- No information communicated by color alone.

---

# 19. PERFORMANCE REQUIREMENTS

The website must feel responsive even with 3D effects.

Implement:

- Lazy loading for below-the-fold content.
- Route-level code splitting.
- Optimized image assets.
- Efficient React rendering.
- Paginated API responses.
- Database indexes for common queries.
- Skeleton loading for slow requests.
- Error boundaries.
- Cleanup of event listeners and animation resources.
- Responsive quality settings for 3D scenes.

Load the 3D scene separately from the essential navigation and text where practical.

If WebGL is unavailable or the device is underpowered, display a graceful static alternative.

Target a strong Core Web Vitals profile and aim for Lighthouse scores of 90 or above in Performance, Accessibility, Best Practices, and SEO where practical. Treat these as optimization goals rather than guaranteed results.

---

# 20. SECURITY REQUIREMENTS

Implement:

- Secure password hashing.
- Backend role-based authorization.
- Server-side validation.
- CSRF protection where applicable.
- Appropriate session and cookie settings.
- Safe handling of uploaded evidence.
- Request size limits.
- Environment-based secrets.
- Database constraints.
- Rate limiting for sensitive endpoints where appropriate.
- Audit logging for important administrative actions.
- Safe error handling without exposing stack traces.

Never trust role information, tournament ownership, scores, or team membership submitted by the frontend.

The server must independently verify permissions for every sensitive operation.

---

# 21. TESTING REQUIREMENTS

Write automated tests for:

- Authentication and authorization.
- Duplicate team registration.
- Tournament capacity.
- Registration deadlines.
- Team roster validation.
- Bracket generation.
- Bye assignment.
- Match winner calculation.
- Winner advancement.
- Disputed results.
- Leaderboard calculations.
- Achievement awards.
- Unauthorized administrative requests.

Use JUnit and Mockito for service tests, and integration tests for repository and API behavior.

Test the main journey in a browser:

Register → Create Team → Join Tournament → Approve Registration → Generate Bracket → Submit Result → Finalize Match → Update Standings.

The complete workflow must work without manually editing database records between steps.

---

# 22. IMPLEMENTATION PLAN FOR ANTIGRAVITY

Build the project in controlled phases. Do not ask the coding agent to generate every module in one enormous operation.

## Phase 1 — Repository Inspection and Planning

- Inspect the current repository and installed dependencies.
- Identify existing code, pages, assets, and configuration.
- Preserve useful existing functionality.
- Create the implementation plan.
- Establish the design system and route structure.
- Define the database schema and API contracts.
- Identify missing tools or setup requirements.

Deliverable: an implementation plan and a documented architecture.

## Phase 2 — Design System and Frontend Shell

- Configure React, TypeScript, and Vite.
- Install and configure the chosen UI and motion libraries.
- Implement global styles, typography, colors, and responsive layouts.
- Create navigation, footer, buttons, cards, forms, and reusable components.
- Build the homepage hero and selected 3D visual.
- Implement mobile navigation and basic route handling.

Deliverable: a polished, navigable frontend shell.

## Phase 3 — Backend and Database

- Configure Spring Boot and MySQL.
- Implement database migrations.
- Create entities, repositories, DTOs, services, and controllers.
- Add validation and centralized error handling.
- Insert consistent development seed data.
- Verify APIs through Postman.

Deliverable: a functioning backend with persistent records.

## Phase 4 — Authentication and Team Management

- Implement registration and login.
- Configure security and role-based access.
- Build player profiles and team management.
- Implement roster validation and invitations.
- Connect all relevant frontend screens to APIs.

Deliverable: users can authenticate and manage teams.

## Phase 5 — Tournament and Match Engine

- Implement tournament creation and registration.
- Implement registration approval and check-in.
- Generate single-elimination brackets.
- Add match scheduling and score submission.
- Implement result verification and dispute handling.
- Advance winners and update standings.

Deliverable: the main tournament workflow functions end to end.

## Phase 6 — Gamification and Advanced Modules

- Build player achievements and progression.
- Implement leaderboards and season standings.
- Add team discovery.
- Add organizer analytics.
- Implement notifications.
- Add the college league module.

Deliverable: the platform's signature features work.

## Phase 7 — Integration and Quality Assurance

- Test every route and major interaction.
- Remove dead buttons and placeholder links.
- Verify API integration.
- Fix responsive layout issues.
- Test authentication and authorization.
- Optimize images, animations, and 3D rendering.
- Add error, loading, and empty states.
- Write the README and deployment instructions.

Deliverable: a demonstrable, documented, end-to-end application.

---

# 23. ACCEPTANCE CRITERIA

The project is considered complete only when all applicable criteria are satisfied.

### Visual quality

- A consistent premium dark gaming design exists across all routes.
- The homepage has a polished hero and purposeful 3D treatment.
- Tournament, team, and player pages share a coherent design system.
- Mobile layouts are usable without horizontal overflow.
- Loading, error, and empty states are visually complete.

### Functional quality

- Navigation and all visible controls work.
- Authentication is connected to the backend.
- Permissions are enforced by the server.
- Tournament registrations persist in MySQL.
- Team rosters are validated.
- Brackets are generated from actual participants.
- Match results follow a valid verification workflow.
- Leaderboards are derived from relevant records.
- Changes remain available after refreshing the page.

### Engineering quality

- The frontend and backend are organized into understandable modules.
- API errors are handled correctly.
- Database migrations are repeatable.
- Core business rules have automated tests.
- No secrets are committed to source control.
- The README explains setup, configuration, testing, and execution.
- The project can be run by another developer using the documented steps.

### Definition of Done

A feature is not finished merely because the screen looks correct.

It is finished when its UI, validation, API, database operations, authorization, loading state, error state, and tests are implemented to the level required by that feature.

---

# 24. INSTRUCTIONS FOR THE ANTIGRAVITY CODING AGENT

Treat this document as the primary product specification.

Before writing code:

1. Inspect the existing project and determine whether any implementation must be preserved.
2. Identify the actual frontend and backend state.
3. Check the available dependencies and runtime versions.
4. Produce a concise implementation plan.
5. Identify missing configuration and external prerequisites.
6. Begin with the design system and application shell.

While implementing:

- Make small, coherent changes.
- Keep a working build after each phase.
- Prefer reusable components over duplicated markup.
- Follow the established visual system on every page.
- Implement actual interactions rather than decorative controls.
- Connect the UI to real APIs as the backend becomes available.
- Never claim that an API, database, authentication flow, or test works unless it has been verified.
- Do not replace existing files blindly.
- Do not introduce unnecessary dependencies.
- Do not hardcode important application data into React components.
- Use clearly labeled mock data only where a backend dependency is not yet available.
- Track incomplete work and report it honestly.

After each phase:

1. Run the available build and tests.
2. Fix errors before moving on.
3. Verify responsive behavior.
4. Check that the visual design remains consistent.
5. Summarize files changed and functionality completed.
6. List anything that still requires manual setup.

Do not attempt all seven phases in one unverified code-generation pass.

---

# 25. FINAL PRODUCT EXPECTATION

The final result should look and feel like a modern competitive gaming platform with:

- A cinematic, immersive 3D homepage.
- Premium tournament discovery and detail pages.
- Interactive match brackets.
- Player and team profiles.
- A gamified player progression system.
- College league standings.
- Functional organizer and admin dashboards.
- Secure authentication.
- A Java backend.
- A MySQL database.
- Consistent responsive design.
- Reliable end-to-end functionality.

**The guiding principle: premium visuals, purposeful 3D, meaningful gamification, and real functionality.**

Do not sacrifice maintainability, usability, accessibility, or performance for visual effects.

The objective is not merely to produce an impressive screenshot. The objective is to create a cohesive, usable, and extensible eSports management product that can be demonstrated confidently, explained technically, and developed further.

**Start with repository inspection, architecture, and the shared design system. Then implement and verify the application one phase at a time.**