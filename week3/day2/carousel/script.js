//global variables
let images;
let carousel;
let currentIndex = 0;
let circleContainer;
let circles;
let delayTime = 2500; //delay between transitions
let isTransitioning = false;
let timerID;

// init function
//self invoking function
(function init() {
    // referencing DOM elements
    images = document.querySelectorAll("#carousel img");
    carousel = document.querySelector("#carousel");
    circles = document.querySelectorAll(".circleContainer li");
    circleContainer = document.querySelector(".circleContainer");

    // attach event listeners
    carousel.addEventListener("transitionend", onTransitionEnd);
    circleContainer.addEventListener("click", onDotClicked);

    // start timer
    timerID = setTimeout(animate, delayTime);
})();

// other functions
function animate(nextIndex = -1) {
    // indication that the transition is active
    isTransitioning = true;

    // remove active class of circles
    circles[currentIndex].classList.remove("active");

    // if nextIndex is not provided - calculate the nextIndex here
    if (nextIndex === -1) {
        nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }

    // move the current image to the left
    images[currentIndex].classList.remove("on-screen");
    images[currentIndex].classList.add("exit");
    // next img enters
    images[nextIndex].classList.add("on-screen");

    //update currentIndex
    if (nextIndex !== -1) {
        currentIndex = nextIndex;
    } else if (currentIndex === images.length) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }

    //assign the active class of circles
    circles[nextIndex].classList.add("active");
}

function onTransitionEnd(event) {
    //indication that the transition ended
    isTransitioning = false;

    //remove exit class
    if (event.target.classList.contains("exit") === false) {
        return;
    }
    event.target.classList.remove("exit");

    //start timeout again
    timerID = setTimeout(animate, delayTime);
}

function onDotClicked(event) {
    // extract the clicked index/ id
    const dotIndex = parseInt(event.target.id);

    // stop the executing the function if transition is active or current circle was clicked
    if (isTransitioning === true || dotIndex === currentIndex) {
        return;
    }

    // remove active class of circles
    circles[currentIndex].classList.remove("active");

    //assign the active class of circles
    circles[dotIndex].classList.add("active");

    // stop timer
    clearTimeout(timerID);
    // call animate immediately
    animate(dotIndex);
}
