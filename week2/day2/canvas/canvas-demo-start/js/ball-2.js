// random num
function randomNum(max, min = 0) {
    return min + Math.round(Math.random() * (max - min));
}

const canvas = document.querySelector("#stage"); // reference the canvas
const ctx = canvas.getContext("2d"); // context 2d

// creating the ball object

function Ball() {
    this.r = randomNum(50, 5);
    this.x = randomNum(500 - this.r, this.r);
    this.y = randomNum(600 - this.r, this.r);
    this.speed = randomNum(10, 1);
    this.color = "#" + randomNum(256 ** 3).toString(16);
    this.dirX = Math.random();
    this.dirY = Math.random();
}
const balls = [];
function createBallArray(howManyBalls) {
    for (let i = 0; i < howManyBalls; i++) {
        balls.push(new Ball());
    }
}
// input how many balls you want to see on the display
createBallArray(randomNum(10, 2));

//starting the "game loop" after initialization
window.requestAnimationFrame(drawMultiBalls);

function drawBall(arg) {
    ctx.beginPath();
    ctx.arc(arg.x, arg.y, arg.r, 0, Math.PI * 2);
    ctx.fillStyle = arg.color;
    ctx.fill();
    ctx.closePath();
}

function drawMultiBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        drawBall(balls[i]);
        //updating ball position
        balls[i].x += balls[i].speed * balls[i].dirX;
        balls[i].y += balls[i].speed * balls[i].dirY;
        //flipping direction when border is hit
        if (
            balls[i].x >= canvas.width - balls[i].r ||
            balls[i].x <= balls[i].r
        ) {
            balls[i].dirX *= -1;
        }
        if (
            balls[i].y >= canvas.height - balls[i].r ||
            balls[i].y <= balls[i].r
        ) {
            balls[i].dirY *= -1;
        }
    }

    //calling the function on the next frame (60 fps)
    window.requestAnimationFrame(drawMultiBalls);
}
