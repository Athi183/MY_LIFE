// calendar.js: Logic for Life Calendar 📅
document.addEventListener('DOMContentLoaded', () => {
    
    const eventModal = document.getElementById('eventModal');
    const calendarEl = document.getElementById('calendar');
    
    let calendar;
    let events = JSON.parse(localStorage.getItem('forest_life_events')) || [];

    // --- REMINDER LOGIC (3 Days Prior) ---
    const checkReminders = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        events.forEach(event => {
            const eventDate = new Date(event.start);
            eventDate.setHours(0, 0, 0, 0);
            
            // Difference in days
            const diffTime = eventDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 3) {
                // Trigger localized reminder
                setTimeout(() => {
                    showToast(`🕒 REMINDER: "${event.title}" is in 3 days!`);
                    if (Notification.permission === "granted") {
                        new Notification("SkillUp 2027", {
                            body: `Upcoming: ${event.title} on ${event.start}`,
                            icon: "https://emojipedia-us.s3.amazonaws.com/source/skype/289/calendar_1f4c5.png"
                        });
                    }
                }, 1000);
            }
        });
    };

    // --- CALENDAR INITIALIZATION ---
    const initCalendar = () => {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            themeSystem: 'standard',
            events: events,
            dateClick: function(info) {
                openEventModal(info.dateStr);
            },
            eventClick: function(info) {
                if(confirm(`Delete "${info.event.title}"?`)) {
                    info.event.remove();
                    events = events.filter(e => e.id !== info.event.id);
                    saveEvents();
                    showToast("🗑️ Event removed.");
                }
            }
        });
        calendar.render();
    };

    // --- MODAL & EVENT ACTIONS ---
    window.openEventModal = (dateStr) => {
        document.getElementById('eventDate').value = dateStr;
        eventModal.classList.add('active');
        document.getElementById('eventTitle').focus();
    };

    window.closeEventModal = () => eventModal.classList.remove('active');

    window.saveLifeEvent = () => {
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;

        if (!title || !date) {
            showToast("⚠️ Title and date are required!");
            return;
        }

        const newEvent = {
            id: 'event_' + Date.now(),
            title: title,
            start: date,
            allDay: true,
            color: '#bb86fc' // Purple accent
        };

        events.push(newEvent);
        calendar.addEvent(newEvent);
        saveEvents();
        
        showToast("✨ Event locked into your timeline!");
        closeEventModal();
        document.getElementById('eventTitle').value = '';
    };

    const saveEvents = () => {
        localStorage.setItem('forest_life_events', JSON.stringify(events));
    };

    // Request Notification permission
    if ("Notification" in window && Notification.permission !== "denied") {
        Notification.requestPermission();
    }

    initCalendar();
    checkReminders();
});
