// Get the leaderboard table and tbody elements
const leaderboardTable = document.getElementById('rankings');
const leaderboardTbody = leaderboardTable.querySelector('tbody');
const empty = document.getElementById('ures');

// Retrieve the game results from localStorage
const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
// Check if gameResults is empty, if so display a message
if (gameResults.length === 0) {
    empty.innerHTML = 'Nincs még adat rögzítve!😢';
}

// Create a function to sort the game results by a given column and update the leaderboard table
const sortByColumn = (columnName) => {
    let sortFunction;
    switch (columnName) {
        case 'Pont':
            sortFunction = (a, b) => {
                if (a.score === b.score) {
                    return b.time - a.time;
                }
                return a.score - b.score;
            };
            break;
        case 'Idő':
            sortFunction = (a, b) => {
                if (a.time === b.time) {
                    return b.score - a.score;
                }
                return a.time - b.time;
            };
            break;
        case 'Lépés':
            sortFunction = (a, b) => {
                if (a.step === b.step) {
                    return b.score - a.score;
                }
                return a.step - b.step;
            };
            break;
        case 'Dátum':
            sortFunction = (a, b) => {
                return new Date(a.date) - new Date(b.date);
            };
            break;
        default:
            sortFunction = (a, b) => {
                return a.username.localeCompare(b.username);
            };
            break;
    }
    gameResults.sort(sortFunction);
    renderLeaderboard();
};

// Add click event listeners to all header cells that call the sortByColumn function with the appropriate column name
const headers = document.querySelectorAll('th');
headers.forEach((header) => {
    header.addEventListener('click', () => {
        const columnName = header.textContent.trim();
        sortByColumn(columnName);
    });
});

// Create a function to render the leaderboard table based on the game results
const renderLeaderboard = (searchText) => {
    leaderboardTbody.innerHTML = '';
    gameResults.forEach((result) => {
        if (result.username.toLowerCase().includes(searchText.toLowerCase())) {
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
        }
    });
};

// Call the renderLeaderboard function to initially render the leaderboard table
renderLeaderboard('');

// Add an input event listener to the search input element to dynamically update the leaderboard table based on the search text
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.trim();
    renderLeaderboard(searchText);
});