// variables
let line = document.querySelector(".line");
let before = document.querySelector(".before");
let container = document.querySelector(".container");

// event listeners
line.addEventListener("mousedown", drag);
document.documentElement.addEventListener("mouseup", removeEvent);

// functions
function drag() {
    container.addEventListener("mousemove", changeLinePosition);
}

function removeEvent() {
    container.removeEventListener("mousemove", changeLinePosition);
}

function changeLinePosition(event) {
    let x = event.clientX - container.offsetLeft + "px";
    if (event.clientX - container.offsetLeft >= 990) {
        line.style.left = 990 + "px";
    } else {
        line.style.left = event.clientX - container.offsetLeft + "px";
    }

    before.style.clipPath =
        "polygon(" + x + " 0, 100% 0, 100% 100%, " + x + " 100%)";
}
