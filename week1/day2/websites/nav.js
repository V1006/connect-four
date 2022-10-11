// Getting the elements
const hamburger = document.getElementById("menu");
const nav = document.getElementById("nav");
const xButton = document.getElementById("xButton");
const shroud = document.querySelector(".shroud");

// opening the nav bar on click
hamburger.addEventListener("click", function () {
    console.log();
    nav.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    shroud.classList.add("active");
});

// closing the nav bar on clicking the x or the shroud

const closingNav = function () {
    nav.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
    shroud.classList.remove("active");
};
xButton.addEventListener("click", closingNav);
shroud.addEventListener("click", closingNav);
