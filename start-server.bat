@echo off
title AIMEX 2026 Local Server
echo Starting AIMEX 2026 Local Server...
echo Open your browser at: http://localhost:8000/
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
