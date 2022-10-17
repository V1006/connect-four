// interesting stuff :
/* 
guard clause L144
rotate the board animation L94
calc inside css L 121
getBoundingClientRect() L 236
*/

//VARIABLEs
let gameEnd = false;
let gameMode;
let url = window.location.href;

if (url.includes("?") && url.includes("mode=")) {
    gameMode = url.split("?")[1].split("=")[1];
} else gameMode = "classic";

// GLOBAL VARIABLES
const columns = document.querySelectorAll(".column");
let currentPlayer = "Player1";
let win = document.querySelector(".win-screen");
const rematch = document.querySelector(".rematch");
const dropZone = document.querySelectorAll(".dropbox");
const hardModeButton = document.querySelector(".hardModeButton");
const classicModeButton = document.querySelector(".classicModeButton");
const board = document.querySelector("#board");
const holes = document.querySelectorAll(".hole");
const names = document.querySelector(".names");
const cNames = document.querySelectorAll(".columnName");
const UL = document.querySelector("ul");
const lis = document.querySelectorAll("li");
const shroud1 = document.querySelector(".shroud1");
const shroud2 = document.querySelector(".shroud2");
const hardModeExit = document.querySelector(".xOut");
const slots = Array.from(document.querySelectorAll(".slot"));
const hardBG = document.querySelector("#HardImg");
// sound test code (NOT MINE)

//if you have another AudioContext class use that one, as some browsers have a limit
var audioCtx = new (window.AudioContext ||
    window.webkitAudioContext ||
    window.audioContext)();

// sound test code (NOT MINE)

if (gameMode === "HardMode") handleHModeClick();

// CLASSIC MODE
//
//
//
//
//
//
//
//
//
//
//
//

// EVENT LISTENERS
classicModeButton.addEventListener("click", handleCModeClick);
hardModeButton.addEventListener("click", handleHModeClick);

dropZone.forEach((column) =>
    column.addEventListener("click", handleColumnClick)
);

dropZone.forEach((zone) => zone.addEventListener("mouseover", handleMouseOver));

document.addEventListener("keydown", handleKeyDown);

// FUNCTIONS

// resets board function
function reset() {
    for (let i = 0; i < slots.length; i++) {
        if (
            slots[i].classList.contains("Player1") ||
            slots[i].classList.contains("Player2")
        ) {
            slots[i].classList.remove("Player1");
            slots[i].classList.remove("Player2");
        }
    }
}

// hard mode button
function handleHModeClick() {
    reset();
    gameMode = "HardMode";
    cleanDropZone();
    // image swap
    hardBG.style.opacity = "1";
    board.style.transition = "all 1.5s ease";
    board.style.transform = "rotateY(180deg)";
    names.style.transition = "all 1.5s ease";
    names.style.transform = "rotateY(180deg)";
    cNames.forEach((name) => {
        name.style.transform = "rotateY(180deg)";
        name.style.transition = "all 1.5s ease";
    });

    holes.forEach((hole) => hole.classList.add("hard"));
    classicModeButton.classList.remove("modeActive");
    hardModeButton.classList.add("modeActive");
    UL.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
}

// classic mode button
function handleCModeClick() {
    reset();
    gameMode = "classic";
    // image swap
    hardBG.style.opacity = "0";
    board.style.transition = "all 1.5s ease";
    board.style.transform = "rotateY(0deg)";
    names.style.transition = "all 1.5s ease";
    names.style.transform = "rotateY(0deg)";
    cNames.forEach((name) => {
        name.style.transform = "rotateY(0deg)";
        name.style.transition = "all 1.5s ease";
    });
    holes.forEach((hole) => hole.classList.remove("hard"));
    hardModeButton.classList.remove("modeActive");
    classicModeButton.classList.add("modeActive");
    UL.style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)";
}

function cleanDropZone() {
    for (let i = 0; i < dropZone.length; i++) {
        dropZone[i].classList.remove("Player1");
        dropZone[i].classList.remove("Player2");
    }
}

