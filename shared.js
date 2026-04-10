// shared.js: The Forest Ascension Core Engine
const ROADMAP_CONTENT = {
    english: {
        title: "🟣 English Mastery", goal: "Communication & Confidence", structure: "10m Read Aloud + 10m Mock Interview", reward: "Eloquent Orator Badge",
        tasks: Array.from({length: 14}, (_, i) => {
            const d = i + 1;
            const dates = ["April 8", "April 9", "April 10", "April 11", "April 12", "April 13", "April 14", "April 15", "April 16", "April 17", "April 18", "April 19", "April 20", "April 21"];
            return `📅 ${dates[i]} - Day ${d === 14 ? 'Final Day' : d} Mission:
• 📖 10 min: Read a news article or tech paragraph aloud.
• 🎙️ 10 min: Mock Interview with ChatGPT.
👉 Instruction: Ask ChatGPT: "Give me a simple mock interview question and answer it."`;
        })
    },
    aptitude: {
        title: "🟢 Aptitude Mastery", goal: "Logical Speed (Fun Approach)", structure: "Learn Concept + 8-10 Questions", reward: "Logic Master Badge",
        tasks: [
            "📅 April 8 - Day 1 Mission: Percentages (Part 1): Basics, conversions (fraction ↔ %) + Solve 8 simple questions.",
            "📅 April 9 - Day 2 Mission: Percentages (Part 2): Increase/decrease, simple applications + Solve 8 questions.",
            "📅 April 10 - Day 3 Mission: Ratio & Proportion (Basics): Understanding ratios, simplification + Solve 10 questions.",
            "📅 April 11 - Day 4 Mission: Average: Mean concept, basic problems + Solve 8 questions.",
            "📅 April 12 - Day 5 Mission: Profit & Loss (Basics): CP, SP, profit/loss + Solve 10 questions.",
            "📅 April 13 - Day 6 Mission: Simple Interest: Formula and basic usage + Solve 8 questions.",
            "📅 April 14 - Day 7 Mission: Time & Work (Basics): Work = efficiency logic + Solve 10 questions.",
            "📅 April 15 - Day 8 Mission: Time, Speed & Distance (Basics): Speed formula, simple problems + Solve 8 questions.",
            "📅 April 16 - Day 9 Mission: Mixtures & Alligation (Basics): Concept of mixing quantities + Solve 8 questions.",
            "📅 April 17 - Day 10 Mission: Number System (Basics): Divisibility, remainders intro + Solve 10 questions.",
            "📅 April 18 - Day 11 Mission: Simplification / Approximation: BODMAS, calculation speed + Solve 8 questions.",
            "📅 April 19 - Day 12 Mission: Data Interpretation (Basics): Reading tables, graphs + Solve 10 questions.",
            "📅 April 20 - Day 13 Mission: Algebra Basics: Simple equations + Solve 8 questions.",
            "📅 April 21 - Final Day Mission: Revision + Mixed Practice: Solve from all topics without videos."
        ]
    },
    gate: {
        title: "🔵 Computer Networks", goal: "Primary Focus: CN & DBMS Basics", structure: "Topic Study + Routing/Flow Puzzles", reward: "Network Architect Badge",
        tasks: [
            "📅 April 8 - Day 1 Mission: OSI Model Basics: Overview of 7 Layers.",
            "📅 April 9 - Day 2 Mission: OSI Deep Dive: Physical to Session Layers.",
            "📅 April 10 - Day 3 Mission: TCP/IP Model vs OSI Architecture comparison.",
            "📅 April 11 - Day 4 Mission: Switching Basics: Circuit Switching vs Packet Switching.",
            "📅 April 12 - Day 5 Mission: Data Link Layer: Framing & Flow Control concepts.",
            "📅 April 13 - Day 6 Mission: MAC Protocols: Ethernet, CSMA/CD basics.",
            "📅 April 14 - Day 7 Mission: Network Layer: IP Addressing (Classful basics).",
            "📅 April 15 - Day 8 Mission: Routing Concepts: Shortest Path (Dijkstra) intuition.",
            "📅 April 16 - Day 9 Mission: Routing Algorithms: Distance Vector (RIP) basics.",
            "📅 April 17 - Day 10 Mission: Routing Algorithms: Link State (OSPF) basics.",
            "📅 April 18 - Day 11 Mission: Congestion Control: Leaky Bucket & Token Bucket.",
            "📅 April 19 - Day 12 Mission: Application Layer: DNS, HTTP, FTP overview.",
            "📅 April 20 - Day 13 Mission: Network Security: Basics of Encryption & Firewalls.",
            "📅 April 21 - Final Day Mission: DBMS Basics: ER Diagrams & Relational Model intro."
        ]
    },
    coding: {
        title: "💻 Coding Deep Work", goal: "Interest-Building (Easy to Medium)", structure: "2 Solvable Problems Per Day", reward: "Pattern Master Badge",
        tasks: [
            "📅 April 8 - Day 1 Mission: DSA Fundamentals + Arrays (Part 1): Space & Time Complexity intro.",
            "📅 April 9 - Day 2 Mission: DSA Fundamentals + Arrays (Part 2): Basic Array operations.",
            "📅 April 10 - Day 3 Mission: Strings (Basic from fundamentals) - Part 1: String building.",
            "📅 April 11 - Day 4 Mission: Strings (Basic from fundamentals) - Part 2: Palindrome/Anagram basics.",
            "📅 April 12 - Day 5 Mission: Searching & Binary Search: Linear Search vs Binary Search intuition.",
            "📅 April 13 - Day 6 Mission: Binary Search: Solve simple problems on sorted arrays.",
            "📅 April 14 - Day 7 Mission: Recursion (Basic) - Part 1: Understanding base case & call stack.",
            "📅 April 15 - Day 8 Mission: Recursion (Basic) - Part 2: Simple Fibonacci/Factorial problems.",
            "📅 April 16 - Day 9 Mission: Linked List: Introduction to Node structure and pointers.",
            "📅 April 17 - Day 10 Mission: Linked List: Basic Traversal and counting nodes.",
            "📅 April 18 - Day 11 Mission: Binary Tree (Intro): Terminology (Root, Leaf, Parent).",
            "📅 April 19 - Day 12 Mission: Binary Tree (Intro): Visualizing Pre-order & Post-order traversal.",
            "📅 April 20 - Day 13 Mission: 2 Pointers (Basic idea): Using two pointers for sorted arrays.",
            "📅 April 21 - Final Day Mission: Mixed Practice Marathon: Combined Array and String challenges."
        ]
    },
    ml: {
        title: "🧠 ML Awakening (NPTEL)", goal: "7-Day ML Mastery Sprint", structure: "W0-W12 Compressed Mastery", reward: "ML Conqueror Badge",
        tasks: [
            "📅 April 10: Math Mastery (Prob/LA) + Decision Theory Foundations.",
            "📅 April 11: Linear & Logistic Regression + Discriminant Analysis.",
            "📅 April 12: SVMs & Perceptrons + Decision Tree Pruning logic.",
            "📅 April 13: Neural Network Descent: Backprop & Parameter Estimation.",
            "📅 April 14: Ensemble Might: Boosting, Bagging & Random Forests.",
            "📅 April 15: Graphical Spirits: HMMs & Density-based Clustering.",
            "📅 April 16: Future Learning: GMM/EM + Intro to Reinforcement Learning.",
            "📅 April 17: 🏆 FINAL CONQUEST - NPTEL HONOURS EXAM DAY."
        ]
    }
};

