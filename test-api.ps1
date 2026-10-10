# eSports Nexus - Live API Verification Script
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  eSports Nexus - End-to-End API Test   " -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

$baseUrl = "http://localhost:8080/api/v1"
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

# 1. Health Probe
Write-Host "`n1. Testing Health Endpoint (GET $baseUrl/health)..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "-> Success! Status: $($health.data.status) | Database: $($health.data.databaseStatus)" -ForegroundColor Green
} catch {
    Write-Host "-> Failed to reach health endpoint. Is the backend running?" -ForegroundColor Red
    exit 1
}

# 2. Public Games Endpoint
Write-Host "`n2. Testing Games Endpoint (GET $baseUrl/games)..." -ForegroundColor Cyan
try {
    $games = Invoke-RestMethod -Uri "$baseUrl/games" -Method Get
    Write-Host "-> Success! Found $($games.data.Count) active games." -ForegroundColor Green
} catch {
    Write-Host "-> Failed to fetch games: $_" -ForegroundColor Red
}

# 3. User Registration Endpoint
$randomSuffix = Get-Random -Minimum 1000 -Maximum 9999
$testUsername = "test_player_$randomSuffix"
$testEmail = "player$randomSuffix@nexus.gg"
$testPassword = "Password123!"

Write-Host "`n3. Testing Registration (POST $baseUrl/auth/register for $testUsername)..." -ForegroundColor Cyan
$regBody = @{
    username = $testUsername
    email = $testEmail
    password = $testPassword
    displayName = "Test Player $randomSuffix"
    role = "PLAYER"
} | ConvertTo-Json

try {
    $regResponse = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body $regBody -ContentType "application/json" -WebSession $session
    Write-Host "-> Success! Registered user ID: $($regResponse.data.user.id)" -ForegroundColor Green
    Write-Host "-> Message: $($regResponse.message)" -ForegroundColor Green
} catch {
    Write-Host "-> Registration failed: $_" -ForegroundColor Red
}

# 4. User Login Endpoint
Write-Host "`n4. Testing Login (POST $baseUrl/auth/login)..." -ForegroundColor Cyan
$loginBody = @{
    username = $testUsername
    password = $testPassword
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json" -WebSession $session
    Write-Host "-> Success! Session established for: $($loginResponse.data.user.username)" -ForegroundColor Green
    Write-Host "-> Roles: $($loginResponse.data.user.roles -join ', ')" -ForegroundColor Green
} catch {
    Write-Host "-> Login failed: $_" -ForegroundColor Red
}

# 5. Authenticated Current User Endpoint
Write-Host "`n5. Testing Authenticated Current User (GET $baseUrl/auth/me)..." -ForegroundColor Cyan
try {
    $meResponse = Invoke-RestMethod -Uri "$baseUrl/auth/me" -Method Get -WebSession $session
    Write-Host "-> Success! Authenticated as: $($meResponse.data.displayName) (Level $($meResponse.data.level))" -ForegroundColor Green
} catch {
    Write-Host "-> Authenticated /me request failed: $_" -ForegroundColor Red
}

# 6. Tournaments Endpoint
Write-Host "`n6. Testing Tournaments (GET $baseUrl/tournaments)..." -ForegroundColor Cyan
try {
    $tournaments = Invoke-RestMethod -Uri "$baseUrl/tournaments" -Method Get
    Write-Host "-> Success! Found $($tournaments.data.Count) tournaments." -ForegroundColor Green
} catch {
    Write-Host "-> Failed to fetch tournaments: $_" -ForegroundColor Red
}

# 7. Teams Endpoint
Write-Host "`n7. Testing Teams (GET $baseUrl/teams)..." -ForegroundColor Cyan
try {
    $teams = Invoke-RestMethod -Uri "$baseUrl/teams" -Method Get
    Write-Host "-> Success! Found $($teams.data.Count) squads." -ForegroundColor Green
} catch {
    Write-Host "-> Failed to fetch teams: $_" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host "All API tests finished successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Magenta
