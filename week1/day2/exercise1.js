// 1.a

function isStringOrNumber(val) {
    if (typeof val == "string" || typeof val == "number") {
        console.log(typeof val);
    } else console.log("neither");
}

isStringOrNumber({});

// 1.b

function isArrayOrObject(val) {
    if (Array.isArray(val)) {
        console.log("array");
    } else if (typeof val == "object") {
        console.log(typeof val);
    } else console.log("neither");
}

isArrayOrObject([{}]);

// 1.c

function isNullOrUndefined(val) {
    if (val === null) {
        console.log(null);
    } else if (val === undefined) {
        console.log(undefined);
    } else console.log("neither");
}
let x;
isNullOrUndefined(x);

// 1.d

/*function logType(val) {
    if(typeof val == )
} */

// 2

const a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA",
};

const b = {};

for (let p in a) {
    b[a[p]] = p;
}
console.log(b);

// 3

for (let i = 10; i >= 1; i--) {
    console.log(i);
}
