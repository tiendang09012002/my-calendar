document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    const saveEventButton = document.getElementById('saveEvent');

    // Generate calendar days
    for (let i = 1; i <= 30; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.innerHTML = `<header>${i}</header>`;
        day.addEventListener('click', function () {
            eventModal.show();
        });
        calendar.appendChild(day);
    }

    saveEventButton.addEventListener('click', function () {
        const eventTitle = document.getElementById('eventTitle').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;

        if (eventTitle && eventDate && eventTime) {
            alert(`Event Saved: ${eventTitle} on ${eventDate} at ${eventTime}`);
            eventModal.hide();
        } else {
            alert('Please fill in all fields.');
        }
    });
});
