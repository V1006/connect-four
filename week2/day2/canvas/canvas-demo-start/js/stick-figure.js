//  Declaring global variables
//-----------------------------

const canvas = document.querySelector("#stage"); // reference the canvas
const ctx = canvas.getContext("2d"); // context 2d

ctx.strokeStyle = "#8542c0";
// ctx.lineCap = 'round';
ctx.lineWidth = 4;

/*Draw a Triangle
ctx.beginPath();
ctx.moveTo(100, 0);
ctx.lineTo(0, 200);
ctx.moveTo(100, 0);
ctx.lineTo(200, 200);
ctx.lineTo(0, 200);
ctx.stroke(); */

//Draw a Circle
//ctx.beginPath();
//ctx.arc(250, 150, 50, 0, 2 * Math.PI);
//ctx.stroke();

//Draw a Stick Figure

//Head
ctx.beginPath();
ctx.arc(250, 150, 50, 0, 2 * Math.PI);
ctx.stroke();

// body
ctx.beginPath();
ctx.moveTo(250, 200);
ctx.lineTo(250, 350);
ctx.stroke();

// arm left
ctx.beginPath();
ctx.moveTo(250, 230);
ctx.lineTo(130, 180);
ctx.stroke();

// arm right
ctx.beginPath();
ctx.moveTo(250, 230);
ctx.lineTo(370, 180);
ctx.stroke();

// leg left
ctx.beginPath();
ctx.moveTo(250, 350);
ctx.lineTo(130, 450);
ctx.stroke();

// leg right
ctx.beginPath();
ctx.moveTo(250, 350);
ctx.lineTo(370, 450);
ctx.stroke();