const levels = [
    { id: 1, name: 'Beginner Group 1', date: 'Apr 10 - Apr 15', icon: '🌱', status: 'active', color: 'green' },
    { id: 2, name: 'Beginner Group 2', date: 'Apr 16 - Apr 21', icon: '🌿', status: 'locked', color: 'blue' },
    { id: 3, name: 'Logic Woods', date: 'Apr 22 - Apr 27', icon: '🌳', status: 'locked', color: 'purple' },
    { id: 4, name: 'Core Forest', date: 'Apr 28 - May 03', icon: '🧠', status: 'locked', color: 'gold' },
    { id: 5, name: 'Algorithm Valley', date: 'May 04 - May 09', icon: '⚔️', status: 'locked', color: 'red' },
    { id: 6, name: 'Hardware Highlands', date: 'May 10 - May 15', icon: '🏛️', status: 'locked', color: 'cyan' },
    { id: 7, name: 'Automata Arena', date: 'May 16 - May 21', icon: '🏭', status: 'locked', color: 'orange' },
    // Placeholders 8-20
    ...Array.from({length: 13}, (_, i) => ({
        id: i + 8,
        name: `Level ${i + 8}: Future Ops`,
        date: 'TBD',
        icon: '🔒',
        status: 'locked',
        color: 'gray'
    }))
];

