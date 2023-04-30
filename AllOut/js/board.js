
const leaderboardTable = document.getElementById('rankings');
const leaderboardTbody = leaderboardTable.querySelector('tbody');
const empty = document.getElementById('ures');


const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];

if (gameResults.length === 0) {
    empty.textContent = 'Nincsenek még adatok rögzítve!';
}


const sortByColumn = (columnName) => {
    let sortFunction;
    switch (columnName) {
        case 'Pont':
            sortFunction = (a, b) => {
                if (a.score === b.score) {
                    return a.time - b.time;
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
                    return a.score - b.score;
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
                return a.time.localeCompare(b.score);
            };
            break;
    }
    gameResults.sort(sortFunction)
    renderLeaderboard();
};

const headers = document.querySelectorAll('th');
headers.forEach((header) => {
    header.addEventListener('click', () => {
        const columnName = header.textContent.trim();
        sortByColumn(columnName);
    });
});

const renderLeaderboard = (searchText = '') => {
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

renderLeaderboard();
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.trim();
    renderLeaderboard(searchText);
});