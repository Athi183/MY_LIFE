/**
 * EXAM MASTERY HUB: BATTLE PLAN ENGINE ⚔️
 * Handles the 11-level gamified progression for NPTEL ML & University Exams.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURATION: SYLLABUS & LEVELS ---
    
    const UNIVERSITY_SUBJECTS = {
        compiler: { name: "Compiler Design", modules: ["Lexical Analysis", "Syntax Analysis", "Type Checking", "Intermediate Code", "Code Generation"] },
        cgip: { name: "CG & Image Processing", modules: ["Graphic Primitives", "2D/3D Transforms", "Image Basics", "Spatial Domain", "Freq Domain"] },
        aad: { name: "Analysis & Design of Algo", modules: ["Complexity Basics", "Divide & Conquer", "Dynamic Programming", "Greedy Algos", "Backtracking/NP"] },
        elective: { name: "Elective (NLP/Android/Cloud)", modules: ["Intro/Base", "Processing/Core", "Advanced/App", "Case Study", "Final Build"] },
        ieft: { name: "IEFT (Light)", modules: ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"] }
    };

    const ML_SYLLABUS = [
        "Week 0-1: Prob, LA & Regression Basics",
        "Week 2: Linear & Multivariate Regression",
        "Week 3: Logistic & Linear Classification",
        "Week 4: Support Vector Machines (SVM)",
        "Week 5: Neural Networks & Backprop",
        "Week 6: Decision Trees & Pruning",
        "Week 7-8: Ensemble (Bagging/Boosting/RF)"
    ];

    const LEVELS = [
        { id: 1, date: "Apr 10", ml: 0, subjects: ["compiler", "cgip"], mods: [0, 0] },
        { id: 2, date: "Apr 11", ml: 1, subjects: ["aad", "elective"], mods: [0, 0] },
        { id: 3, date: "Apr 12", ml: 2, subjects: ["compiler", "cgip"], mods: [1, 1] },
        { id: 4, date: "Apr 13", ml: 3, subjects: ["aad", "elective"], mods: [1, 1] },
        { id: 5, date: "Apr 14", ml: 4, subjects: ["compiler", "cgip"], mods: [2, 2] },
        { id: 6, date: "Apr 15", ml: 5, subjects: ["aad", "elective"], mods: [2, 2] },
        { id: 7, date: "Apr 16", ml: 6, subjects: ["compiler", "cgip"], mods: [3, 3] },
        { id: 8, date: "Apr 17", ml: null, subjects: ["aad", "elective"], mods: [3, 3], note: "ML Done! Focus on Uni." },
        { id: 9, date: "Apr 18", ml: null, subjects: ["compiler", "ieft"], mods: [4, 0] },
        { id: 10, date: "Apr 19", ml: null, subjects: ["aad", "ieft"], mods: [4, 1] },
        { id: 11, date: "Apr 20", ml: null, subjects: ["cgip", "elective"], mods: [4, 4], note: "Full Revision Day." }
    ];

    // --- 2. STATE MANAGEMENT ---

    let state = JSON.parse(localStorage.getItem('forest_conqueror_v1')) || {
        completedLevels: [],
        completedModules: {}, // { subject: [modIndex...] }
        timetableDeleted: false,
        streak: 0,
        lastDate: null
    };

    const saveState = () => {
        localStorage.setItem('forest_conqueror_v1', JSON.stringify(state));
        renderAll();
    };

    // --- 3. RENDERING ENGINE ---

    const renderAll = () => {
        renderRoadmap();
        renderSyllabus();
        updateHUD();
        handleTimetableVisibility();
    };

    const updateHUD = () => {
        const totalTasks = 11; // 11 levels
        const done = state.completedLevels.length;
        const percent = Math.round((done / totalTasks) * 100);
        
        const bar = document.getElementById('examProgressBar');
        if (bar) bar.style.width = `${percent}%`;
        
        const streakEl = document.getElementById('examStreakLabel');
        if (streakEl) streakEl.textContent = `🔥 ${state.streak} DAY STREAK`;

        const title = document.getElementById('playerRank');
        if (title) title.textContent = `Battle Plan: Level ${state.completedLevels.length + 1}`;

        // YouTube Reminder
        const date = new Date();
        const day = date.getDay(); // 0 is Sun, 2 is Tue, 4 is Thu
        const yt = document.getElementById('ytReminder');
        if (yt) yt.style.display = (day === 2 || day === 4) ? 'block' : 'none';
    };

    const renderRoadmap = () => {
        const container = document.getElementById('battleRoadmap');
        if (!container) return;

        container.innerHTML = LEVELS.map((lvl, index) => {
            const isCompleted = state.completedLevels.includes(lvl.id);
            const isUnlocked = index === 0 || state.completedLevels.includes(LEVELS[index-1].id);
            let statusClass = isUnlocked ? (isCompleted ? 'completed' : 'active') : 'locked';
            
            return `
                <div class="level-node ${statusClass}" onclick="openLevel(${lvl.id}, ${isUnlocked})">
                    <span class="node-number">${lvl.id}</span>
                    <span class="node-date">${lvl.date}</span>
                </div>
            `;
        }).join('');
    };

    const renderSyllabus = () => {
        const container = document.getElementById('syllabusGrid');
        if (!container) return;

        container.innerHTML = Object.entries(UNIVERSITY_SUBJECTS).map(([id, sub]) => {
            const done = (state.completedModules[id] || []).length;
            const total = sub.modules.length;
            const pct = Math.round((done / total) * 100);

            return `
                <div class="subject-card border-glow-blue">
                    <h4>${sub.name}</h4>
                    <span class="progress-info">${done}/${total} Modules Mastered (${pct}%)</span>
                    <div class="module-tracker">
                        ${sub.modules.map((mod, idx) => {
                            const isModDone = (state.completedModules[id] || []).includes(idx);
                            return `
                                <div class="module-item ${isModDone ? 'completed' : ''}" onclick="toggleModule('${id}', ${idx})">
                                    <span>Module ${idx + 1}: ${mod}</span>
                                    <span>${isModDone ? '✅' : '○'}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    };

    const handleTimetableVisibility = () => {
        const card = document.getElementById('timetableCard');
        if (card && state.timetableDeleted) card.style.display = 'none';
    };

    // --- 4. INTERACTION HANDLERS ---

    window.openLevel = (levelId, unlocked) => {
        if (!unlocked) {
            showToast("🔒 Level Locked. Conquer previous levels first!");
            return;
        }

        const level = LEVELS.find(l => l.id === levelId);
        const modal = document.getElementById('levelModal');
        const content = document.getElementById('levelContent');

        const mlTask = level.ml !== null ? `<li>[ ] 🧠 <b>Machine Learning:</b> ${ML_SYLLABUS[level.ml]} (1.5h)</li>` : '';
        const sub1 = UNIVERSITY_SUBJECTS[level.subjects[0]];
        const sub2 = UNIVERSITY_SUBJECTS[level.subjects[1]];

        content.innerHTML = `
            <h2>Level ${level.id}: ${level.date} Execution ⚔️</h2>
            <div class="mission-box">
                <p>Estimated Time: ~3.5 - 4 hours</p>
                <ul class="level-checklist">
                    ${mlTask}
                    <li>[ ] 📘 <b>${sub1.name}:</b> Module ${level.mods[0] + 1} (${sub1.modules[level.mods[0]]}) (1h)</li>
                    <li>[ ] 📘 <b>${sub2.name}:</b> Module ${level.mods[1] + 1} (${sub2.modules[level.mods[1]]}) (1h)</li>
                    <li>[ ] 🧩 <b>Skills:</b> Aptitude + Coding + GATE (1h)</li>
                </ul>
                ${level.note ? `<p class="level-note">⚠️ ${level.note}</p>` : ''}
            </div>
            <button class="btn-main" onclick="confirmLevelCompletion(${levelId})">
                ${state.completedLevels.includes(levelId) ? 'Conquered! (Re-submit?)' : 'Mark Level Conquered ⚔️'}
            </button>
        `;

        modal.classList.add('active');
    };

    window.confirmLevelCompletion = (levelId) => {
        if (!state.completedLevels.includes(levelId)) {
            state.completedLevels.push(levelId);
            state.streak++;
            showToast("🎖️ Level Conquered! XP Gained.");
        }
        closeLevelModal();
        saveState();
    };

    window.toggleModule = (subjectId, modIdx) => {
        if (!state.completedModules[subjectId]) state.completedModules[subjectId] = [];
        const index = state.completedModules[subjectId].indexOf(modIdx);
        
        if (index > -1) {
            state.completedModules[subjectId].splice(index, 1);
        } else {
            state.completedModules[subjectId].push(modIdx);
            showToast("✅ Module Mastered!");
        }
        saveState();
    };

    window.deleteTimetable = () => {
        state.timetableDeleted = true;
        saveState();
    };

    window.closeLevelModal = () => {
        document.getElementById('levelModal').classList.remove('active');
    };

    // Startup
    renderAll();
});
