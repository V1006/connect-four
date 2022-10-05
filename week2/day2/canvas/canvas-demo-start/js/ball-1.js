const canvas = document.querySelector("#stage"); // reference the canvas
const ctx = canvas.getContext("2d"); // context 2d

const r = 40; //ball radius
//ball position
let x = canvas.width / 2;
let y = canvas.height / 2;
//switch directions when the ball hits the borders

//ball speed
let speed = 5;
let dirX = 1;
let dirY = 1;

//starting the "game loop" after initialization
window.requestAnimationFrame(draw);

// setInterval(draw, 16);

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// main draw method of the canvas
function draw() {
    //clear everything on the canvas
    //to draw a fresh drawing 60 times per second
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //redraw the ball 60 times a second
    drawBall();

    //updating ball position
    x += speed * dirX;
    y += speed * dirY;
    //flipping direction when border is hit
    if (x >= canvas.width - r || x <= r) {
        dirX *= -1;
    }
    if (y >= canvas.height - r || y <= r) {
        dirY *= -1;
    }

    //calling the function on the next frame (60 fps)
    window.requestAnimationFrame(draw);
}
