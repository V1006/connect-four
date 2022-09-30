//1

function sum() {
    let num = 0;

    if (arguments.length < 2) {
        throw "Needs at least 2 arguments";
    } else {
        for (let i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] !== "number") {
                throw "Only numbers are valid";
            } else num += arguments[i];
        }
        return num;
    }
}

console.log(sum(5, 2, 3));

// 2

function waitThenRun(arg) {
    setTimeout(arg, 1500);
}

waitThenRun(function () {
    console.log("Hello!");
    waitThenRun(function () {
        console.log("Goodbye!");
    }); // logs 'Goodbye!' 1.5 seconds later
}); // logs 'Hello!' 1.5 seconds later

//3

// math solution

function expectNumMath(num) {
    if (num <= 0 || typeof num !== "number") {
        return "ERROR";
    } else if (num >= 1000000) return num;
    else return num * Math.pow(10, Math.ceil(Math.log10(1000000 / num)));
}

console.log(expectNumMath(500));

// functional solution

function expectNum(num) {
    if (num <= 0 || typeof num !== "number") {
        return "ERROR";
    } else if (num >= 1000000) return num;
    else return expectNum(num * 10);
}

console.log(expectNum(500));

// 4

function getTotaler() {
    let start = 0;
    return function (num) {
        return (start += num);
    };
}

var totaler = getTotaler();
console.log(totaler(1)); //1
console.log(totaler(2)); //3
console.log(totaler(5)); //8
