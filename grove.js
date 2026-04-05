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

    window.toggleTimer = (track) => {
        const timer = activeTimers[track];

        if (timer) {
            if (timer.isRunning) {
                // PAUSE
                clearInterval(timer.interval);
                timer.isRunning = false;
                showToast(`⏸️ ${track.toUpperCase()} Paused`);
            } else {
                // RESUME
                startInterval(track);
                showToast(`▶️ ${track.toUpperCase()} Resumed`);
            }
            updateUI();
            return;
        }

        // START NEW (Focus: 50m)
        activeTimers[track] = {
            timeLeft: 50 * 60,
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
                    // SWITCH TO BREAK (15m)
                    timer.sessionType = 'BREAK';
                    timer.timeLeft = 15 * 60;
                    addXP(20); // Reward for full focus
                    showToast(`🎉 Focus Done! +20 XP. Starting 15m Break... ☕`);
                    playChime();
                    startInterval(track);
                } else {
                    // BREAK COMPLETE
                    delete activeTimers[track];
                    showToast(`✅ Break finished! Ready for next quest?`);
                    playChime();
                    updateUI();
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
        const isLocked = day > 0 && !state.roadmaps[track][day - 1];
        if (isLocked) {
            showToast("🔒 Complete the previous day first!");
            return;
        }

        activeMission = { track, day };
        const content = ROADMAP_CONTENT[track];
        const dayTask = content.tasks[day];
        const colorClass = `theme-${track}`;
        
        sharedElements.modalContent.innerHTML = `
            <div class="mission-modal-inner ${colorClass}">
                <div class="mission-header">
                    <div class="mission-badge">DAY ${day + 1} OF 30</div>
                    <h2 class="mission-title">${content.title}</h2>
                    <div class="mission-goal">🎯 GOAL: ${content.goal}</div>
                </div>

                <div class="mission-body">
                    <div class="quest-card">
                        <div class="quest-section">
                            <span class="quest-icon">🧩</span>
                            <div class="quest-info">
                                <strong>DAILY STRUCTURE</strong>
                                <p>${content.structure}</p>
                            </div>
                        </div>
                        <div class="quest-divider"></div>
                        <div class="quest-section active-task">
                            <span class="quest-icon">📅</span>
                            <div class="quest-info">
                                <strong>TODAY'S MISSION</strong>
                                <p class="mission-text">${dayTask}</p>
                            </div>
                        </div>
                    </div>

                    ${day === 29 ? `
                    <div class="reward-unlock-box">
                        <span class="sparkle">✨</span>
                        <div class="reward-info">
                            <strong>ULTIMATE REWARD</strong>
                            <p>🎁 ${content.reward}</p>
                        </div>
                    </div>` : ''}
                </div>

                <div class="mission-footer">
                    <label class="check-container designer-check">
                        <input type="checkbox" id="missionCheck">
                        <span class="checkmark"></span>
                        <span class="check-label">I have conquered today's mission.</span>
                    </label>
                    <button class="btn-main pulse-glow" onclick="completeMission()">Complete Quest +20 XP</button>
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
        showToast(`Day ${day + 1} Complete! 🌳`);
        sharedElements.modal.classList.remove('active');
        save(); updateUI();
    };

    window.closeModal = () => sharedElements.modal.classList.remove('active');

    const renderRoadmaps = () => {
        ['english', 'aptitude', 'gate', 'coding'].forEach(track => {
            const card = document.getElementById(`card-${track}`);
            const grid = document.getElementById(`roadmap-${track}`);
            if (!card || !grid) return;

            // Add Timer UI to the CARD, not the grid
            if (!card.querySelector('.timer-controls')) {
                const timerUI = document.createElement('div');
                timerUI.className = 'timer-controls';
                timerUI.innerHTML = `
                    <div class="timer-display" id="timer-${track}">50:00</div>
                    <div class="timer-btns">
                        <button class="btn-timer-start" id="btn-toggle-${track}" onclick="toggleTimer('${track}')">Start Focus</button>
                        <button class="btn-timer-pop" onclick="popOutTimer()">Pop Out</button>
                    </div>
                `;
                card.insertBefore(timerUI, grid);
            }

            // Update Toggle Button Text based on Timer State
            const toggleBtn = document.getElementById(`btn-toggle-${track}`);
            const timer = activeTimers[track];
            if (toggleBtn) {
                if (!timer) {
                    toggleBtn.textContent = 'Start Focus';
                    toggleBtn.style.background = 'var(--primary)';
                    document.getElementById(`timer-${track}`).textContent = '50:00';
                    document.getElementById(`timer-${track}`).style.color = 'var(--primary)';
                } else if (timer.isRunning) {
                    toggleBtn.textContent = 'Pause';
                    toggleBtn.style.background = 'var(--accent-orange)';
                } else {
                    toggleBtn.textContent = 'Resume';
                    toggleBtn.style.background = 'var(--primary)';
                }
            }

            // Render Day Dots in the GRID
            grid.innerHTML = '';
            state.roadmaps[track].forEach((done, day) => {
                const isUnlocked = day === 0 || state.roadmaps[track][day - 1];
                const dot = document.createElement('div');
                dot.className = `day-dot ${done ? 'completed' : (isUnlocked ? 'active' : 'locked')} ${track}-dot`;
                if (day === 29) {
                    dot.classList.add('goal-dot');
                    dot.title = "🏆 REWARD: " + ROADMAP_CONTENT[track].reward;
                }
                dot.textContent = day + 1;
                dot.onclick = (e) => {
                    e.stopPropagation();
                    openMission(track, day);
                };
                grid.appendChild(dot);
            });

            const treeEl = document.getElementById(`tree-${track}`);
            if (treeEl) treeEl.textContent = treeStages[state.trees[track]];
        });
    };

    window.updateUI = () => {
        if (sharedElements.playerLv) sharedElements.playerLv.textContent = state.player.lv;
        if (sharedElements.xpBar) sharedElements.xpBar.style.width = `${(state.player.xp / (state.player.lv * 100)) * 100}%`;
        updateProductivityTag();
        renderRoadmaps();
    };

    // Initialize
    checkSustainability();
    updateUI();
});
