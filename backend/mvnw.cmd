@REM eSports Nexus Maven Wrapper (Windows)
@echo off
set "MAVEN_CMD=C:\Users\Dhruvesh\.maven\apache-maven-3.9.9\bin\mvn.cmd"
if exist "%MAVEN_CMD%" (
    "%MAVEN_CMD%" -f "%~dp0pom.xml" %*
) else (
    mvn -f "%~dp0pom.xml" %*
)
