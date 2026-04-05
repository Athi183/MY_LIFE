// shared.js: The Forest Ascension Core Engine
const ROADMAP_CONTENT = {
    english: {
        title: "🟣 English Mastery", goal: "Speak confidently & improve fluency", structure: "5m Read + 5m Speak + 5m Record", reward: "Fluent Starter Badge",
        tasks: Array.from({length: 30}, (_, i) => {
            const d = i + 1;
            if (d <= 5) return "Read simple paragraph; Speak: 'About my day'";
            if (d <= 10) return "Read articles (basic); Speak: 'Explain what you read'";
            if (d <= 15) return "Topic speaking: Technology / College life";
            if (d <= 20) return "Watch 5m English video; Repeat & Mimic style";
            if (d <= 25) return "Speak without preparation; Record daily";
            return "2-3m continuous speaking; No hesitation target";
        })
    },
    aptitude: {
        title: "🟢 Aptitude Mastery", goal: "Build logic & speed", structure: "Learn concept + Solve 10 questions", reward: "Logic Explorer Badge",
        tasks: Array.from({length: 30}, (_, i) => {
            const d = i + 1;
            if (d <= 5) return "Topic: Percentages basics & applications";
            if (d <= 10) return "Topic: Ratio & Proportion foundations";
            if (d <= 15) return "Topic: Profit & Loss / Discount logic";
            if (d <= 20) return "Topic: Time & Work / Efficiency mechanics";
            if (d <= 25) return "Topic: Time, Speed, Distance / Trains";
            return "Mixed Practice: Combined speed tests & logic";
        })
    },
    gate: {
        title: "🔵 Computer Networks", goal: "Master Network Architecture & Protocols", structure: "Topic Study + Routing Logic + Security Basics", reward: "Network Architect Badge",
        tasks: Array.from({length: 30}, (_, i) => {
            const d = i + 1;
            if (d <= 3) return "OSI & TCP/IP Models: Layers, functionalities, and encapsulation.";
            if (d <= 6) return "IP Addressing & Subnetting: IPv4/v6, CIDR, and VLSM masks.";
            if (d <= 9) return "Routing Algorithms: Distance Vector (RIP) and Link State (OSPF).";
            if (d <= 12) return "Transport Layer: TCP (handshake, flags) and UDP (connectionless).";
            if (d <= 15) return "Data Link Control: Flow control, Sliding Window, and Error control.";
            if (d <= 18) return "Application Protocols: HTTP (web), DNS (naming), and FTP (file).";
            if (d <= 21) return "Network Security: RSA Encryption, Digital Signatures, and Firewalls.";
            if (d <= 24) return "Congestion Control: Leaky Bucket, Token Bucket, and TCP Reno.";
            if (d <= 27) return "MAC Protocols: CSMA/CD, CSMA/CA, and Ethernet Frame Logic.";
            return "Advanced Routing: BGP, IPv6 transition, and Software Defined Networking.";
        })
    },
    coding: {
        title: "💻 Coding Deep Work", goal: "Start thinking like a programmer", structure: "1 Concept + 1-2 Problems", reward: "Code Starter Badge",
        tasks: Array.from({length: 30}, (_, i) => {
            const d = i + 1;
            if (d <= 5) return "Topic: Arrays (Traversal, Searching, Subarrays)";
            if (d <= 10) return "Topic: Strings (Manipulation, Basic Patterns)";
            if (d <= 15) return "Topic: Sorting Algorithms (Bubble, Selection, Insertion)";
            if (d <= 20) return "Topic: Searching Algorithms (Binary Search basics)";
            if (d <= 25) return "Topic: Recursion basics (Factorial, Fibonacci)";
            return "Solve Easy Problems: LeetCode-style patterns";
        })
    }
};

const levels = [
    { id: 'beginner', name: 'Beginner Grove', icon: '🌱' },
    { id: 'logic', name: 'Logic Woods', icon: '🌿' },
    { id: 'core', name: 'Core Forest', icon: '🌳' },
    { id: 'deep', name: 'Deep Tech Valley', icon: '🧠' },
    { id: 'govt', name: 'Govt Tech Hub', icon: '🏛️' },
    { id: 'psu', name: 'PSU Power Zone', icon: '🏭' },
    { id: 'queen', name: 'Wonder Girl Arena', icon: '👑' }
];

const treeStages = ['🌱 Seed', '🌿 Sapling', '🌳 Mature'];

const defaultState = {
    player: { lv: 1, xp: 0, rank: "Explorer", productivityTag: "" },
    unlockedSteps: ['beginner'],
    streaks: { focus: 0 },
    roadmaps: {
        english: new Array(30).fill(false),
        aptitude: new Array(30).fill(false),
        gate: new Array(30).fill(false),
        coding: new Array(30).fill(false)
    },
    trees: { english: 0, aptitude: 0, gate: 0, coding: 0 },
    lastAction: { english: null, aptitude: null, gate: null, coding: null },
    focusTimeToday: 0
};

let state = JSON.parse(localStorage.getItem('forest_ascension_v4')) || defaultState;

const sharedElements = {
    get playerLv() { return document.getElementById('playerLevel'); },
    get xpBar() { return document.getElementById('xpFill'); },
    get toast() { return document.getElementById('toast'); },
    get modal() { return document.getElementById('missionModal'); },
    get modalContent() { return document.getElementById('modalDetails'); },
};

const save = () => localStorage.setItem('forest_ascension_v4', JSON.stringify(state));

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
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode); gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
    oscillator.start(); oscillator.stop(audioCtx.currentTime + 1);
};
