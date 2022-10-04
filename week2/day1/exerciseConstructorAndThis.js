//1

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

let area = function () {
    return this.width * this.height;
};
Rectangle.prototype.getArea = area;

const rect = new Rectangle(4, 5);
console.log(rect.getArea()); //20

/* Alternative
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    this.getArea = function () {
        return this.width * this.height;
    };
}

const rect = new Rectangle(4, 5);
rect.getArea(); //20 */

function Square(a) {
    this.height = a;
    this.width = a;
}

Square.prototype.getArea = area;

const square = new Square(4);
console.log(square.getArea()); //16

// 2

function invertCase(string) {
    let word = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] === string[i].toLowerCase()) {
            word += string[i].toUpperCase();
        } else {
            word += string[i].toLowerCase();
        }
    }
    return word;
}

console.log(invertCase("Hallo"));

// 3

/* first attempt 
function Countdown(num) {
    this.num = num;
}

let cdown = function (par) {
    if (par === undefined) {
        par = this.num;
    }
    if (par == -1) {
        return;
    }
    setTimeout(function () {
        console.log(par);
        par -= 1;
        return cdown(par);
    }, 1000);
};

Countdown.prototype.start = cdown;

let x = new Countdown(10);

x.start(); */

// Proper way

function Countdown(num) {
    this.num = num;
    this.start = function () {
        if (this.num == -1) {
            return;
        }
        setTimeout(() => {
            console.log(this.num);
            this.num -= 1;
            return this.start();
        }, 1000);
    };
}

let x = new Countdown(10);

x.start();

/* loop version 

function Countdown(num) {
    this.num = num;
}

let cdown = function () {
    for (let i = this.num, q = this.num; i > -1; i--) {
        setTimeout(function () {
            console.log(q - i);
        }, i * 1000);
    }
};

Countdown.prototype.start = cdown;

let x = new Countdown(10);

x.start(); */
