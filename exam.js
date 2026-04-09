// exam.js: Exam Mastery Mode Logic
document.addEventListener('DOMContentLoaded', () => {
    const SYLLABUS_DATA = {
        level1: {
            title: "Phase 1: ML Awakening (NPTEL)",
            phase: "Foundation",
            dates: "April 10–16",
            days: [
                { date: "April 10", tasks: ["ML: Probability & Decision Theory", "Aptitude: Ratios"] },
                { date: "April 11", tasks: ["ML: Linear & Logistic Regression", "Coding: Strings"] },
                { date: "April 12", tasks: ["ML: SVMs & Decision Trees", "GATE: Switching"] },
                { date: "April 13", tasks: ["ML: Neural Networks Deep Dive", "Coding: Binary Search"] },
                { date: "April 14", tasks: ["ML: Ensembles & Boosting", "GATE: Network Layer"] },
                { date: "April 15", tasks: ["ML: Graphical Models & Clustering", "Aptitude: Time & Work"] },
                { date: "April 16", tasks: ["ML: GMM/EM & Recap", "GATE: Routing"] }
            ]
        },
        level2: {
            title: "Phase 2: The University Trials",
            phase: "Strengthen",
            dates: "April 24–May 12",
            days: [
                { date: "April 24", tasks: ["⚔️ CST302: COMPILER DESIGN (EXAM)"] },
                { date: "April 28", tasks: ["⚔️ CST304: CGIP (EXAM)"] },
                { date: "May 02", tasks: ["⚔️ CST312: AAD (EXAM)"] },
                { date: "May 05", tasks: ["⚔️ CSTXXX: ELECTIVE-1 (EXAM)"] },
                { date: "May 08", tasks: ["⚔️ HUT300: IEFT (EXAM)"] },
                { date: "May 12", tasks: ["⚔️ CST308: COMPREHENSIVE (EXAM)"] }
            ]
        },
        level3: {
            title: "Phase 3: Final Conquest",
            phase: "Exam",
            dates: "May 13–20",
            days: [
                { date: "May 13", tasks: ["Post-Exam Reflection", "Career Roadmap Update"] },
                { date: "May 14", tasks: ["Resume Polish", "Portfolio Refinement"] }
            ]
        }
    };

    let examState = JSON.parse(localStorage.getItem('forest_exam_mastery')) || {
        completed: {},
        streak: 0,
        lastDate: null
    };

    const saveState = () => {
        localStorage.setItem('forest_exam_mastery', JSON.stringify(examState));
        updateOverallProgress();
    };

    const updateOverallProgress = () => {
        let total = 0;
        let done = 0;
        
        Object.keys(SYLLABUS_DATA).forEach(level => {
            let levelTotal = 0;
            let levelDone = 0;
            SYLLABUS_DATA[level].days.forEach(day => {
                day.tasks.forEach(task => {
                    levelTotal++;
                    if (examState.completed[`${level}-${day.date}-${task}`]) levelDone++;
                });
            });
            const percent = Math.round((levelDone / levelTotal) * 100);
            const bar = document.getElementById(`bar-${level}`);
            const text = document.getElementById(`percent-${level}`);
            if (bar) bar.style.width = `${percent}%`;
            if (text) text.textContent = `${percent}%`;
            
            total += levelTotal;
            done += levelDone;
        });

        const globalPercent = Math.round((done / total) * 100);
        const globalBar = document.getElementById('globalProgressBar');
        if (globalBar) globalBar.style.width = `${globalPercent}%`;
        
        const streakEl = document.getElementById('examStreak');
        if (streakEl) streakEl.textContent = examState.streak;
    };

    const renderLevel = (levelKey) => {
        const data = SYLLABUS_DATA[levelKey];
        const container = document.getElementById(`grid-${levelKey}`);
        if (!container) return;

        container.innerHTML = data.days.map(day => `
            <div class="day-card-mastery">
                <span class="day-date-mastery">${day.date}</span>
                ${day.tasks.map(task => {
                    const id = `${levelKey}-${day.date}-${task}`;
                    const isChecked = examState.completed[id];
                    return `
                        <div class="subject-item">
                            <label class="check-container">
                                <input type="checkbox" id="${id}" ${isChecked ? 'checked' : ''} onchange="toggleTask('${id}')">
                                <span class="checkmark"></span>
                            </label>
                            <div class="subject-info">
                                <div class="subject-name">${task.split(':')[0]}</div>
                                <div class="subject-desc">${task.split(':').slice(1).join(':').trim()}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `).join('');
    };

    window.toggleTask = (taskId) => {
        const checkbox = document.getElementById(taskId);
        if (checkbox) {
            // Browser has already toggled the checkbox due to onchange/click
            examState.completed[taskId] = checkbox.checked;
            
            if (checkbox.checked) {
                const now = new Date().toDateString();
                if (examState.lastDate !== now) {
                    examState.streak++;
                    examState.lastDate = now;
                }
            }
            
            saveState();
        }
    };

    const initialize = () => {
        renderLevel('level1');
        renderLevel('level2');
        renderLevel('level3');
        updateOverallProgress();
        
        const today = new Date();
        const month = today.getMonth();
        const date = today.getDate();
        if (month === 3) { // April
            const todayStr = `April ${date}`;
            document.querySelectorAll('.day-date-mastery').forEach(el => {
                if (el.textContent === todayStr) {
                    el.closest('.day-card-mastery').style.border = '2px solid var(--accent-cyan)';
                    el.innerHTML += " <span style='color: var(--accent-cyan); font-size: 0.7rem;'>[TODAY]</span>";
                }
            });
        }
    };

    initialize();
});
