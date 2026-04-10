/**
 * EXAM MASTERY HUB: BATTLE PLAN CAMPAIGN ENGINE ⚔️
 * Handles the 11-level gamified progression for NPTEL ML & University Exams.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURATION: SYLLABUS & LEVELS ---
    
    const UNIVERSITY_SUBJECTS = {
        compiler: { name: "Compiler Design", icon: "📘", modules: ["Lexical Analysis", "Syntax Analysis", "Type Checking", "Intermediate Code", "Code Generation"] },
        cgip: { name: "CG & Image Processing", icon: "📘", modules: ["Graphic Primitives", "2D/3D Transforms", "Image Basics", "Spatial Domain", "Freq Domain"] },
        aad: { name: "Analysis & Design of Algo", icon: "📘", modules: ["Complexity Basics", "Divide & Conquer", "Dynamic Programming", "Greedy Algos", "Backtracking/NP"] },
        elective: { name: "Elective (NLP/Android)", icon: "📘", modules: ["Intro/Base", "Processing/Core", "Advanced/App", "Case Study", "Final Build"] },
        ieft: { name: "IEFT (Light)", icon: "🕯️", modules: ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"], unlockLevel: 8 },
        compro: { name: "Comprehensive", icon: "🧠", modules: ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"], unlockLevel: 8 }
    };

    const ML_SYLLABUS = [
        "Week 0: Probability & Linear Algebra (Recap)",
        "Week 1: Regression Basics + Bias-Variance",
        "Linear & Multivariate Regression + Overfitting",
        "Logistic Regression & Linear Classification + LDA",
        "Support Vector Machines (SVM) & Margin Concept",
        "Neural Networks (Perceptron & Backprop intuition)",
        "Decision Trees & Pruning + Ensemble Intro",
        "Ensemble Finals: Bagging, Boosting, Random Forest"
    ];

    const LEVELS = [
        { id: 1, date: "Apr 10", ml: 0, subjects: ["compiler", "cgip"], mods: [0, 0] },
        { id: 2, date: "Apr 11", ml: 1, subjects: ["aad", "elective"], mods: [0, 0] },
        { id: 3, date: "Apr 12", ml: 2, subjects: ["compiler", "cgip"], mods: [1, 1] },
        { id: 4, date: "Apr 13", ml: 3, subjects: ["aad", "elective"], mods: [1, 1] },
        { id: 5, date: "Apr 14", ml: 4, subjects: ["compiler", "cgip"], mods: [2, 2] },
        { id: 6, date: "Apr 15", ml: 5, subjects: ["aad", "elective"], mods: [2, 2] },
        { id: 7, date: "Apr 16", ml: 6, subjects: ["compiler", "cgip"], mods: [3, 3] },
        { id: 8, date: "Apr 17", ml: null, subjects: ["aad", "ieft"], mods: [3, 0], note: "ML Done! Focus on Uni." },
        { id: 9, date: "Apr 18", ml: null, subjects: ["compiler", "compro"], mods: [4, 0] },
        { id: 10, date: "Apr 19", ml: null, subjects: ["aad", "ieft"], mods: [4, 1] },
        { id: 11, date: "Apr 20", ml: null, subjects: ["cgip", "elective"], mods: [4, 4], note: "Full Revision Day." }
    ];

    // --- 2. CORE RENDERING ENGINE ---

    const renderAll = () => {
        renderRoadmap();
        renderSyllabus();
        updateHUD();
    };

    const updateHUD = () => {
        if (!state) return;
        
        const streakEl = document.getElementById('examStreakLabel');
        if (streakEl) streakEl.textContent = `🔥 ${state.battlePlan.streak || 0} DAY STREAK`;

        const xpEl = document.getElementById('playerXP');
        const nextXpEl = document.getElementById('xpToNext');
        const xpFill = document.getElementById('xpFill');
        if (xpEl) xpEl.textContent = state.player.xp;
        if (nextXpEl) nextXpEl.textContent = state.player.lv * 100;
        if (xpFill) {
            const pct = (state.player.xp / (state.player.lv * 100)) * 100;
            xpFill.style.width = `${pct}%`;
        }

        const title = document.getElementById('playerRank');
        if (title) title.textContent = `Battle Plan: Level ${state.battlePlan.completedLevels.length + 1}`;

        // YouTube Reminder (Tue/Thu)
        const date = new Date();
        const day = date.getDay(); // 2=Tue, 4=Thu
        const yt = document.getElementById('ytReminder');
        if (yt) yt.style.display = (day === 2 || day === 4) ? 'flex' : 'none';
    };

    const renderRoadmap = () => {
        const container = document.getElementById('battleRoadmap');
        if (!container) return;

        container.innerHTML = '';
        const sides = ['side-center', 'side-left', 'side-center', 'side-right'];

        LEVELS.forEach((lvl, index) => {
            const isCompleted = state.battlePlan.completedLevels.includes(lvl.id);
            const isUnlocked = index === 0 || state.battlePlan.completedLevels.includes(LEVELS[index-1].id);
            const sideClass = sides[index % 4];
            
            const node = document.createElement('div');
            node.className = `level-node ${sideClass} ${isUnlocked ? (isCompleted ? 'completed' : 'active') : 'locked'}`;
            
            node.innerHTML = `
                <div class="node-icon">${isCompleted ? '⚔️' : (isUnlocked ? '🎯' : '🔒')}</div>
                <div class="node-date">${lvl.date}</div>
                <div class="node-label">Level ${lvl.id}: ${lvl.ml !== null ? 'ML + Uni' : 'Uni Focus'}</div>
            `;
            
            if (isUnlocked) {
                node.onclick = () => openLevel(lvl.id);
            }
            container.appendChild(node);
        });
    };

    const renderSyllabus = () => {
        const container = document.getElementById('syllabusGrid');
        if (!container) return;

        const currentLvlCount = state.battlePlan.completedLevels.length + 1;

        container.innerHTML = Object.entries(UNIVERSITY_SUBJECTS).map(([id, sub]) => {
            const isLocked = sub.unlockLevel && currentLvlCount < sub.unlockLevel;
            const done = (state.battlePlan.completedModules[id] || []).length;
            const total = sub.modules.length;
            const pct = Math.round((done / total) * 100);

            return `
                <div class="subject-card ${isLocked ? 'locked-subject' : 'border-glow-blue'}">
                    <div class="subject-header">
                        <h4>${sub.icon} ${sub.name}</h4>
                        ${isLocked ? `<span class="lock-tag">Unlocks at Lvl ${sub.unlockLevel}</span>` : ''}
                    </div>
                    <span class="progress-info">${done}/${total} Modules Mastered (${pct}%)</span>
                    <div class="mini-progress-bar"><div class="bar-fill" style="width: ${pct}%"></div></div>
                    <div class="module-tracker">
                        ${sub.modules.map((mod, idx) => {
                            const isModDone = (state.battlePlan.completedModules[id] || []).includes(idx);
                            return `
                                <div class="module-item ${isModDone ? 'completed' : ''}" onclick="toggleModule('${id}', ${idx})">
                                    <span>Mod ${idx + 1}: ${mod}</span>
                                    <span>${isModDone ? '✅' : '○'}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    };

    // --- 3. INTERACTION HANDLERS ---

    window.openLevel = (levelId) => {
        const level = LEVELS.find(l => l.id === levelId);
        const modal = document.getElementById('levelModal');
        const content = document.getElementById('levelContent');

        const mlTask = level.ml !== null ? `<li>[ ] 🧠 <b>Machine Learning:</b> ${ML_SYLLABUS[level.ml]}</li>` : '';
        const sub1 = UNIVERSITY_SUBJECTS[level.subjects[0]];
        const sub2 = UNIVERSITY_SUBJECTS[level.subjects[1]];

        content.innerHTML = `
            <h2>Level ${level.id}: ${level.date} Descent ⚔️</h2>
            <div class="mission-box">
                <p class="mission-est">Estimated Duration: ~3.5 - 4 hours</p>
                <ul class="level-checklist">
                    ${mlTask}
                    <li>[ ] 📘 <b>${sub1.name}:</b> Module ${level.mods[0] + 1} (${sub1.modules[level.mods[0]]})</li>
                    <li>[ ] 📘 <b>${sub2.name}:</b> Module ${level.mods[1] + 1} (${sub2.modules[level.mods[1]]})</li>
                    <li>[ ] 🧩 <b>Systems:</b> Aptitude + Coding + GATE (1h)</li>
                </ul>
                ${level.note ? `<p class="level-note">⚠️ ${level.note}</p>` : ''}
            </div>
            <button class="btn-main" onclick="confirmLevelCompletion(${levelId})">
                ${state.battlePlan.completedLevels.includes(levelId) ? 'Conquered! (Refine?)' : 'Complete Campaign Level ⚔️'}
            </button>
        `;

        modal.classList.add('active');
    };

    window.confirmLevelCompletion = (levelId) => {
        if (!state.battlePlan.completedLevels.includes(levelId)) {
            state.battlePlan.completedLevels.push(levelId);
            state.battlePlan.streak++;
            if (typeof addXP === 'function') addXP(50);
            showToast("🎖️ Level Conquered! +50 XP Gained.");
        }
        closeLevelModal();
        save();
        renderAll();
    };

    window.toggleModule = (subjectId, modIdx) => {
        const sub = UNIVERSITY_SUBJECTS[subjectId];
        const currentLvl = state.battlePlan.completedLevels.length + 1;
        if (sub.unlockLevel && currentLvl < sub.unlockLevel) {
            showToast("🔒 This subject is locked until Level 8.");
            return;
        }

        if (!state.battlePlan.completedModules[subjectId]) state.battlePlan.completedModules[subjectId] = [];
        const index = state.battlePlan.completedModules[subjectId].indexOf(modIdx);
        
        if (index > -1) {
            state.battlePlan.completedModules[subjectId].splice(index, 1);
        } else {
            state.battlePlan.completedModules[subjectId].push(modIdx);
            if (typeof addXP === 'function') addXP(10);
            showToast("✅ Module Mastered! +10 XP.");
        }
        save();
        renderAll();
    };

    window.closeLevelModal = () => {
        document.getElementById('levelModal').classList.remove('active');
    };

    // Initialize
    if (typeof patchState === 'function') patchState();
    renderAll();
});
