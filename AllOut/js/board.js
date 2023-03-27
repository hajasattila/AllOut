// Get the leaderboard table and tbody elements
const leaderboardTable = document.getElementById('rankings');
const leaderboardTbody = leaderboardTable.querySelector('tbody');

// Retrieve the game results from localStorage
const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];

// Sort the game results by score (descending) and time (ascending)
gameResults.sort((a, b) => {
    if (a.score === b.score) {
        return b.time - a.time;
    }
    return a.score - b.score;
});

// Clear the leaderboard table
leaderboardTbody.innerHTML = '';

// Iterate over the game results and add them to the leaderboard table
gameResults.forEach((result) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = result.username;
    row.appendChild(nameCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = result.score;
    row.appendChild(scoreCell);

    const timeCell = document.createElement('td');
    timeCell.textContent = result.time;
    row.appendChild(timeCell);

    const stepCell = document.createElement('td');
    stepCell.textContent = result.step;
    row.appendChild(stepCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = new Date(result.date).toLocaleDateString();
    row.appendChild(dateCell);

    leaderboardTbody.appendChild(row);
});