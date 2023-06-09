class App {
    constructor(element, size) {
        this.grid = this.initGrid(size);
        this.size = size;
        this.element = element;
        this.flip = this.flip.bind(this);
        this.element.addEventListener('click', this.flip);
        this.stepCounter = 0;
        this.score = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.won = false;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                let div = document.createElement('div');
                div.style.width = (350 / size) + 'px';
                div.style.height = (350 / size) + 'px';
                div.dataset.location = JSON.stringify({ r, c });
                div.className = Math.random() < 0.5 ? 'flip' : '';
                element.appendChild(div);
            }
        }
    }
    render(r, c, delay) {
        let div = this.element.children[r * this.size + c];
        div.className = this.grid[r][c] ? ('flip' + (delay ? ' flip-delay' : '')) : '';
    }
    // initGrid method updated to accept size parameter
    initGrid(size) {
        const grid = Array(size);
        for (let i = 0; i < size; i++) {
            grid[i] = Array(size).fill(false);
        }
        return grid;
    }
    // flip method remains unchanged
    flip(evt) {
        if (!this.startTime) {
            this.startTime = new Date();
            this.timerInterval = setInterval(() => {
                const timer = document.getElementById("timer");
                const elapsedSeconds = Math.round((new Date() - this.startTime) / 1000);
                timer.textContent = elapsedSeconds;
                if (elapsedSeconds % 5 == 0) {
                    this.score += Math.floor(Math.random() * 5) + 1;
                    const points = document.getElementById("score");
                    points.textContent = this.score;
                }
            }, 1000);
        }
        const locationJSON = evt.target.dataset.location;
        if (!locationJSON) {
            return;
        }
        const location = JSON.parse(locationJSON);
        const i = location.r;
        const j = location.c;
        this.grid[i][j] = !this.grid[i][j];
        this.render(i, j, false);
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (let d of dirs) {
            let ni = i + d[0];
            let nj = j + d[1];
            if (ni >= 0 && ni < this.size && nj >= 0 && nj < this.size) {
                this.grid[ni][nj] = !this.grid[ni][nj];
                this.render(ni, nj, true);
            }
        }
        this.stepCounter++;
        const counterr = document.getElementById("counter");
        counterr.textContent = this.stepCounter;
        console.log(`Lépések: ${this.stepCounter}`);
        const points = document.getElementById("score");
        this.score += Math.floor(Math.random() * 5) + 1;
        points.textContent = this.score;

        // Check for win condition

        let won = true;
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === false) {
                    won = false;
                    break;
                }
            }
            if (!won) {
                break;
            }
        }
        if (won) {
            const uname = localStorage.getItem('uname');
            const elapsedSeconds = Math.round((new Date() - this.startTime) / 1000);
            const datum = Date();
            const lvl = "medium";
            clearInterval(this.timerInterval);
            const gameResult = {
                username: uname,
                time: elapsedSeconds,
                step: this.stepCounter,
                score: this.score,
                date: datum,
                lvl: lvl
            };
            let gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];

            // Check if username already exists in gameResults array
            const existingIndex = gameResults.findIndex(result => result.username === uname);

            if (existingIndex >= 0) {
                // If username exists, replace the existing result with the new one
                gameResults[existingIndex] = gameResult;
            } else {
                // If username doesn't exist, add the new result to the array
                gameResults.push(gameResult);
            }

            gameResults.sort((a, b) => {
                if (a.score === b.score) {
                    return b.time - a.time; // sort by time in descending order
                }
                return b.score - a.score; // sort by score in descending order
            });

            localStorage.setItem('gameResults', JSON.stringify(gameResults));
            setTimeout(() => {
                alert(`Gratulálok!\n ${elapsedSeconds} másodperc alatt nyertél, ${this.stepCounter} lépéssel és ${this.score} ponttal!`);
                window.location.href = "board.html";
            }, 1);
        }
    }
}

new App(document.querySelector('#container'), 5);