const treeStages = ['🌱 Seed', '🌿 Sapling', '🌳 Mature'];

const defaultState = {
    player: { lv: 1, xp: 0, rank: "Explorer", productivityTag: "" },
    unlockedSteps: [1],
    energyMode: 'normal', 
    dailyStatus: { aptitude: false, coding: false, gate: false, english: false },
    streaks: { current: 0, best: 0 },
    roadmaps: {
        english: new Array(14).fill(false),
        aptitude: new Array(14).fill(false),
        gate: new Array(14).fill(false),
        coding: new Array(14).fill(false)
    },
    trees: { english: 0, aptitude: 0, gate: 0, coding: 0 },
    lastAction: { english: null, aptitude: null, gate: null, coding: null },
    focusTimeToday: 0,
    phoenixActive: false,
    dataAnalyst: {
        lv: 1,
        xp: 0,
        levels: [
            { id: 1, name: "Foundations", icon: "🌱", status: "active", task: "Google Data Analytics Course Modules", 
              modules: [
                { id: 1, title: "Module 1: Analytical Thinking (Day 1)", xp: 10, completed: false },
                { id: 2, title: "Module 2: The World of Data (Day 2)", xp: 10, completed: false },
                { id: 3, title: "Module 3: Data Analytics Toolbox (Day 3)", xp: 10, completed: false },
                { id: 4, title: "Module 4: Data Professional Impact (Day 4)", xp: 10, completed: false }
              ]
            },
            { id: 2, name: "Tools", icon: "⚒️", status: "locked", task: "SQL, Excel & Power BI Intro" },
            { id: 3, name: "Data Thinking", icon: "🧠", status: "locked", task: "Learn how to analyze datasets" },
            { id: 4, name: "Dashboard Creation", icon: "📊", status: "locked", task: "Build Power BI visuals" },
            { id: 5, name: "Mini Project", icon: "🛠️", status: "locked", task: "Build Study Tracker Dashboard" },
            { id: 6, name: "Advanced", icon: "🔒", status: "locked", task: "Python & Machine Learning" }
        ],
        streak: 0
    },
    dailySchedule: {
        aptitude: { time: "5:00 – 6:00", completed: false },
        coding: { time: "6:15 – 7:15", completed: false },
        gate: { time: "10:30 – 11:30", completed: false },
        da: { time: "Afternoon (1 hr)", completed: false },
        english: { time: "Flexible (20m)", completed: false }
    },
    battlePlan: {
        completedLevels: [], // Array of level IDs [1, 2, ...]
        completedModules: {}, // { subjectId: [modIndex, ...] }
        streak: 0
    }
};

const save = () => localStorage.setItem('forest_ascension_v4', JSON.stringify(state));
let state = JSON.parse(localStorage.getItem('forest_ascension_v4')) || defaultState;

if (!state.unlockedSteps || state.unlockedSteps.includes('beginner')) {
    state.unlockedSteps = [1];
}

