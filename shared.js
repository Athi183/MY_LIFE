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
            "📅 April 8 - Day 1 Mission: Percentages Basics (Fractions conversion) + Solve 8 simple questions.",
            "📅 April 9 - Day 2 Mission: Percentage Increase/Decrease (Interest building) + Solve 8 questions.",
            "📅 April 10 - Day 3 Mission: Percentages: Successive Changes & Population + Solve 10 questions.",
            "📅 April 11 - Day 4 Mission: Profit & Loss: Basic CP, SP & Profit concept + Solve 8 questions.",
            "📅 April 12 - Day 5 Mission: Profit & Loss: Profit/Loss Percentage calculation + Solve 10 questions.",
            "📅 April 13 - Day 6 Mission: Profit & Loss: Dishonest Dealer & Successive Sell + Solve 8 questions.",
            "📅 April 14 - Day 7 Mission: Ratios: Introduction & Basic Simplification + Solve 10 questions.",
            "📅 April 15 - Day 8 Mission: Ratios & Proportion: Direct & Inverse proportion + Solve 8 questions.",
            "📅 April 16 - Day 9 Mission: Ratios: Practical Word Problems (Ages/Money) + Solve 8 questions.",
            "📅 April 17 - Day 10 Mission: Time & Work: Basic Unitary Method & Efficiency + Solve 10 questions.",
            "📅 April 18 - Day 11 Mission: Time & Work: LCM Approach for Multiple Workers + Solve 8 questions.",
            "📅 April 19 - Day 12 Mission: Time & Work: Alternate Days & Joining/Leaving + Solve 10 questions.",
            "📅 April 20 - Day 13 Mission: Time & Work: Pipes & Cisterns Logic + Solve 8 questions.",
            "📅 April 21 - Final Day Mission: Comprehensive Speed Challenge (20 Mixed questions)."
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
            "📅 April 8 - Day 1 Mission: Arrays: Find Max & Min element in an array.",
            "📅 April 9 - Day 2 Mission: Arrays: Reverse an array without extra space.",
            "📅 April 10 - Day 3 Mission: Arrays: Two Sum Problem (Find target sum).",
            "📅 April 11 - Day 4 Mission: Arrays: Find Duplicate in Array.",
            "📅 April 12 - Day 5 Mission: Strings: Valid Palindrome check.",
            "📅 April 13 - Day 6 Mission: Strings: Valid Anagram check.",
            "📅 April 14 - Day 7 Mission: Strings: First Unique Character in String.",
            "📅 April 15 - Day 8 Mission: Strings: Reverse Words in a String.",
            "📅 April 16 - Day 9 Mission: Strings: String Compression basic logic.",
            "📅 April 17 - Day 10 Mission: Recursion: Factorial of N (Visualizing call stack).",
            "📅 April 18 - Day 11 Mission: Recursion: Fibonacci Sequence (Basic).",
            "📅 April 19 - Day 12 Mission: Recursion: Sum of digits of a number.",
            "📅 April 20 - Day 13 Mission: Recursion: Power of N recursive solution.",
            "📅 April 21 - Final Day Mission: Final Marathon: 1 Array problem + 1 String problem."
        ]
    }
};

const levels = [
    { id: 'beginner', name: 'Beginner Grove', icon: '🌱' },
    { id: 'logic', name: 'Logic Woods (OS)', icon: '🌿' },
    { id: 'core', name: 'Core Forest (DBMS)', icon: '🌳' },
    { id: 'algorithm', name: 'Algorithm Valley (DSA)', icon: '🧠' },
    { id: 'hardware', name: 'Hardware Highlands (COA)', icon: '🏛️' },
    { id: 'automata', name: 'Automata Arena (TOC/Compilers)', icon: '🏭' },
    { id: 'queen', name: 'Wonder Girl Arena (Revision)', icon: '👑' }
];

const treeStages = ['🌱 Seed', '🌿 Sapling', '🌳 Mature'];

const defaultState = {
    player: { lv: 1, xp: 0, rank: "Explorer", productivityTag: "" },
    unlockedSteps: ['beginner'],
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
        aptitude: { time: "4:30 – 5:30", completed: false },
        coding: { time: "5:45 – 6:45", completed: false },
        gate: { time: "10:30 – 11:30", completed: false },
        da: { time: "Afternoon (1 hr)", completed: false },
        english: { time: "Flexible (20m)", completed: false }
    }
};

const save = () => localStorage.setItem('forest_ascension_v4', JSON.stringify(state));
let state = JSON.parse(localStorage.getItem('forest_ascension_v4')) || defaultState;

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

const updateProductivityTag = () => {
    const hours = state.focusTimeToday / 3600;
    let tag = "";
    if (hours >= 8) tag = "👸 WONDER GIRL";
    else if (hours >= 6) tag = "💎 GREAT JOB";
    else if (hours >= 4) tag = "🟢 TROUBLE SOLVED";

    state.player.productivityTag = tag;
    const el = document.getElementById('playerRank');
    if (el && tag) el.textContent = `${state.player.rank} | ${tag}`;
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
