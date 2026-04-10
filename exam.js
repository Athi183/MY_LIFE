/**
 * EXAM MASTERY HUB: COMPREHENSIVE CONQUEST ⚔️
 * Handles the 5-subject syllabus for Comprehensive Exams.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURATION: SYLLABUS ---
    
    const ML_MASTERY_SYLLABUS = [
        "Week 0: Probability Theory, Linear Algebra, Convex Optimization - (Recap)",
        "Week 1: Introduction: Statistical Decision Theory - Regression, Classification, Bias Variance",
        "Week 2: Linear Regression, Multivariate Regression, Subset Selection, Shrinkage Methods, PCR, PLS",
        "Week 3: Linear Classification, Logistic Regression, Linear Discriminant Analysis",
        "Week 4: Perceptron, Support Vector Machines",
        "Week 5: Neural Networks - Introduction, Backpropagation, Initialization, Estimation (MLE, MAP)",
        "Week 6: Decision Trees, Regression Trees, Pruning, Loss functions, Instability Evaluation",
        "Week 7: Bootstrapping & Cross Validation, ROC curve, Ensemble (Bagging, Stacking, Boosting)",
        "Week 8: Gradient Boosting, Random Forests, Multi-class Classification, Naive Bayes, Bayesian Networks",
        "Week 9: Undirected Graphical Models, HMM, Variable Elimination, Belief Propagation",
        "Week 10: Partitional Clustering, Hierarchical Clustering, Birch Algorithm, CURE Algorithm, Density-based",
        "Week 11: Gaussian Mixture Models, Expectation Maximization",
        "Week 12: Learning Theory, Introduction to Reinforcement Learning (TD learning, Solution Methods)"
    ];

    const UNIVERSITY_SUBJECTS = {
        dsa: { 
            name: "DSA", 
            icon: "🌳", 
            modules: [
                "Basic Concepts: Life Cycle, Performance Analysis, Complexity calculation",
                "Arrays & Searching: Sparse matrix, Stacks, Queues, Expressions, Search",
                "Linked List & Memory: Singly/Doubly/Circular, Allocation schemes",
                "Trees & Graphs: Traversals, Binary Search Trees, DFS/BFS, Applications",
                "Sorting & Hashing: Selection/Quick/Heap Sort, Resolution, Functions"
            ] 
        },
        os: { 
            name: "Operating Systems", 
            icon: "⚙️", 
            modules: [
                "Introduction: OS overview, System calls, Structure, Boot process",
                "Processes: PCB, Threads, Scheduling, IPC, Algos (FCFS, Priority, RR)",
                "Sync & Deadlocks: Race conditions, Mutex, Semaphores, Banker's Algo",
                "Memory Mgmt: Address spaces, Swapping, Paging, Segmentation, Demand Paging",
                "File & Storage: Attributes, Access methods, Allocation, Disk scheduling"
            ] 
        },
        coa: { 
            name: "COA", 
            icon: "💻", 
            modules: [
                "Basic Structure: Functional units, Bus, Memory ops, Instruction cycle",
                "Register Transfer Logic: Arithmetic/Logic micro-ops, ALU design, Shifter",
                "Arithmetic & Pipelining: Restoration divide, Booth's Algo, Pipeline hazards",
                "Control Logic: Hardwired vs Microprogram control, Sequencer, Organization",
                "I/O & Memory: Interrupts, DMA, ROMs, Cache mapping functions"
            ] 
        },
        dbms: { 
            name: "DBMS", 
            icon: "📊", 
            modules: [
                "Intro & ER Model: Schema architecture, Notations, Constraints, Weak entities",
                "Relational Model: Integrity constraints, Relational Algebra, SQL DDL",
                "SQL DML & Organization: Queries, Nested/Correlated, Views, Triggers, B-Trees",
                "Normalization: Functional dependency, Closures, 1NF/2NF/3NF/BCNF, LJ/DP",
                "Transactions & NoSQL: Concurrency, 2PL, Recovery, Redis/Mongo/Cassandra"
            ] 
        },
        flat: { 
            name: "FLAT", 
            icon: "🧮", 
            modules: [
                "Formal Language: DFA/NFA equivalence, Regular Grammar",
                "Regular Langs: RE equivalence, Homomorphisms, Closure properties, Minimization",
                "MNR & CFGs: Myhill-Nerode, CFG representation, Normal forms",
                "PDAs & CFLs: PDA/CFG equivalence, Pumping Lemma, Closure properties",
                "CSLs & TMs: CSLs, Turing Machines, Universal TM, Chomsky classification"
            ] 
        }
    };

    // --- 2. CORE RENDERING ENGINE ---

    const renderAll = () => {
        renderMLHub();
        renderSyllabus();
        updateHUD();
    };

    const renderMLHub = () => {
        const container = document.getElementById('mlSyllabusGrid');
        if (!container) return;

        if (!state.battlePlan.mlMastery) state.battlePlan.mlMastery = [];

        container.innerHTML = ML_MASTERY_SYLLABUS.map((title, idx) => {
            const isDone = state.battlePlan.mlMastery.includes(idx);
            return `
                <div class="ml-week-item ${isDone ? 'completed' : ''}" onclick="toggleMLWeek(${idx})">
                    <div class="week-check">${isDone ? '✓' : ''}</div>
                    <div class="week-info">
                        <span class="week-label">WEEK ${idx}</span>
                        <p class="week-title">${title}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Progress bar for ML Hub
        const done = state.battlePlan.mlMastery.length;
        const total = ML_MASTERY_SYLLABUS.length;
        const pct = Math.round((done / total) * 100);
        const barFill = document.getElementById('mlProgressFill');
        const text = document.getElementById('mlProgressText');
        if (barFill) barFill.style.width = `${pct}%`;
        if (text) text.textContent = `${done}/${total} Weeks Completed (${pct}%)`;
    };

    window.toggleMLWeek = (weekIdx) => {
        if (!state.battlePlan.mlMastery) state.battlePlan.mlMastery = [];
        const index = state.battlePlan.mlMastery.indexOf(weekIdx);
        
        if (index > -1) {
            state.battlePlan.mlMastery.splice(index, 1);
        } else {
            state.battlePlan.mlMastery.push(weekIdx);
            if (typeof addXP === 'function') addXP(20);
            showToast("🎖️ ML Week Conquered! +20 XP.");
        }
        save();
        renderAll();
    };

    const updateHUD = () => {
        if (!state) return;
        
        // Removed Streaks as requested
        const xpEl = document.getElementById('playerXP');
        const nextXpEl = document.getElementById('xpToNext');
        const xpFill = document.getElementById('xpFill');
        if (xpEl) xpEl.textContent = state.player.xp;
        if (nextXpEl) nextXpEl.textContent = state.player.lv * 100;
        if (xpFill) {
            const pct = (state.player.xp / (state.player.lv * 100)) * 100;
            xpFill.style.width = `${pct}%`;
        }

        const title = document.getElementById('playerRank');
        if (title) title.textContent = `Comprehensive Mastery Hub`;

        // YouTube Reminder (Tue/Thu)
        const date = new Date();
        const day = date.getDay(); // 2=Tue, 4=Thu
        const yt = document.getElementById('ytReminder');
        if (yt) yt.style.display = (day === 2 || day === 4) ? 'flex' : 'none';
    };

    const renderSyllabus = () => {
        const container = document.getElementById('syllabusGrid');
        if (!container) return;

        container.innerHTML = Object.entries(UNIVERSITY_SUBJECTS).map(([id, sub]) => {
            const done = (state.battlePlan.completedModules[id] || []).length;
            const total = sub.modules.length;
            const pct = Math.round((done / total) * 100);

            return `
                <div class="subject-card border-glow-blue">
                    <div class="subject-header">
                        <h4>${sub.icon} ${sub.name}</h4>
                    </div>
                    <span class="progress-info">${done}/${total} Modules Mastered (${pct}%)</span>
                    <div class="mini-progress-bar"><div class="bar-fill" style="width: ${pct}%"></div></div>
                    <div class="module-tracker">
                        ${sub.modules.map((mod, idx) => {
                            const isModDone = (state.battlePlan.completedModules[id] || []).includes(idx);
                            return `
                                <div class="module-item ${isModDone ? 'completed' : ''}" onclick="toggleModule('${id}', ${idx})">
                                    <span>Mod ${idx + 1}: ${mod}</span>
                                    <span>${isModDone ? '✅' : '○'}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    };

    // --- 3. INTERACTION HANDLERS ---

    window.toggleModule = (subjectId, modIdx) => {
        if (!state.battlePlan.completedModules[subjectId]) state.battlePlan.completedModules[subjectId] = [];
        const index = state.battlePlan.completedModules[subjectId].indexOf(modIdx);
        
        if (index > -1) {
            state.battlePlan.completedModules[subjectId].splice(index, 1);
        } else {
            state.battlePlan.completedModules[subjectId].push(modIdx);
            if (typeof addXP === 'function') addXP(10);
            showToast("✅ Module Mastered! +10 XP.");
        }
        save();
        renderAll();
    };

    window.closeLevelModal = () => {
        document.getElementById('levelModal').classList.remove('active');
    };

    // Initialize
    if (typeof patchState === 'function') patchState();
    renderAll();
});
