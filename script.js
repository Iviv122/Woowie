document.body.style = "margin: 0; padding: 0;  overflow: hidden;";

let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0,
);
let vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);

const canvas = document.createElement("canvas");

canvas.width = vw;
canvas.height = vh;

canvas.style = "border: 1px solid black";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function triangle(a, b, c) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(a.x, a.y);
  ctx.stroke();
}

const lt = new Vector2(0, 0);
const rt = new Vector2(vw, 0);
const lb = new Vector2(0, vh);
const rb = new Vector2(vw, vh);
const center = new Vector2(vw / 2, vh / 2);

var mPos = new Vector2(0, 0);
function DrawScreen(e) {
  mPos.x = e.clientX;
  mPos.y = e.clientY;
}
document.addEventListener("mousemove", DrawScreen);

function draw() {
  ctx.fillStyle = "rgba(256,256,256,0.1)";
  ctx.fillRect(0, 0, vw, vh);
  triangle(lt, rt, mPos);
  triangle(rt, rb, mPos);
  triangle(lb, lb, mPos);
  triangle(lb, lt, mPos);
  requestAnimationFrame(draw);
}
draw();
