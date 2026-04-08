// exam.js: Exam Mastery Mode Logic
document.addEventListener('DOMContentLoaded', () => {
    const SYLLABUS_DATA = {
        level1: {
            title: "Level 1: Foundation Phase",
            phase: "Foundation",
            dates: "April 9–15",
            days: [
                { date: "April 9", tasks: ["DSA: Basics + Complexity", "OS: Intro + System Calls"] },
                { date: "April 10", tasks: ["DSA: Arrays + Searching", "DBMS: ER Model"] },
                { date: "April 11", tasks: ["DSA: Linked List", "OS: Processes + Scheduling"] },
                { date: "April 12", tasks: ["DSA: Trees", "DBMS: Relational Model + SQL"] },
                { date: "April 13", tasks: ["DSA: Graphs + Sorting", "OS: Synchronization + Deadlocks"] },
                { date: "April 14", tasks: ["COA: Basics + Instruction Cycle", "DBMS: Normalization"] },
                { date: "April 15", tasks: ["COA: ALU + Pipelining", "FLAT: DFA + NFA + RE"] }
            ]
        },
        level2: {
            title: "Level 2: Strengthening Phase",
            phase: "Strengthen",
            dates: "April 16–20",
            days: [
                { date: "April 16", tasks: ["DSA: Revision + MCQs"] },
                { date: "April 17", tasks: ["OS: Revision + MCQs"] },
                { date: "April 18", tasks: ["DBMS: Revision + MCQs"] },
                { date: "April 19", tasks: ["COA + FLAT: MCQs"] },
                { date: "April 20", tasks: ["Mixed MCQs (All subjects)"] }
            ]
        },
        level3: {
            title: "Level 3: Exam Mode",
            phase: "Exam",
            dates: "April 21–24",
            days: [
                { date: "April 21", tasks: ["Full Syllabus Revision (Short notes)"] },
                { date: "April 22", tasks: ["Full Syllabus Revision (Short notes)"] },
                { date: "April 23", tasks: ["2 Mock Tests"] },
                { date: "April 24", tasks: ["Light Revision (No new topics)"] }
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