// State Patcher: Ensure 14-day length for all roadmaps
const patchState = () => {
    const tracks = ['english', 'aptitude', 'gate', 'coding'];
    if (!state.roadmaps) state.roadmaps = {};
    tracks.forEach(t => {
        if (!state.roadmaps[t] || state.roadmaps[t].length !== 14) {
            state.roadmaps[t] = new Array(14).fill(false);
        }
    });
    if (!state.dailyStatus) state.dailyStatus = { aptitude: false, coding: false, gate: false, english: false };
    if (!state.streaks) state.streaks = { current: 0, best: 0 };
    if (!state.dataAnalyst) state.dataAnalyst = defaultState.dataAnalyst;
    if (!state.dailySchedule) state.dailySchedule = defaultState.dailySchedule;
    if (!state.battlePlan) state.battlePlan = defaultState.battlePlan;
    
    // Ensure all 6 levels exist in state
    if (state.dataAnalyst.levels.length < 6) {
        state.dataAnalyst.levels = defaultState.dataAnalyst.levels;
    }
    // Ensure Level 1 has modules
    if (state.dataAnalyst.levels[0] && !state.dataAnalyst.levels[0].modules) {
        state.dataAnalyst.levels[0].modules = defaultState.dataAnalyst.levels[0].modules;
    }
    save();
};
patchState();

const sharedElements = {
    get playerLv() { return document.getElementById('playerLevel'); },
    get xpBar() { return document.getElementById('xpFill'); },
    get toast() { return document.getElementById('toast'); },
    get modal() { return document.getElementById('missionModal'); },
    get modalContent() { return document.getElementById('modalDetails'); },
};

const showToast = (msg) => {
    if (!sharedElements.toast) return;
    sharedElements.toast.textContent = msg;
    sharedElements.toast.classList.add('active');
    setTimeout(() => sharedElements.toast.classList.remove('active'), 3000);
};

const addXP = (amount) => {
    state.player.xp += amount;
    const nextXp = state.player.lv * 100;
    if (state.player.xp >= nextXp) {
        state.player.xp -= nextXp;
        state.player.lv++;
        showToast("🌟 LEVEL UP! Your rank is ascending...");
    }
    save();
    if (typeof updateUI === 'function') updateUI();
};

const checkSustainability = () => {
    const now = new Date().getTime();
    const twoDays = 48 * 60 * 60 * 1000;
    let penaltyHit = false;

    Object.keys(state.lastAction).forEach(track => {
        if (state.lastAction[track]) {
            if (now - state.lastAction[track] > twoDays) {
                if (state.trees[track] > 0) {
                    state.trees[track] = 0;
                    state.player.xp = Math.max(0, state.player.xp - 50);
                    penaltyHit = true;
                }
            }
        }
    });

    if (penaltyHit) {
        showToast("⚠️ Tree Reset! 2 days missed. -50 XP penalty.");
        save();
        if (typeof updateUI === 'function') updateUI();
    }
};

const getNextTask = () => {
    // 1. Check Level 1 Ascension Path Modules
    const lv1 = state.dataAnalyst.levels[0]; // foundations
    const nextModule = lv1.modules.find(m => !m.completed);
    if (nextModule) return { title: nextModule.title, type: 'DA' };

    // 2. Check Exam Mastery / Roadmaps
    const tracks = ['english', 'aptitude', 'coding', 'gate'];
    for (const track of tracks) {
        const nextDayIndex = state.roadmaps[track].indexOf(false);
        if (nextDayIndex !== -1) {
            const days = ["April 8", "April 9", "April 10", "April 11", "April 12", "April 13", "April 14", "April 15", "April 16", "April 17", "April 18", "April 19", "April 20", "April 21"];
            return { title: `${track.toUpperCase()} - Day ${nextDayIndex + 1}`, type: track };
        }
    }
    return { title: "Daily Review", type: 'meta' };
};

