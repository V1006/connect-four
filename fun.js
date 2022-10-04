// Code along task

let x = 10;

let doubleX = "";

function timesTwo(num) {
    return num * 2;
}

doubleX = timesTwo(x);

let numbers = [x, doubleX];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

numbers = {};

numbers.y = doubleX;
