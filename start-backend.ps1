# eSports Nexus Backend Starter Script
Write-Host "Loading environment variables from backend/.env..." -ForegroundColor Cyan

if (Test-Path "backend\.env") {
    Get-Content "backend\.env" | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#") -and $line.Contains("=")) {
            $parts = $line.Split("=", 2)
            $key = $parts[0].Trim()
            $value = $parts[1].Trim()
            [System.Environment]::SetEnvironmentVariable($key, $value, [System.EnvironmentVariableTarget]::Process)
        }
    }
    Write-Host "Environment variables loaded successfully." -ForegroundColor Green
} else {
    Write-Host "No backend/.env found. Using application defaults." -ForegroundColor Yellow
}

$serverPort = if ($env:SERVER_PORT) { $env:SERVER_PORT } else { "8080" }
Write-Host "Starting Spring Boot on port $serverPort..." -ForegroundColor Cyan
& "backend\mvnw.cmd" -f "backend\pom.xml" spring-boot:run
