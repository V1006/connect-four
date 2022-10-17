// Exercise 3

function askForNumber() {
    var num = prompt("Please enter a number between 1 and 10");
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("Bad number");
}

const numberNames = [
    "eins",
    "zwei",
    "drei",
    "vier",
    "fünf",
    "sechs",
    "sieben",
    "acht",
    "neun",
    "zehn",
];

function translateNumberToGerman() {
    try {
        alert(numberNames[askForNumber() - 1]);
    } catch (error) {
        console.log(error);
    }
    translateNumberToGerman();
}

translateNumberToGerman();