// getting index to change position
function translatePosition(event) {
    return Array.from(event.currentTarget.parentElement.children).indexOf(
        event.currentTarget
    );
}
// mouse over event
function handleMouseOver(event) {
    if (gameMode != "classic") return;
    cleanDropZone();
    event.currentTarget.classList.add(currentPlayer);
    position = translatePosition(event);
}
// using keyboard to play the game
let position = 0;
function handleKeyDown(event) {
    if (gameMode != "classic") return;
    if (event.key === "ArrowRight") {
        cleanDropZone();
        position++;
        if (position === 7) {
            position = 0;
        }
        dropZone[position].classList.add(currentPlayer);
    }
    if (event.key === "ArrowLeft") {
        cleanDropZone();
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
let block = false;
// click to drop the checker in the right column
function handleColumnClick(event) {
    // guard clause
    if (gameEnd || block || gameMode != "classic") {
        return;
    }
    block = true;
    const column = columns[translatePosition(event)].children;

    let i;
    for (i = column.length - 1; i >= 0; i--) {
        const slot = column[i];
        const hasPlayer1 = slot.classList.contains("Player1");
        const hasPlayer2 = slot.classList.contains("Player2");

        if (!hasPlayer1 && !hasPlayer2) {
            // if the slot if free
            // add the current player class to the slot
            setTimeout(() => {
                slot.classList.add(currentPlayer);
                beep(50, 300, 0.01, "square", null);
                const slotsInRow = document.querySelectorAll(".row" + i);
                // check if player has a victory
                // check vertically
                if (checkForVictory(column)) {
                    gameEnd = true;
                    win.firstElementChild.innerHTML = `${currentPlayer} &#013 WINS`;
                    setTimeout(() => {
                        win.classList.remove("inactive");
                    }, 700);
                    // check horizontal
                } else if (checkForVictory(slotsInRow)) {
                    gameEnd = true;
                    win.firstElementChild.innerHTML = `${currentPlayer} &#013 WINS`;
                    setTimeout(() => {
                        win.classList.remove("inactive");
                    }, 700);
                    // check diagonally
                } else if (checkForVDiagonally(diagWins)) {
                    gameEnd = true;
                    win.firstElementChild.innerHTML = `${currentPlayer} &#013 WINS`;
                    setTimeout(() => {
                        win.classList.remove("inactive");
                    }, 700);
                    // check for draw
                } else if (checkForDraw(slots)) {
                    win.firstElementChild.innerHTML = `DRAW`;
                    win.classList.remove("inactive");
                    gameEnd = true;
                }
                block = false;
            }, (i + 1) * 100);
            break;
        }
    }
    // check if column is full
    if (i < 0) {
        block = false;
        return;
    }

    // drop animation
    let dZone =
        dropZone[translatePosition(event)].getBoundingClientRect().bottom;
    let cZone = column[i].getBoundingClientRect().bottom;
    let dif = cZone - dZone;

    dropZone[translatePosition(event)].animate(
        [{ transform: `translateY(${dif}px)`, offset: 1 }],
        { duration: (i + 1) * 100, easing: "linear", iterations: 1 }
    );

    // ending of click event
    let eventY = event.currentTarget;
    setTimeout(() => {
        for (let i = 0; i < dropZone.length; i++) {
            dropZone[i].classList.remove("Player1");
            dropZone[i].classList.remove("Player2");
        }

        // change the players turn
        switchPlayer();
        eventY.classList.add(currentPlayer);
    }, (i + 1) * 100);
}

// check if victory condition is met
function checkForVictory(slots) {
    let count = 0;
    for (let i = 0; i < slots.length; i++) {
        if (slots[i].classList.contains(currentPlayer)) {
            count++;
            if (count >= 4) {
                setTimeout(() => {
                    slots[i].style.backgroundColor = "lime";
                    beep(50, 500, 0.01, "square", null);
                }, 50);
                setTimeout(() => {
                    slots[i - 1].style.backgroundColor = "lime";
                    beep(50, 500, 0.01, "square", null);
                }, 200);
                setTimeout(() => {
                    slots[i - 2].style.backgroundColor = "lime";
                    beep(50, 500, 0.01, "square", null);
                }, 300);
                setTimeout(() => {
                    slots[i - 3].style.backgroundColor = "lime";
                    beep(50, 500, 0.01, "square", null);
                }, 400);
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

// check for draw

function checkForDraw(draw) {
    for (let i = 0; i < draw.length; i++) {
        if (
            !draw[i].classList.contains("Player1") &&
            !draw[i].classList.contains("Player2")
        ) {
            return false;
        }
    }
    return true;
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

// restart game or exit hard mode

rematch.addEventListener("click", () => {
    let url = window.location.href;

    if (url.indexOf("?") > -1) url = url.split("?")[0] + "?mode=" + gameMode;
    else url += "?mode=" + gameMode;

    location.replace(url);
});

function handleExitHardMode() {
    shroudUnhide();
    setTimeout(() => {
        let url = window.location.href;

        if (url.indexOf("?") > -1)
            url = url.split("?")[0] + "?mode=" + gameMode;
        else url += "?mode=" + gameMode;

        location.replace(url);
    }, 700);
}

// HARD MODE
//
//
//
//
//
//
//
//
//
//
//
//

// variables
const inputContainer = document.querySelector(".inputContainer");
const inputField = document.querySelector(".input");
const HardModePlayerName = document.querySelector("#HardModePlayerName");
let currentPlayerHard = "Player1-Hard-Mode";

// event listener

for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener("click", handleClickLis);
}
inputField.addEventListener("keydown", handleHardKeyDown);
hardModeExit.addEventListener("click", handleExitHardMode);
// functions

// getting the timer the player picked
let timer;
function handleClickLis(event) {
    timer = event.target.innerText.slice(0, 2);
    startHardMode();
}

// starts the hard mode
function startHardMode() {
    shroud1.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    shroud2.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    HardModePlayerName.innerText = `${currentPlayerHard} Turn`;
    inputContainer.classList.add("visible");
    inputField.classList.add("visible");
}

// unhides the shroud and the input field
function shroudUnhide() {
    shroud1.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0 100%)";
    shroud2.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
    inputContainer.classList.remove("visible");
    inputField.classList.remove("visible");
}
// switches the active player hard mode
function switchPlayerHard() {
    /* console.log("switching player"); */
    if (currentPlayerHard === "Player1-Hard-Mode") {
        currentPlayerHard = "Player2-Hard-Mode";
    } else {
        currentPlayerHard = "Player1-Hard-Mode";
    }
}

// handles the input the user gave
let count = 0;
function handleHardKeyDown(event) {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    if (event.key === "Enter") {
        if (!letters.includes(event.target.value.toLowerCase())) {
            alert("only A-G is allowed");
        }

        let indexOfLetters = letters.indexOf(event.target.value.toLowerCase());

        const column = columns[indexOfLetters].children;

        let i;
        for (i = column.length - 1; i >= 0; i--) {
            const slot = column[i];
            const hasPlayer1 = slot.classList.contains("Player1-Hard-Mode");
            const hasPlayer2 = slot.classList.contains("Player2-Hard-Mode");

            if (!hasPlayer1 && !hasPlayer2) {
                //the slot if free
                // add the current player class to the slot
                slot.classList.add(currentPlayerHard);
                break;
            }
        }

        // check if column is full....
        // check if first element has either class player 1 or class player 2
        // check if i is less than zero... if it is.. the col is full
        if (i < 0) {
            alert("column is full");
            return;
        }

        // check if player has a victory...

        const slotsInRow = document.querySelectorAll(".row" + i);

        // check vertically
        if (checkForVictoryHardMode(column)) {
            shroudUnhide();
            win.firstElementChild.innerHTML = `${currentPlayerHard} &#013 WINS`;
            win.classList.remove("inactive");
            gameEnd = true;
            // check horizontal
        } else if (checkForVictoryHardMode(slotsInRow)) {
            shroudUnhide();
            win.firstElementChild.innerHTML = `${currentPlayerHard} &#013 WINS`;
            win.classList.remove("inactive");
            gameEnd = true;
            // check diagonally
        } else if (checkForVDiagonallyHard(diagoWins)) {
            shroudUnhide();
            win.firstElementChild.innerHTML = `${currentPlayerHard} &#013 WINS`;
            win.classList.remove("inactive");
            gameEnd = true;
            // check for draw
        } else if (checkForDraw(slots)) {
            shroudUnhide();
            win.firstElementChild.innerHTML = `DRAW`;
            win.classList.remove("inactive");
            gameEnd = true;
        }

        // change the players turn
        switchPlayerHard();
        HardModePlayerName.innerText = `${currentPlayerHard} Turn`;
        count++;
        if (count === 4) {
            shroudUnhide();
            count = 0;
            setTimeout(() => startHardMode(), timer * 1000);
        }
        // clearing the input field after each player input
        event.target.value = "";
    }
}

// check if victory condition is met in hard mode
function checkForVictoryHardMode(slots) {
    let count = 0;
    for (let i = 0; i < slots.length; i++) {
        if (slots[i].classList.contains(currentPlayerHard)) {
            count++;
            if (count >= 4) {
                setTimeout(() => (slots[i].style.backgroundColor = "lime"), 50);
                setTimeout(
                    () => (slots[i - 1].style.backgroundColor = "lime"),
                    200
                );
                setTimeout(
                    () => (slots[i - 2].style.backgroundColor = "lime"),
                    300
                );
                setTimeout(
                    () => (slots[i - 3].style.backgroundColor = "lime"),
                    400
                );
                return true;
            }
        } else {
            count = 0;
        }
    }

    // if we don't return then the function returns undefined
}

//checking the diagonally win conditions in hard mode
const diagoWins = [
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

let slotsToCheckHard = [];

function checkForVDiagonallyHard(diag) {
    // loop over diagoWins
    for (let i = 0; i < diag.length; i++) {
        for (let j = 0; j < diag[i].length; j++) {
            slotsToCheckHard.push(slots[diag[i][j]]);
        }
        if (checkForVictoryHardMode(slotsToCheck)) {
            return true;
        }
        slotsToCheckHard = [];
    }
}

//sound test code part 2 (NOT MINE)
//All arguments are optional:

//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
function beep(duration, frequency, volume, type, callback) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (volume) {
        gainNode.gain.value = volume;
    }
    if (frequency) {
        oscillator.frequency.value = frequency;
    }
    if (type) {
        oscillator.type = type;
    }
    if (callback) {
        oscillator.onended = callback;
    }

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + (duration || 500) / 1000);
}
