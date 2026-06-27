@echo off
rem ============================================================================
rem  Portfolio dev-server launcher
rem  Double-click this file to start the site at http://localhost:3000
rem ============================================================================
setlocal
title Portfolio Dev Server
cd /d "%~dp0"

rem -- Make the portable Node install available to this window -----------------
set "PATH=%LOCALAPPDATA%\node-portable\node-v20.18.1-win-x64;%PATH%"

where node >nul 2>nul || (
  echo.
  echo  [ERROR] Node.js was not found.
  echo  Expected the portable install at:
  echo    %LOCALAPPDATA%\node-portable\node-v20.18.1-win-x64
  echo  Install Node 18+ or update the path on the "set PATH" line above.
  echo.
  pause
  exit /b 1
)

rem -- Friendly heads-up if the port is already serving ------------------------
netstat -ano | findstr /r /c:":3000 .*LISTENING" >nul 2>nul && (
  echo.
  echo  [NOTE] Something is already listening on port 3000.
  echo  A dev server may already be running - open http://localhost:3000
  echo  or close the other one, then press a key to continue anyway.
  echo.
  pause
)

rem -- First run only: install dependencies ------------------------------------
if not exist "node_modules" (
  echo  Installing dependencies for the first time. This can take a minute...
  call npm install --no-audit --no-fund || (
    echo  [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo.
echo  ============================================================
echo    Portfolio dev server starting...
echo    URL:  http://localhost:3000   (opens in your browser)
echo    Stop: press Ctrl+C in this window
echo  ============================================================
echo.

rem -- Open the browser a few seconds after the server boots -------------------
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3000'"

rem -- Run the dev server in the foreground (keeps this window alive) ----------
call npm run dev

rem -- If the server exits, keep the window open so errors are readable --------
echo.
echo  Dev server stopped.
pause
