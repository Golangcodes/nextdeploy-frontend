@echo off
echo ===========================================
echo  Installing NextDeploy CLI for Windows...
echo ===========================================

set "REPO=Golangcodes/nextdeploy"
set "BIN_NAME=nextdeploy.exe"
set "INSTALL_DIR=%USERPROFILE%\.nextdeploy\bin"

:: Create install directory if it doesn't exist
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"

:: Use PowerShell to fetch the latest release tag
for /f "delims=" %%I in ('powershell -Command "$response = Invoke-RestMethod -Uri 'https://api.github.com/repos/Golangcodes/nextdeploy/releases/latest'; $response.tag_name"') do set "LATEST_TAG=%%I"

if "%LATEST_TAG%"=="" (
    echo Could not fetch latest release. Please verify your internet connection or GitHub API limits.
    exit /b 1
)

echo Latest Version: %LATEST_TAG%

set "ARCHIVE_URL_CAP=https://github.com/%REPO%/releases/download/%LATEST_TAG%/nextdeploy_Windows_x86_64.zip"
set "TMP_ZIP=%TEMP%\nextdeploy_%LATEST_TAG%.zip"

echo Downloading NextDeploy from %ARCHIVE_URL_CAP%...
powershell -Command "Invoke-WebRequest -Uri '%ARCHIVE_URL_CAP%' -OutFile '%TMP_ZIP%'"

if not exist "%TMP_ZIP%" (
    echo Archive failed to download. Trying raw executable...
    set "BINARY_URL=https://github.com/%REPO%/releases/download/%LATEST_TAG%/%BIN_NAME%-%LATEST_TAG%-windows-amd64.exe"
    powershell -Command "Invoke-WebRequest -Uri '%BINARY_URL%' -OutFile '%INSTALL_DIR%\%BIN_NAME%'"
) else (
    echo Extracting...
    powershell -Command "Expand-Archive -Path '%TMP_ZIP%' -DestinationPath '%INSTALL_DIR%' -Force"
    del "%TMP_ZIP%"
)

if exist "%INSTALL_DIR%\%BIN_NAME%" (
    echo ===========================================
    echo [SUCCESS] NextDeploy CLI installed successfully!
    echo Installed to: %INSTALL_DIR%\%BIN_NAME%
    
    :: Add to PATH using PowerShell so it persists
    powershell -Command "$p = [Environment]::GetEnvironmentVariable('PATH', 'User'); if ($p -notmatch [regex]::Escape('%INSTALL_DIR%')) { [Environment]::SetEnvironmentVariable('PATH', $p + ';%INSTALL_DIR%', 'User'); Write-Host 'Added to PATH.' }"
    
    echo Please restart your terminal to use 'nextdeploy'.
    echo ===========================================
) else (
    echo [ERROR] Installation failed. Could not find downloaded executable.
    exit /b 1
)
