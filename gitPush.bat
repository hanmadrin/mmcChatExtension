@echo off
REM Check if a parameter was provided
IF "%~1"=="" (
  echo Please provide Commit Message.
) ELSE (
    git add .
    echo %1
    git commit -m "%1"
    git push origin main
)