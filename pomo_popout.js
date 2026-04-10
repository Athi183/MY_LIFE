// pomo_popout.js: Sync logic for the floating timer
let pomo = JSON.parse(localStorage.getItem('forest_pomo')) || {};

const timerEl = document.getElementById('timer');
const labelEl = document.getElementById('timerLabel');
const toggleBtn = document.getElementById('toggleBtn');
const resetBtn = document.getElementById('resetBtn');
const body = document.getElementById('pomoBody');

const savePomo = () => localStorage.setItem('forest_pomo', JSON.stringify(pomo));

const updateUI = () => {
    const mins = Math.floor(pomo.timeLeft / 60);
    const secs = pomo.timeLeft % 60;
    timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    labelEl.textContent = pomo.mode.toUpperCase();
    body.className = `mode-${pomo.mode}`;
    toggleBtn.textContent = pomo.running ? '⏸' : '▶';
};

// Listen for updates from other tabs/windows
window.addEventListener('storage', (e) => {
    if (e.key === 'forest_pomo') {
        pomo = JSON.parse(e.newValue);
        updateUI();
    }
});

toggleBtn.onclick = () => {
    pomo = JSON.parse(localStorage.getItem('forest_pomo')); // Reload latest
    pomo.running = !pomo.running;
    savePomo();
    updateUI();
};

resetBtn.onclick = () => {
    pomo = JSON.parse(localStorage.getItem('forest_pomo'));
    pomo.running = false;
    pomo.mode = 'focus';
    pomo.timeLeft = (pomo.focus || 25) * 60;
    savePomo();
    updateUI();
};

// Internal Tick (only if running)
setInterval(() => {
    pomo = JSON.parse(localStorage.getItem('forest_pomo'));
    if (pomo.running && pomo.timeLeft > 0) {
        pomo.timeLeft--;
        savePomo();
        updateUI();
    } else if (pomo.running && pomo.timeLeft <= 0) {
        // Mode switch happens in shared.js usually, 
        // but popout should reflect it when shared.js background script runs.
        // If main app isn't open, popout handles basic logic.
        if (pomo.mode === 'focus') {
            pomo.mode = 'break';
            pomo.timeLeft = (pomo.break || 5) * 60;
        } else {
            pomo.mode = 'focus';
            pomo.timeLeft = (pomo.focus || 25) * 60;
        }
        pomo.running = false; // Pause on finish to avoid sound spam from multiple windows
        savePomo();
        updateUI();
    } else {
        updateUI(); // Keep synced
    }
}, 1000);

// Init
updateUI();