const updateProductivityTag = () => {
    const hours = state.focusTimeToday / 3600;
    const mins = Math.floor((state.focusTimeToday % 3600) / 60);
    const timeStr = `${Math.floor(hours)}h ${mins}m`;
    
    // Sync Header Stats
    const streakEl = document.getElementById('hubStreak');
    const timeEl = document.getElementById('hubFocusTime');
    if (streakEl) streakEl.textContent = `${state.streaks.current} Day Streak`;
    if (timeEl) timeEl.textContent = timeStr;

    let tag = "";
    if (hours >= 8) tag = "👸 WONDER GIRL";
    else if (hours >= 6) tag = "💎 GREAT JOB";
    else if (hours >= 4) tag = "🟢 TROUBLE SOLVED";

    state.player.productivityTag = tag;
    const rankEl = document.getElementById('playerRank');
    if (rankEl) {
        rankEl.textContent = `${state.player.rank} | ${tag || "Exploring..."}`;
    }
};

const playChime = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode); gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
    oscillator.start(); oscillator.stop(audioCtx.currentTime + 1);
};

window.phoenixReset = () => {
    const confirmation = confirm("🔥 Are you ready for the PHOENIX RESET? This will clear all progress and restart your journey from April 10th. There is no turning back.");
    if (confirmation) {
        state = JSON.parse(JSON.stringify(defaultState));
        state.phoenixActive = true;
        state.player.rank = "Phoenix Reborn";
        save();
        showToast("🔥 THE PHOENIX ASCENDS. April 10th is Day Zero.");
        setTimeout(() => window.location.href = 'index.html', 2000);
    }
};

// --- GLOBAL POMODORO SYSTEM ⏱️ ---
const POMODORO_DEFAULTS = {
    focus: 25,
    break: 5,
    mode: 'focus',
    timeLeft: 1500,
    running: false,
    minimized: false,
    sessionsCompleted: 0
};

let pomo = JSON.parse(localStorage.getItem('forest_pomo')) || POMODORO_DEFAULTS;

const savePomo = () => localStorage.setItem('forest_pomo', JSON.stringify(pomo));

const injectPomodoroUI = () => {
    // Inject CSS
    if (!document.getElementById('pomoStyles')) {
        const link = document.createElement('link');
        link.id = 'pomoStyles';
        link.rel = 'stylesheet';
        link.href = 'pomo.css';
        document.head.appendChild(link);
    }

    // Only inject if it doesn't exist
    if (document.getElementById('pomoContainer')) return;

    const html = `
        <div id="pomoFAB" class="pomo-fab" onclick="togglePomoPanel()">
            <span class="pomo-icon">⏱️</span>
            <div id="pomoMiniTimer" class="pomo-mini-timer">25:00</div>
        </div>

        <div id="pomoPanel" class="pomo-panel">
            <div class="pomo-header">
                <h3>FOCUS ENGINE</h3>
                <button class="pomo-close" onclick="togglePomoPanel()">&times;</button>
            </div>
            
            <div id="pomoDisplay" class="pomo-display mode-${pomo.mode}">
                <div class="pomo-working-on" id="pomoWorkingOn">Working on: Level 1</div>
                <div class="pomo-mode-label" id="pomoModeLabel">${pomo.mode.toUpperCase()}</div>
                <div class="pomo-time" id="pomoTime">25:00</div>
            </div>

            <div class="pomo-controls">
                <button id="pomoStartBtn" class="pomo-btn main" onclick="pomoControl.start()">START</button>
                <button id="pomoPauseBtn" class="pomo-btn" style="display:none" onclick="pomoControl.pause()">PAUSE</button>
                <div class="pomo-secondary-controls">
                    <button class="pomo-btn reset" onclick="pomoControl.reset()">CANCEL</button>
                    <button class="pomo-btn popout" onclick="pomoControl.popout()">📺 POP-OUT</button>
                </div>
            </div>

            <div class="pomo-settings">
                <div class="pomo-setting-group">
                    <label>Focus (min)</label>
                    <input type="number" id="pomoFocusInput" value="${pomo.focus}" onchange="pomoControl.updateSettings()">
                </div>
                <div class="pomo-setting-group">
                    <label>Break (min)</label>
                    <input type="number" id="pomoBreakInput" value="${pomo.break}" onchange="pomoControl.updateSettings()">
                </div>
            </div>
        </div>
    `;
    const container = document.createElement('div');
    container.id = "pomoContainer";
    container.innerHTML = html;
    document.body.appendChild(container);
    pomoControl.updateUI();
};

