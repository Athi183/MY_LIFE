// da_logic.js: Logic for Data Analyst Project Dashboard 📊
document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const daXpFill = document.getElementById('daXpFill');
    const daStreak = document.getElementById('daStreak');
    const daTotalXp = document.getElementById('daTotalXp');
    const daPath = document.getElementById('daPath');
    const daModal = document.getElementById('daModal');
    const daModalDetails = document.getElementById('daModalDetails');

    let activeLevel = null;

    const renderPath = () => {
        if (!daPath) return;
        daPath.innerHTML = '';
        
        state.dataAnalyst.levels.forEach((lvl, index) => {
            const node = document.createElement('div');
            node.className = `da-node ${lvl.status}`;
            if (lvl.status === 'locked' && index > 0 && state.dataAnalyst.levels[index-1].status === 'completed') {
                node.className = `da-node active`;
            }
            if (lvl.status === 'locked') node.setAttribute('data-locked', 'true');

            node.innerHTML = `
                <div class="node-icon">${lvl.icon}</div>
                <div class="node-label">LV ${lvl.id}: ${lvl.name}</div>
                ${index < state.dataAnalyst.levels.length - 1 ? '<div class="da-connector"></div>' : ''}
            `;

            node.onclick = () => {
                if (lvl.status === 'locked' && (!state.dataAnalyst.levels[index-1] || state.dataAnalyst.levels[index-1].status !== 'completed')) {
                    showToast("🔒 Complete the previous level first!");
                    return;
                }
                openDaMission(lvl);
            };

            daPath.appendChild(node);
        });
    };

    window.openDaMission = (lvl) => {
        activeLevel = lvl;
        const courseraLink = lvl.id === 1 ? `<br><a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style="color: var(--blue); font-size: 0.85rem; text-decoration: underline; margin-top: 0.5rem; display: inline-block;">🔗 View Course on Coursera</a>` : '';
        
        let missionContent = "";
        
        if (lvl.modules) {
            const completedCount = lvl.modules.filter(m => m.completed).length;
            const currentDay = Math.min(5, completedCount + 1);
            
            missionContent = `
                <div class="da-mission-card">
                    <div class="da-mission-badge">📍 STATUS: Day ${currentDay} of 5</div>
                    <h3>Level ${lvl.id}: ${lvl.name}</h3>
                    <p style="font-size: 0.9rem;">Complete these 4 modules to unlock the next plateau.</p>
                    
                    <div class="da-modules-list">
                        ${lvl.modules.map(mod => `
                            <div class="da-mod-item ${mod.completed ? 'done' : ''}">
                                <label class="designer-check mini">
                                    <input type="checkbox" ${mod.completed ? 'checked' : ''} onchange="toggleDaModule(${lvl.id}, ${mod.id})">
                                    <span class="checkmark"></span>
                                    <div class="mod-info">
                                        <span class="mod-title">${mod.title}</span>
                                        <span class="mod-xp">+${mod.xp} XP</span>
                                    </div>
                                </label>
                            </div>
                        `).join('')}
                    </div>

                    <div class="quest-divider"></div>
                    <p>Total Level Progress: ${completedCount}/4 Modules${courseraLink}</p>
                    
                    <div class="mission-footer">
                        ${completedCount === 4 ? `<button class="btn-main pulse-glow" onclick="completeDaLevel()">Claim Level Bonus +50 XP</button>` : ''}
                        <button class="btn-text-only" onclick="closeDaModal()">Back to Path</button>
                    </div>
                </div>
            `;
        } else {
            missionContent = `
                <div class="da-mission-card">
                    <h3>Level ${lvl.id}: ${lvl.name}</h3>
                    <div class="quest-section">
                        <span class="quest-icon">${lvl.icon}</span>
                        <div class="quest-info" style="text-align: left;">
                            <strong>OBJECTIVE</strong>
                            <p>${lvl.task}${courseraLink}</p>
                        </div>
                    </div>
                    <div class="quest-divider"></div>
                    <p>This is a <strong>1-hour focus mission</strong>. Master this tool to proceed.</p>
                    
                    <div class="mission-footer">
                        <label class="designer-check">
                            <input type="checkbox" id="daCompleteCheck">
                            <span class="checkmark"></span>
                            <span class="check-label">Mission Completed. Task achieved.</span>
                        </label>
                        <button class="btn-main pulse-glow" onclick="completeDaLevel()">Complete +25 XP</button>
                        <button class="btn-text-only" onclick="closeDaModal()">Maybe Later</button>
                    </div>
                </div>
            `;
        }

        daModalDetails.innerHTML = missionContent;
        daModal.classList.add('active');
    };

    window.toggleDaModule = (levelId, moduleId) => {
        const lvl = state.dataAnalyst.levels.find(l => l.id === levelId);
        const mod = lvl.modules.find(m => m.id === moduleId);
        
        if (!mod.completed) {
            mod.completed = true;
            state.dataAnalyst.xp += mod.xp;
            addXP(mod.xp);
            showToast(`✅ ${mod.title} Done! +${mod.xp} XP`);
        } else {
            // Unchecking (optional, usually not needed for game progress but good for UX)
            mod.completed = false;
        }
        
        save();
        updateDaUI();
        openDaMission(lvl); // Re-render modal to show progress
    };

    window.completeDaLevel = () => {
        const lvlIndex = state.dataAnalyst.levels.findIndex(l => l.id === activeLevel.id);
        const lvl = state.dataAnalyst.levels[lvlIndex];

        if (lvl.modules) {
            const allDone = lvl.modules.every(m => m.completed);
            if (!allDone) { showToast("Finish all modules first!"); return; }
        } else {
            const check = document.getElementById('daCompleteCheck');
            if (!check || !check.checked) { showToast("Check the box first!"); return; }
        }

        state.dataAnalyst.levels[lvlIndex].status = 'completed';
        const bonus = 50; 
        state.dataAnalyst.xp += bonus;
        addXP(bonus);

        if (state.dataAnalyst.levels[lvlIndex + 1]) {
            state.dataAnalyst.levels[lvlIndex + 1].status = 'active';
        }
        
        state.dataAnalyst.streak++;
        save();
        updateDaUI();
        closeDaModal();
        showToast("🌟 FULL LEVEL COMPLETED! Rank Ascended.");
    };

    window.closeDaModal = () => daModal.classList.remove('active');

    const updateDaUI = () => {
        if (daStreak) daStreak.textContent = state.dataAnalyst.streak;
        if (daTotalXp) daTotalXp.textContent = state.dataAnalyst.xp;
        
        const nextLvXp = state.dataAnalyst.lv * 100;
        if (daXpFill) daXpFill.style.width = `${(state.dataAnalyst.xp % 100)}%`;
        
        renderPath();
    };

    updateDaUI();
});
