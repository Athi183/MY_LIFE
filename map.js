// map.js: World Map & Ascension Path Logic
document.addEventListener('DOMContentLoaded', () => {
    const mapElements = {
        levelPath: document.getElementById('levelPath'),
        energyBtns: document.querySelectorAll('.energy-btn'),
        statusHours: document.getElementById('statusFocusHours'),
    };

    const renderPath = () => {
        if (!mapElements.levelPath) return;
        mapElements.levelPath.innerHTML = '';
        levels.forEach((lvl) => {
            const isUnlocked = state.unlockedSteps.includes(lvl.id);
            const isCurrent = state.unlockedSteps[state.unlockedSteps.length - 1] === lvl.id;
            const isCompleted = isUnlocked && !isCurrent;
            const island = document.createElement('div');
            island.className = `island-node ${isCompleted ? 'completed' : (isCurrent ? 'active' : 'locked')}`;
            island.innerHTML = `<div class="island-icon">${lvl.icon}</div><div class="island-label">${lvl.name}</div><div class="island-connector"></div>`;
            
            if (isUnlocked) {
                island.onclick = () => {
                    if (lvl.id === 'beginner') window.location.href = 'beginner_grove.html';
                    else showToast("🏝️ This zone is under development!");
                };
            }
            mapElements.levelPath.appendChild(island);
        });
    };

    // Energy Mode Logic
    mapElements.energyBtns.forEach(btn => {
        btn.onclick = () => {
            mapElements.energyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast(`🔋 Mode set to ${btn.textContent}!`);
        };
    });

    window.updateUI = () => {
        if (sharedElements.playerLv) sharedElements.playerLv.textContent = state.player.lv;
        if (sharedElements.xpBar) sharedElements.xpBar.style.width = `${(state.player.xp / (state.player.lv * 100)) * 100}%`;
        
        // Update Floating Dashboard
        if (mapElements.statusHours) {
            const hours = (state.focusTimeToday / 3600).toFixed(1);
            mapElements.statusHours.textContent = `${hours}h`;
        }

        updateProductivityTag();
        renderPath();
    };

    // Initialize
    checkSustainability();
    updateUI();
});
