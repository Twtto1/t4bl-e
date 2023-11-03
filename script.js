document.addEventListener('DOMContentLoaded', function() {
    const backgroundImage = document.querySelector('body');
    fetch('https://source.unsplash.com/random/1920x1080?nature,water')
        .then((response) => {
            backgroundImage.style.backgroundImage = `url(${response.url})`;
        });

    const activities = [
        "Speed Shower Challenge - Set a timer for 5 minutes.",
        "Wardrobe Puzzle - Get dressed in under 2 minutes.",
        // ... (add more activities here)
    ];

    const drawButton = document.getElementById('draw-button');
    const activityDisplay = document.getElementById('activity-display');
    const activityTableBody = document.querySelector('#activity-table tbody');

    drawButton.addEventListener('click', function() {
        // Clear any existing scramble intervals
        if (window.scrambleInterval) {
            clearInterval(window.scrambleInterval);
        }

        // Start the scramble effect
        window.scrambleInterval = setInterval(() => {
            // Display a random activity for the scramble effect
            activityDisplay.textContent = activities[Math.floor(Math.random() * activities.length)];
        }, 100);

        // Set a timeout to stop the scramble effect and display the selected activity
        setTimeout(() => {
            // Stop the scramble effect
            clearInterval(window.scrambleInterval);

            // Select a random activity to display
            let randomIndex = Math.floor(Math.random() * activities.length);
            let selectedActivity = activities[randomIndex];
            activityDisplay.textContent = selectedActivity;

            // Create a new row at the top of the table for the selected activity
            let rowCount = activityTableBody.rows.length + 1;
            let row = activityTableBody.insertRow(0);
            let cell = row.insertCell(0);
            cell.textContent = `${rowCount}. ${selectedActivity}`;
        }, 2000); // 2 seconds for the scramble effect
    });
});
