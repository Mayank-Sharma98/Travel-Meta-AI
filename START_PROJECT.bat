@echo off
title TravelMate AI - Auto Launcher
color 0A

echo ========================================================
echo        STARTING TRAVELMATE AI (REACT + NODE.JS)
echo ========================================================
echo.

set "PATH=C:\Program Files\nodejs;%LOCALAPPDATA%\Programs\node;%APPDATA%\npm;%PATH%"

cd /d "%~dp0"

echo [1/3] Starting Node.js Backend Server on Port 5000...
start "TravelMate Backend (Port 5000)" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo [2/3] Starting React Vite Frontend Server on Port 5173...
start "TravelMate Frontend (Port 5173)" cmd /k "cd frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Opening Web Browser at http://localhost:5173/ ...
start http://localhost:5173/

echo.
echo ========================================================
echo   TravelMate AI is now RUNNING!
echo   Frontend: http://localhost:5173/
echo   Backend:  http://localhost:5000/
echo ========================================================
echo.
echo NOTE: Do not close the two opened black command windows
echo while using the website.
echo.
pause
