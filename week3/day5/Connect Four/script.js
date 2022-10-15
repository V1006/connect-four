//VARIABLES
let gameEnd = false;

// GLOBAL VARIABLES
const columns = document.querySelectorAll(".column");
let currentPlayer = "Player1";
let win = document.querySelector(".win-screen");
const rematch = document.querySelector(".rematch");
const dropZone = document.querySelectorAll(".dropbox");

// EVENT LISTENERS
dropZone.forEach((column) =>
    column.addEventListener("click", handleColumnClick)
);

dropZone.forEach((zone) => zone.addEventListener("mouseover", handleMouseOver));

document.addEventListener("keydown", handleKeyDown);

// FUNCTIONS

// getting index to change position
function translatePosition(event) {
    return Array.from(event.currentTarget.parentElement.children).indexOf(
        event.currentTarget
    );
}
// mouse over event
function handleMouseOver(event) {
    for (let i = 0; i < dropZone.length; i++) {
        dropZone[i].classList.remove("Player1");
        dropZone[i].classList.remove("Player2");
    }
    event.currentTarget.classList.add(currentPlayer);
    position = translatePosition(event);
}
// using keyboard to play the game
let position = 0;
function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
        for (let i = 0; i < dropZone.length; i++) {
            dropZone[i].classList.remove("Player1");
            dropZone[i].classList.remove("Player2");
        }
        position++;
        if (position === 7) {
            position = 0;
        }
        dropZone[position].classList.add(currentPlayer);
    }
    if (event.key === "ArrowLeft") {
        for (let i = 0; i < dropZone.length; i++) {
            dropZone[i].classList.remove("Player1");
            dropZone[i].classList.remove("Player2");
        }
        position--;
        if (position === -1) {
            position = 6;
        }
        dropZone[position].classList.add(currentPlayer);
    }
    if (event.key === "Enter") {
        handleColumnClick({ currentTarget: dropZone[position] });
    }
}

// click to drop the checker in the right column
function handleColumnClick(event) {
    // guard clause
    if (gameEnd) {
        return;
    }

    const column = columns[translatePosition(event)].children;

    let i;
    for (i = column.length - 1; i >= 0; i--) {
        const slot = column[i];
        const hasPlayer1 = slot.classList.contains("Player1");
        const hasPlayer2 = slot.classList.contains("Player2");

        if (!hasPlayer1 && !hasPlayer2) {
            // if the slot if free
            // add the current player class to the slot
            slot.classList.add(currentPlayer);
            break;
        }
    }

    // check if column is full
    if (i < 0) {
        return;
    }
    for (let i = 0; i < dropZone.length; i++) {
        dropZone[i].classList.remove("Player1");
        dropZone[i].classList.remove("Player2");
    }

    // check if player has a victory

    const slotsInRow = document.querySelectorAll(".row" + i);

    // check vertically
    if (checkForVictory(column)) {
        win.firstElementChild.innerHTML = `${currentPlayer} &#013 WINS`;
        win.classList.remove("inactive");
        gameEnd = true;
        // check horizontal
    } else if (checkForVictory(slotsInRow)) {
        win.firstElementChild.innerHTML = `${currentPlayer} &#013 WINS`;
        win.classList.remove("inactive");
        gameEnd = true;
        // check diagonally
    } else if (checkForVDiagonally(diagWins)) {
        win.firstElementChild.innerHTML = `${currentPlayer} &#013 WINS`;
        win.classList.remove("inactive");
        gameEnd = true;
    }

    // change the players turn
    switchPlayer();
    event.currentTarget.classList.add(currentPlayer);
}

// check if victory condition is met
function checkForVictory(slots) {
    let count = 0;
    for (let i = 0; i < slots.length; i++) {
        if (slots[i].classList.contains(currentPlayer)) {
            count++;
            if (count >= 4) {
                slots[i].style.backgroundColor = "green";
                slots[i - 1].style.backgroundColor = "green";
                slots[i - 2].style.backgroundColor = "green";
                slots[i - 3].style.backgroundColor = "green";
                return true;
            }
        } else {
            count = 0;
        }
    }

    // if we don't return then the function returns undefined
}

//checking the diagonally win conditions
const diagWins = [
    [18, 25, 32, 39],
    [12, 19, 26, 33, 40],
    [6, 13, 20, 27, 34, 41],
    [0, 7, 14, 21, 28, 35],
    [1, 8, 15, 22, 29],
    [2, 9, 16, 23],
    [18, 13, 8, 3],
    [24, 19, 14, 9, 4],
    [30, 25, 20, 15, 10, 5],
    [36, 31, 26, 21, 16, 11],
    [37, 32, 27, 22, 17],
    [38, 33, 28, 23],
];

let slotsToCheck = [];

const slots = Array.from(document.querySelectorAll(".slot"));

function checkForVDiagonally(diag) {
    // loop over diagWins
    for (let i = 0; i < diag.length; i++) {
        for (let j = 0; j < diag[i].length; j++) {
            slotsToCheck.push(slots[diag[i][j]]);
        }
        if (checkForVictory(slotsToCheck)) {
            return true;
        }
        slotsToCheck = [];
    }
}

// switches the active player
function switchPlayer() {
    /* console.log("switching player"); */
    if (currentPlayer === "Player1") {
        currentPlayer = "Player2";
    } else {
        currentPlayer = "Player1";
    }
}

// restart game

rematch.addEventListener("click", () => location.reload());
