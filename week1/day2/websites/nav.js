// Getting the elements
const hamburger = document.getElementById("menu");
const nav = document.getElementById("nav");
const xButton = document.getElementById("xButton");

// opening the nav bar on click as well as adding the function to close the nav bar on screen click
hamburger.addEventListener("click", function () {
    nav.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

    let clickFunk = function () {
        nav.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
        document.querySelector("main").removeEventListener("click", clickFunk);
    };

    document.querySelector("main").addEventListener("click", clickFunk);
});

// closing the nav bar on clicking the x
xButton.addEventListener("click", function () {
    nav.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
});
