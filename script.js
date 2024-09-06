const board = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
const modeSwitchButton = document.getElementById('mode-switch');

let gameActive = true;
let currentPlayer = "X";
let gameMode = "human"; // "human" or "solo"
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerText = "Game ended in a draw!";
        gameActive = false;
        return;
    }

    handlePlayerChange();
    if (gameMode === "solo" && currentPlayer === "O") {
        robotMove();
    }
}

function robotMove() {
    let availableCells = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === "") {
            availableCells.push(i);
        }
    }

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    setTimeout(() => {
        board[randomIndex].click();
    }, 500);
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    checkWin();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = "";
    board.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o');
    });
}

function switchMode() {
    if (gameMode === "human") {
        gameMode = "solo";
        modeSwitchButton.innerText = "Switch to Human Mode";
    } else {
        gameMode = "human";
        modeSwitchButton.innerText = "Switch to Solo Mode";
    }
    handleRestartGame();
}

board.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
modeSwitchButton.addEventListener('click', switchMode);
