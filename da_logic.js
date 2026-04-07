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
        daModalDetails.innerHTML = `
            <div class="da-mission-card">
                <h3>Level ${lvl.id}: ${lvl.name}</h3>
                <div class="quest-section">
                    <span class="quest-icon">${lvl.icon}</span>
                    <div class="quest-info" style="text-align: left;">
                        <strong>OBJECTIVE</strong>
                        <p>${lvl.task}</p>
                    </div>
                </div>
                <div class="quest-divider"></div>
                <p>This is a <strong>3-hour focus mission</strong>. Dedicate your afternoon to mastering this module.</p>
                
                <div class="mission-footer">
                    <label class="check-container designer-check">
                        <input type="checkbox" id="daCompleteCheck">
                        <span class="checkmark"></span>
                        <span class="check-label">Mission Completed. Data processed.</span>
                    </label>
                    <button class="btn-main pulse-glow" onclick="completeDaLevel()">Complete +25 XP</button>
                    <button class="btn-text-only" onclick="closeDaModal()">Maybe Later</button>
                </div>
            </div>
        `;
        daModal.classList.add('active');
    };

    window.completeDaLevel = () => {
        const check = document.getElementById('daCompleteCheck');
        if (!check || !check.checked) {
            showToast("Please check the box first!");
            return;
        }

        const lvlIndex = state.dataAnalyst.levels.findIndex(l => l.id === activeLevel.id);
        state.dataAnalyst.levels[lvlIndex].status = 'completed';
        state.dataAnalyst.xp += 25;
        
        // Unlock next level if exists
        if (state.dataAnalyst.levels[lvlIndex + 1]) {
            state.dataAnalyst.levels[lvlIndex + 1].status = 'active';
        }
        
        state.dataAnalyst.streak++;
        addXP(25); // Add to global XP too
        save();
        updateDaUI();
        closeDaModal();
        showToast("✨ Level Up! Data insight achieved.");
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
