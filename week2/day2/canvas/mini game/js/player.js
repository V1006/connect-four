const player = document.querySelector("#stage"); // reference the canvas
const cty = player.getContext("2d");

cty.strokeStyle = "#54f542";
cty.lineWidth = 10;

/* const halfWidth = player.width / 2; */

function drawPlayer() {
    cty.beginPath();
    cty.moveTo(200, 500);
    cty.lineTo(300, 600);
    cty.stroke();
}

drawPlayer();
