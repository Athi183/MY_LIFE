// grove.js: Training Hub & Pomodoro Engine Logic

document.addEventListener('DOMContentLoaded', () => {
    let activeMission = null;
    window.openMission = (track, day) => {
        activeMission = { track, day };
        const content = ROADMAP_CONTENT[track];
        const dayTask = content.tasks[day];
        const colorClass = `theme-${track}`;

        sharedElements.modalContent.innerHTML = `
            <div class="mission-modal-inner ${colorClass}">
                <div class="mission-header">
                    <div class="mission-badge">MAPPED TO: ${track.toUpperCase()}</div>
                    <h2 class="mission-title" style="font-size: 1.4rem;">${dayTask.split(':')[0]} Mission</h2>
                    <div class="mission-goal">🎯 GOAL: ${content.goal}</div>
                </div>
                <div class="mission-body">
                    <div class="quest-card">
                        <div class="quest-section">
                            <span class="quest-icon">🧩</span>
                            <div class="quest-info"><strong>STRUCTURE</strong><p>${content.structure}</p></div>
                        </div>
                        <div class="quest-divider"></div>
                        <div class="quest-section active-task">
                            <span class="quest-icon">🚀</span>
                            <div class="quest-info"><strong>TODAY'S MISSION</strong><p class="mission-text">${dayTask.split(':').slice(1).join(':').trim()}</p></div>
                        </div>
                    </div>
                </div>
                <div class="mission-footer">
                    <label class="check-container designer-check">
                        <input type="checkbox" id="missionCheck">
                        <span class="checkmark"></span>
                        <span class="check-label">Mission Completed. I am disciplined.</span>
                    </label>
                    <div class="mission-actions">
                        <button class="btn-main pulse-glow" onclick="completeMission()">Complete +20 XP</button>
                        <button class="btn-focus-start" onclick="startGlobalFocus('${dayTask.split(':')[0]}')">🎯 Focus Session</button>
                    </div>
                    <button class="btn-text-only" onclick="closeModal()">Maybe Later</button>
                </div>
            </div>
        `;
        sharedElements.modal.classList.add('active');
    };

    window.completeMission = () => {
        const checkbox = document.getElementById('missionCheck');
        if (!checkbox || !checkbox.checked) { showToast("Please check the box!"); return; }
        const { track, day } = activeMission;
        state.roadmaps[track][day] = true;
        state.lastAction[track] = new Date().getTime();
        state.trees[track] = Math.min(2, state.trees[track] + 1);
        addXP(20);
        showToast(`Mission Accomplished! 🌳`);
        sharedElements.modal.classList.remove('active');
        save(); updateUI();
    };

    window.closeModal = () => sharedElements.modal.classList.remove('active');

    window.setEnergy = (mode) => {
        state.energyMode = mode;
        save(); updateUI();
        showToast(`⚡ Energy Mode: ${mode.toUpperCase()}`);
    };

    window.toggleDailyTask = (track) => {
        const checkbox = document.getElementById(`check-${track}`);
        if (!checkbox) return;
        state.dailyStatus[track] = checkbox.checked;

        // SYNC: If checked, mark current roadmap day as done too
        if (checkbox.checked) {
            const dayIdx = getCurrentDayIndex();
            state.roadmaps[track][dayIdx] = true;
            addXP(10);
            showToast(`Task & Roadmap synced! +10 XP`);
        }

        updateDailyProgress();
        save(); updateUI();
    };

    const updateDailyProgress = () => {
        const count = Object.values(state.dailyStatus).filter(v => v).length;
        const threshold = state.energyMode === 'normal' ? 3 : (state.energyMode === 'low' ? 2 : 1);
        const countEl = document.getElementById('dailyCount');
        const msgEl = document.getElementById('dailyStatusMsg');
        if (countEl) countEl.textContent = count;
        if (msgEl) {
            if (count >= 4) msgEl.innerHTML = "<span class='status-perfect'>🌟 Perfect Day</span>";
            else if (count >= 3) msgEl.innerHTML = "<span class='status-good'>👍 Good Day</span>";
            else if (count < threshold) msgEl.innerHTML = "<span class='status-fail'>❌ Failed Day</span>";
            else msgEl.innerHTML = "Keep going!";
        }
    };

    const renderRoadmaps = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const currentLevel = parseInt(urlParams.get('level')) || 1;

        const tracks = ['english', 'aptitude', 'gate', 'coding'];
        const dayIndex = getCurrentDayIndex();

        // Level-based range
        const startIdx = currentLevel === 1 ? 2 : 8; // Day 3 vs Day 9
        const endIdx = currentLevel === 1 ? 7 : 13;   // Day 8 vs Day 14

        const currentGateTask = ROADMAP_CONTENT.gate.tasks[dayIndex];
        const quickEl = document.getElementById('quickMission');
        if (quickEl && currentGateTask) quickEl.textContent = currentGateTask.split(':').slice(1).join(':').trim();

        tracks.forEach(track => {
            const card = document.getElementById(`card-${track}`);
            const grid = document.getElementById(`roadmap-${track}`);
            const check = document.getElementById(`check-${track}`);
            if (!card || !grid) return;

            if (check) check.checked = state.dailyStatus[track];

            grid.innerHTML = '';
            // Render only the relevant range for the chosen level
            for (let i = startIdx; i <= endIdx; i++) {
                const done = state.roadmaps[track][i];
                const isUnlocked = i === startIdx || state.roadmaps[track][i - 1];
                const dot = document.createElement('div');
                dot.className = `day-dot ${done ? 'completed' : (isUnlocked ? 'active' : 'locked')} ${track}-dot date-dot`;

                const dayNum = i + 1;
                const dateLabel = `Apr ${7 + dayNum}`;
                dot.innerHTML = `<span class="dot-date">${dateLabel}</span><span class="dot-day">D${dayNum}</span>`;
                dot.title = `Mission: ${ROADMAP_CONTENT[track].tasks[i].split(':')[0]}`;

                dot.onclick = (e) => { e.stopPropagation(); openMission(track, i); };
                grid.appendChild(dot);
            }

            const treeEl = document.getElementById(`tree-${track}`);
            if (treeEl) treeEl.textContent = treeStages[state.trees[track]];
        });

        const currentEl = document.getElementById('currentStreak');
        const bestEl = document.getElementById('bestStreak');
        const hudStreak = document.getElementById('currentStreakHUD');

        if (currentEl) currentEl.textContent = state.streaks.current;
        if (bestEl) bestEl.textContent = state.streaks.best;
        if (hudStreak) hudStreak.textContent = `🔥 ${state.streaks.current} Day Streak`;
        document.querySelectorAll('.mode-pill').forEach(pill => {
            pill.classList.toggle('active', pill.dataset.mode === state.energyMode);
        });
        updateDailyProgress();
    };

    window.updateUI = () => {
        if (sharedElements.playerLv) sharedElements.playerLv.textContent = state.player.lv;
        if (sharedElements.xpBar) sharedElements.xpBar.style.width = `${(state.player.xp / (state.player.lv * 100)) * 100}%`;
        updateProductivityTag();
        renderRoadmaps();
    };

    checkSustainability();
    updateUI();
});
