//global variables
let kitties;
let kittyContainer;
let currentIndex = 0;

// init function
//self invoking function
(function init() {
    kitties = document.querySelectorAll("#kitties img");
    kittyContainer = document.querySelector("#kitties");
    kittyContainer.addEventListener("transitionend", (event) => {
        //remove exit
        if (event.target.classList.contains("exit")) {
            event.target.classList.remove("exit");
        }
    });
    setTimeout(moveCats, 1000);
})();

// other functions
function moveCats() {
    let next = currentIndex === kitties.length - 1 ? 0 : currentIndex + 1;
    // move the current image to the left
    kitties[currentIndex].classList.remove("on-screen");
    kitties[currentIndex].classList.add("exit");
    // next img enters
    kitties[next].classList.add("on-screen");

    currentIndex++;
    if (currentIndex === kitties.length) {
        currentIndex = 0;
    }
    setTimeout(moveCats, 4000);
}
