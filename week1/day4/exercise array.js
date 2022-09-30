// 1

function reverse(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.unshift(arr[i]);
    }
    return newArr;
}

const originalArray = [1, 2, 3];
const reversedArray = reverse(originalArray);

console.log(originalArray); // [1, 2, 3]
console.log(reversedArray); // [3, 2, 1]

// 2

function getLessThanZero(arr) {
    return arr.filter(function (x) {
        return x < 0;
    });
}

console.log(getLessThanZero([1, 2, -1, -90, 10])); //[-1, -90]
console.log(getLessThanZero([1, 2])); //[]

// 3 bonus

function each(obOrArr, func) {
    if (obOrArr == Array.isArray) {
        for (let i = 0; i < obOrArr.length; i++) {
            func(obOrArr[i], i);
        }
    } else {
        for (let b in obOrArr) {
            func(obOrArr[b], b);
        }
    }
}

each(
    {
        a: 1,
        b: 2,
    },
    function (val, name) {
        console.log("The value of " + name + " is " + val);
    }
); // logs 'the value of a is 1' and 'the value of b is 2'

each(["a", "b"], function (val, idx) {
    console.log("The value of item " + idx + " is " + val);
}); // logs 'the value of item 0 is a' and 'the value of item 1 is b'
