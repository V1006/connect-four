// NOTE: NEED TO ENABLE/DISABLE THE CSS OF THE PROPER EXERCISE, DISABLE JS AND CSS FOR EXERCISE 1 AND ACTIVATE FOR EXERCISE 2 ETC.
let box = document.getElementById("box");

// 1

document.documentElement.addEventListener("mousemove", function (event) {
    console.log(event.clientX, event.clientY);
    box.style.left = event.clientX - 50 + "px";
    box.style.top = event.clientY - 50 + "px";
});

// 2
/* function random(max, min = 0) {
    return min + Math.round(Math.random() * (max - min));
}

box.addEventListener("mousedown", function () {
    box.style.backgroundColor = "#" + random(256 ** 3).toString(16);
});

box.addEventListener("mouseup", function () {
    box.style.backgroundColor = "#" + random(256 ** 3).toString(16);
}); */

// 3 new solution without removing the eventlistener

/* function random(max, min = 0) {
    return min + Math.round(Math.random() * (max - min));
}

let box2 = document.getElementById("box2");
let x = function (event) {
    if (event.target.id === "box2") {
        return;
    }
    box.style.backgroundColor = "#" + random(256 ** 3).toString(16);
};

box.addEventListener("mousedown", x);

box2.addEventListener("mousedown", function () {
    box2.style.backgroundColor = "#" + random(256 ** 3).toString(16);
});
 */
// 3 solution with removing event listener

//note for me : if event.target.id === box event.stopPropagation()  possible solution  event.target.removeEventlistener
/* function random(max, min = 0) {
    return min + Math.round(Math.random() * (max - min));
}

let box2 = document.getElementById("box2");
let x = function () {
    box.style.backgroundColor = "#" + random(256 ** 3).toString(16);
};

box.addEventListener("mousedown", x);

box2.addEventListener("mousedown", function () {
    box.removeEventListener("mousedown", x);
    box2.style.backgroundColor = "#" + random(256 ** 3).toString(16);

    box2.addEventListener("mouseup", function () {
        box.addEventListener("mousedown", x);
    });
}); */
