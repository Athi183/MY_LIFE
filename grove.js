// grove.js: Training Hub & Pomodoro Engine Logic
document.addEventListener('DOMContentLoaded', () => {
    // --- Ghost Timer (PiP) Setup ---
    const pipCanvas = document.createElement('canvas');
    pipCanvas.width = 300; pipCanvas.height = 150;
    const pipCtx = pipCanvas.getContext('2d');
    const pipVideo = document.createElement('video');
    pipVideo.muted = true; pipVideo.playsInline = true;
    pipVideo.srcObject = pipCanvas.captureStream();

    let activeTimers = {};
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const START_DATE = new Date("2026-04-08");
    const ONE_DAY = 24 * 60 * 60 * 1000;

    const getCurrentDayIndex = () => {
        const now = new Date();
        const diff = now.getTime() - START_DATE.getTime();
        const index = Math.floor(diff / ONE_DAY);
        return Math.max(0, Math.min(13, index)); 
    };

    window.toggleTimer = (track) => {
        const timer = activeTimers[track];
        if (timer) {
            if (timer.isRunning) {
                clearInterval(timer.interval);
                timer.isRunning = false;
                showToast(`⏸️ ${track.toUpperCase()} Paused`);
            } else {
                startInterval(track);
                showToast(`▶️ ${track.toUpperCase()} Resumed`);
            }
            updateUI();
            return;
        }

        const inputEl = document.getElementById(`input-${track}`);
        const totalMinutes = parseInt(inputEl.value) || 60;
        let totalBudget = totalMinutes * 60;
        
        let initialFocus = Math.min(25 * 60, totalBudget);
        totalBudget -= initialFocus;

        activeTimers[track] = { 
            timeLeft: initialFocus, 
            totalBudget: totalBudget,
            sessionType: 'FOCUS', 
            isRunning: true 
        };
        startInterval(track);
        updateUI();
    };

    const startInterval = (track) => {
        const timer = activeTimers[track];
        timer.isRunning = true;
        timer.interval = setInterval(() => {
            timer.timeLeft--;
            if (timer.sessionType === 'FOCUS') {
                state.focusTimeToday++;
                if (timer.timeLeft % 60 === 0) save();
            }
            updateTimerUI(track, timer.timeLeft, timer.sessionType);
            updatePiP(track, timer.timeLeft, timer.sessionType);
            if (timer.timeLeft <= 0) {
                clearInterval(timer.interval);
                if (timer.sessionType === 'FOCUS') {
                    addXP(20);
                    if (timer.totalBudget > 0) {
                        const breakTime = Math.min(10 * 60, timer.totalBudget);
                        timer.totalBudget -= breakTime;
                        timer.sessionType = 'BREAK';
                        timer.timeLeft = breakTime;
                        showToast(`🎉 Focus Done! +20 XP. Starting ${Math.ceil(breakTime/60)}m Break... ☕`);
                        playChime();
                        startInterval(track);
                    } else {
                        delete activeTimers[track];
                        showToast(`🏆 Mission Complete! Total session finished.`);
                        playChime();
                        updateUI();
                    }
                } else {
                    if (timer.totalBudget > 0) {
                        const nextFocus = Math.min(25 * 60, timer.totalBudget);
                        timer.totalBudget -= nextFocus;
                        timer.sessionType = 'FOCUS';
                        timer.timeLeft = nextFocus;
                        showToast(`☕ Break over. Time to Focus for ${Math.ceil(nextFocus/60)}m! 🚀`);
                        playChime();
                        startInterval(track);
                    } else {
                        delete activeTimers[track];
                        showToast(`✅ Break finished! Ready for next quest?`);
                        playChime();
                        updateUI();
                    }
                }
            }
        }, 1000);
    };

    const updateTimerUI = (track, sec, type) => {
        const el = document.getElementById(`timer-${track}`);
        if (el) {
            el.textContent = formatTime(sec);
            el.style.color = type === 'BREAK' ? 'var(--blue)' : 'var(--primary)';
        }
        updateProductivityTag();
    };

    const updatePiP = (track, sec, type) => {
        pipCtx.fillStyle = '#040d08'; pipCtx.fillRect(0, 0, pipCanvas.width, pipCanvas.height);
        pipCtx.fillStyle = type === 'BREAK' ? '#2196f3' : '#2ebd59'; 
        pipCtx.font = 'bold 60px Outfit';
        pipCtx.textAlign = 'center'; pipCtx.fillText(formatTime(sec), 150, 70);
        pipCtx.font = '20px Outfit'; pipCtx.fillText(`${track.toUpperCase()} ${type}`, 150, 110);
    };

    window.popOutTimer = async () => {
        try {
            if (document.pictureInPictureElement) await document.exitPictureInPicture();
            else { await pipVideo.play(); await pipVideo.requestPictureInPicture(); }
        } catch (e) { console.error(e); }
    };

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
                    <label class="check-container designer-check"><input type="checkbox" id="missionCheck"><span class="checkmark"></span><span class="check-label">Mission Completed. I am disciplined.</span></label>
                    <button class="btn-main pulse-glow" onclick="completeMission()">Complete +20 XP</button>
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
        const tracks = ['english', 'aptitude', 'gate', 'coding'];
        const dayIndex = getCurrentDayIndex();

        const currentGateTask = ROADMAP_CONTENT.gate.tasks[dayIndex];
        const quickEl = document.getElementById('quickMission');
        if (quickEl && currentGateTask) quickEl.textContent = currentGateTask.split(':').slice(1).join(':').trim();

        tracks.forEach(track => {
            const card = document.getElementById(`card-${track}`);
            const grid = document.getElementById(`roadmap-${track}`);
            const check = document.getElementById(`check-${track}`);
            if (!card || !grid) return;

            if (check) check.checked = state.dailyStatus[track];

            if (!card.querySelector('.timer-controls')) {
                const timerUI = document.createElement('div');
                timerUI.className = 'timer-controls';
                timerUI.innerHTML = `
                    <div class="timer-display" id="timer-${track}">POMODORO</div>
                    <div class="timer-btns">
                        <input type="number" id="input-${track}" class="timer-input" value="60" min="1" step="5">
                        <button class="btn-timer-start" id="btn-toggle-${track}" onclick="toggleTimer('${track}')">Focus</button>
                        <button class="btn-timer-pop" onclick="popOutTimer()">Pop Out</button>
                    </div>`;
                card.insertBefore(timerUI, grid);
            }

            const toggleBtn = document.getElementById(`btn-toggle-${track}`);
            const timer = activeTimers[track];
            if (toggleBtn) {
                if (!timer) {
                    toggleBtn.textContent = 'Focus';
                    toggleBtn.style.background = 'var(--primary)';
                    document.getElementById(`timer-${track}`).textContent = 'WORK';
                } else if (timer.isRunning) {
                    toggleBtn.textContent = 'Pause';
                    toggleBtn.style.background = 'var(--accent-orange)';
                } else {
                    toggleBtn.textContent = 'Resume';
                    toggleBtn.style.background = 'var(--primary)';
                }
            }

            grid.innerHTML = '';
            for(let i=0; i<14; i++) {
                const done = state.roadmaps[track][i];
                const isUnlocked = i === 0 || state.roadmaps[track][i - 1];
                const dot = document.createElement('div');
                dot.className = `day-dot ${done ? 'completed' : (isUnlocked ? 'active' : 'locked')} ${track}-dot date-dot`;
                
                const dayNum = i + 1;
                const dateLabel = `Apr ${7+dayNum}`;
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
        if (currentEl) currentEl.textContent = `🔥 ${state.streaks.current}`;
        if (bestEl) bestEl.textContent = `🏆 ${state.streaks.best}`;
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
