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
        mapElements.levelPath.className = 'level-path-container'; // Updated to the Duolingo style

        levels.forEach((lvl, index) => {
            const isUnlocked = state.unlockedSteps.includes(lvl.id);
            const isCurrent = state.unlockedSteps[state.unlockedSteps.length - 1] === lvl.id;
            const isCompleted = isUnlocked && !isCurrent;
            
            const node = document.createElement('div');
            // Zigzag side pattern
            const sides = ['side-center', 'side-left', 'side-center', 'side-right'];
            const sideClass = sides[index % 4];
            
            node.className = `level-node ${sideClass} ${isCompleted ? 'completed' : (isCurrent ? 'active' : (isUnlocked ? 'active' : 'locked'))}`;
            
            node.innerHTML = `
                <div class="level-popover">${lvl.name}</div>
                <div class="node-icon">${isUnlocked ? lvl.icon : '🔒'}</div>
                <div class="node-label">Level ${lvl.id}: ${lvl.name}</div>
            `;
            
            if (isUnlocked) {
                node.onclick = () => {
                    if (lvl.id === 1) {
                        window.location.href = `beginner_grove.html`;
                    } else if (lvl.id === 2) {
                         window.location.href = `beginner_grove.html?level=2`;
                    } else if (lvl.id <= 7) {
                         window.location.href = `exam.html`;
                    } else {
                        showToast(`🏝️ Level ${lvl.id} is coming soon!`);
                    }
                };
            }
            
            mapElements.levelPath.appendChild(node);
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

    const renderTree = () => {
        const leafContainer = document.getElementById('treeLeaves');
        if (!leafContainer) return;
        leafContainer.innerHTML = '';
        
        // One leaf for every day of the current streak
        const streak = state.streaks.current || 0;
        for (let i = 0; i < streak; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.style.animationDelay = `${i * 0.1}s`;
            leafContainer.appendChild(leaf);
        }
    };

    window.updateUI = () => {
        if (sharedElements.playerLv) sharedElements.playerLv.textContent = state.player.lv;
        if (sharedElements.xpBar) sharedElements.xpBar.style.width = `${(state.player.xp / (state.player.lv * 100)) * 100}%`;
        
        const rankEl = document.getElementById('playerRank');
        if (rankEl) {
            if (state.phoenixActive) {
                rankEl.innerHTML = `<span class="phoenix-reborn-text">Phoenix Reborn 🔥</span>`;
            } else {
                rankEl.textContent = `${state.player.rank} 🌱`;
            }
        }

        // Update Floating Dashboard
        if (mapElements.statusHours) {
            const hours = (state.focusTimeToday / 3600).toFixed(1);
            mapElements.statusHours.textContent = `${hours}h`;
        }

        updateProductivityTag();
        renderPath();
        renderTree();

        // Update Tree Phase Indicator
        const phaseLabel = document.getElementById('treePhaseEmoji');
        if (phaseLabel) {
            const streak = state.streaks.current || 0;
            if (streak >= 7) phaseLabel.textContent = '🌳';
            else if (streak >= 3) phaseLabel.textContent = '🌿';
            else phaseLabel.textContent = '🌱';
        }
    };

    // Initialize
    checkSustainability();
    updateUI();
});