const pomoControl = {
    timerInterval: null,
    
    start() {
        if (pomo.running) return;
        pomo.running = true;
        savePomo();
        this.runTimer();
    },

    pause() {
        pomo.running = false;
        clearInterval(this.timerInterval);
        savePomo();
        this.updateUI();
    },

    reset() {
        this.pause();
        pomo.mode = 'focus';
        pomo.timeLeft = pomo.focus * 60;
        savePomo();
        this.updateUI();
    },

    async popout() {
        if ('documentPictureInPicture' in window) {
            try {
                // Request a PiP window
                const pipWindow = await window.documentPictureInPicture.requestWindow({
                    width: 300,
                    height: 250,
                });

                // Copy styles to the PiP window
                Array.from(document.styleSheets).forEach((styleSheet) => {
                    try {
                        const cssRules = Array.from(styleSheet.cssRules)
                            .map((rule) => rule.cssText)
                            .join('');
                        const style = document.createElement('style');
                        style.textContent = cssRules;
                        pipWindow.document.head.appendChild(style);
                    } catch (e) {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = styleSheet.href;
                        pipWindow.document.head.appendChild(link);
                    }
                });

                // Add glassmorphic body style
                const baseStyle = pipWindow.document.createElement('style');
                baseStyle.textContent = `
                    body { 
                        background: #040d08 !important; 
                        margin: 0; padding: 20px; 
                        display: flex; flex-direction: column; 
                        justify-content: center; align-items: center;
                        height: 100vh; overflow: hidden;
                        font-family: 'Outfit', sans-serif;
                    }
                    .pomo-panel { 
                        display: block !important; position: static !important; 
                        width: 100% !important; background: transparent !important; border: none !important;
                    }
                    .pomo-settings, .pomo-popout { display: none !important; }
                `;
                pipWindow.document.head.appendChild(baseStyle);

                // Clone the panel content
                const originalPanel = document.getElementById('pomoPanel');
                const content = originalPanel.cloneNode(true);
                pipWindow.document.body.appendChild(content);

                // Bind events in the new window
                const updatePiPUI = () => {
                    const mins = Math.floor(pomo.timeLeft / 60);
                    const secs = pomo.timeLeft % 60;
                    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
                    pipWindow.document.getElementById('pomoTime').textContent = timeStr;
                    pipWindow.document.getElementById('pomoModeLabel').textContent = pomo.mode.toUpperCase();
                    
                    const startBtn = pipWindow.document.getElementById('pomoStartBtn');
                    const pauseBtn = pipWindow.document.getElementById('pomoPauseBtn');
                    if (startBtn && pauseBtn) {
                        startBtn.style.display = pomo.running ? 'none' : 'block';
                        pauseBtn.style.display = pomo.running ? 'block' : 'none';
                    }
                };

                pipWindow.document.getElementById('pomoStartBtn').onclick = () => { pomoControl.start(); updatePiPUI(); };
                pipWindow.document.getElementById('pomoPauseBtn').onclick = () => { pomoControl.pause(); updatePiPUI(); };
                
                // User Request: Cancel Button (Reset)
                const resetBtn = pipWindow.document.querySelector('.pomo-btn.reset');
                if (resetBtn) {
                    resetBtn.innerHTML = '🔁 RESET'; // or ❌ CANCEL
                    resetBtn.onclick = () => { pomoControl.reset(); updatePiPUI(); };
                }

                // Use Icons for Play/Pause in PiP
                pipWindow.document.getElementById('pomoStartBtn').innerHTML = '▶️ RESUME';
                pipWindow.document.getElementById('pomoPauseBtn').innerHTML = '⏸️ PAUSE';

                // Keep synced
                const syncInterval = setInterval(updatePiPUI, 1000);
                pipWindow.addEventListener('pagehide', () => clearInterval(syncInterval));

            } catch (err) {
                console.error("PiP failed, using standard popout", err);
                this.fallbackPopout();
            }
        } else {
            this.fallbackPopout();
        }
    },

    fallbackPopout() {
        const width = 280;
        const height = 240;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        window.open('pomo_popout.html', 'PomoTimer', 
            `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no,status=no,menubar=no,toolbar=no`);
    },

    updateSettings() {
        pomo.focus = parseInt(document.getElementById('pomoFocusInput').value) || 25;
        pomo.break = parseInt(document.getElementById('pomoBreakInput').value) || 5;
        if (!pomo.running) {
            pomo.timeLeft = (pomo.mode === 'focus' ? pomo.focus : pomo.break) * 60;
        }
        savePomo();
        this.updateUI();
    },

    runTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            if (pomo.timeLeft > 0) {
                pomo.timeLeft--;
                this.updateUI();
                savePomo();
            } else {
                this.onFinish();
            }
        }, 1000);
    },

    onFinish() {
        this.pause();
        playChime();
        if (pomo.mode === 'focus') {
            pomo.mode = 'break';
            pomo.timeLeft = pomo.break * 60;
            pomo.sessionsCompleted++;
            showToast("🍅 Focus session complete! Take a break.");
            addXP(20);
            if (pomo.sessionsCompleted % 3 === 0) {
                showToast("🔥 3 Sessions in a row! Streak Bonus XP.");
                addXP(50);
            }
        } else {
            pomo.mode = 'focus';
            pomo.timeLeft = pomo.focus * 60;
            showToast("💪 Break over! Get back to the conquest.");
        }
        savePomo();
        this.updateUI();
        
        // --- NEW: AUTOMATIC SHIFT (Instant) ---
        setTimeout(() => this.start(), 1000); 
    },

    updateUI() {
        const mins = Math.floor(pomo.timeLeft / 60);
        const secs = pomo.timeLeft % 60;
        const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
        
        const display = document.getElementById('pomoTime');
        const mini = document.getElementById('pomoMiniTimer');
        const label = document.getElementById('pomoModeLabel');
        const workingOn = document.getElementById('pomoWorkingOn');
        const startBtn = document.getElementById('pomoStartBtn');
        const pauseBtn = document.getElementById('pomoPauseBtn');

        if (display) display.textContent = timeStr;
        if (mini) mini.textContent = timeStr;
        if (label) label.textContent = pomo.mode.toUpperCase();
        
        if (workingOn) {
            const next = getNextTask();
            workingOn.textContent = `Working on: ${next.title}`;
        }
        
        const displayContainer = document.getElementById('pomoDisplay');
        if (displayContainer) {
            displayContainer.className = `pomo-display mode-${pomo.mode}`;
        }

        if (startBtn && pauseBtn) {
            startBtn.style.display = pomo.running ? 'none' : 'block';
            pauseBtn.style.display = pomo.running ? 'block' : 'none';
        }

        const fab = document.getElementById('pomoFAB');
        if (fab) {
            fab.className = `pomo-fab ${pomo.running ? 'pomo-active' : ''} mode-${pomo.mode}`;
        }
    }
};

window.togglePomoPanel = () => {
    const panel = document.getElementById('pomoPanel');
    if (panel) panel.classList.toggle('active');
};

// Auto-init on all pages
document.addEventListener('DOMContentLoaded', () => {
    injectPomodoroUI();
    if (pomo.running) pomoControl.runTimer();
});
