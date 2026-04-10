# Project Blueprint: SkillUp 2027 🛡️🚀

This document is a comprehensive technical breakdown of every file, dynamic component (Card), and core system currently active in the **Mission Control Hub** ecosystem.

## 📂 Core Architecture (Files)

### 1. 🧠 `shared.js` (The Engine)
*   **Role**: The central nervous system of the project.
*   **Key Features**:
    *   **Global State**: Manages XP, Levels, Streaks, Focus Time, and Task Status via `localStorage`.
    *   **Persistence**: Automatically saves and heals your data using "Safe Mode" try-catch logic.
    *   **Pomodoro Engine**: Handles the logic for the global timer injected across all pages.
    *   **Campaign Calculation**: Functions like `getCurrentDayIndex()` determine where you are in your 14-day quest.

### 2. 🌲 `grove.js` & `grove.css` (Training Hub)
*   **Role**: Manages the **Beginner Grove** experience.
*   **Key Features**:
    *   **Mission Rendering**: Dynamically builds the 4 task cards for English, Aptitude, Coding, and Gate based on `shared.js` data.
    *   **Roadmap Sync**: Links checkbox clicks in the Grove to the global Roadmap Dots.

### 3. ⚔️ `exam.js` (Battle Plan)
*   **Role**: Manages the **Exam Mastery Hub**.
*   **Key Features**:
    *   **Gamified Levels**: Tracks your progression through the 11-level syllabus for NPTEL ML and University exams.
    *   **Syllabus Logic**: Locks/Unlocks modules based on your current level.

### 4. 🗺️ `map.js` (Progress Visualization)
*   **Role**: Manages the **Ascension Path** map.
*   **Key Features**:
    *   **Resilience Tree**: Sprout leaves on the tree animations based on your current global streak.
    *   **Navigation**: Handles the logic for jumping between different project zones.

---

## 🎴 Mission Control Cards (Dashboard)

The **Hub (`index.html`)** uses a 2x3 high-fidelity grid. Each card has a specific mission role:

### 1. 🌍 Ascension Path (World Map)
*   **Purpose**: Tracks your long-term journey (April 8 – April 21).
*   **Features**: Displays current active level and calculates % completion of the daily quest.

### 2. 🎮 Exam Mastery Hub
*   **Purpose**: The central command for academic performance.
*   **Features**: Tracks the 11-day "Battle Plan" for ML and University exams.

### 3. 🚀 Career Missions
*   **Purpose**: Monitoring professional opportunities.
*   **Features**: Shows active hackathon counts and nearest deadlines.

### 4. 📅 Life Calendar
*   **Purpose**: Centralized scheduling.
*   **Features**: Dynamic event snippets (e.g., Exam dates, project submission).

### 5. 📊 Data Analyst Hub (DA Hub)
*   **Purpose**: Specific technical skill progression.
*   **Features**: Tracks completion of the 12 core course modules.

### 6. 🧘 Daily Routine
*   **Purpose**: Foundation and Discipline.
*   **Features**: Tracks non-negotiable Morning/Evening standards (Meditate, Move, Focus).

---

## 🛡️ Global Systems
- **Safe Mode**: Prevents site blackouts if data is corrupted.
- **Unified Streak**: Automated consistency rewards (+50 XP for perfect days).
- **Focus Sync**: Pomodoro sessions automatically add up to your total daily "Deep Work" hours.
