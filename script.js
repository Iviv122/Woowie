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

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Funs {
  static triangle(a, b, c) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(a.x, a.y);
    ctx.stroke();
  }
  static rectangle(a, b) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(a.x, b.y);
    ctx.stroke();
  }
  static line(a, b) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
}

const lt = new Vector2(0, 0);
const rt = new Vector2(vw, 0);
const lb = new Vector2(0, vh);
const rb = new Vector2(vw, vh);
const center = new Vector2(vw / 2, vh / 2);

const mPos = new Vector2(vw / 2, vh / 2);
const prevMPos = new Vector2(vw / 2, vh / 2);

function mouseDelta() {
  return new Vector2(mPos.x - prevMPos.x, mPos.y - prevMPos.y);
}
class DrawFunction {
  static triangles() {
    ctx.fillStyle = "rgba(256,256,256,0.3)";
    ctx.fillRect(0, 0, vw, vh);
    Funs.triangle(lt, rt, mPos);
    Funs.triangle(rt, rb, mPos);
    Funs.triangle(lb, lb, mPos);
    Funs.triangle(lb, lt, mPos);
  }
  static rectangles() {
    ctx.fillStyle = "rgba(256,256,256,0.3)";
    ctx.fillRect(0, 0, vw, vh);
    Funs.rectangle(lt, mPos);
    Funs.rectangle(rt, mPos);
    Funs.rectangle(lb, mPos);
    Funs.rectangle(lb, mPos);
  }
  static line() {
    ctx.fillStyle = "rgba(256,256,256,0.1)";
    ctx.fillRect(0, 0, vw, vh);
    Funs.line(prevMPos, mPos);
  }
  static multiLines() {
    ctx.fillStyle = "rgba(256,256,256,0.1)";
    ctx.fillRect(0, 0, vw, vh);
    ctx.beginPath();
    ctx.moveTo(prevMPos.x, prevMPos.y);
    ctx.lineTo(mPos.x, mPos.y);
    ctx.stroke();
  }
}

const foreground = [
  DrawFunction.triangles,
  DrawFunction.rectangles,
  DrawFunction.line,
];
var currentForeground = 0;

function SwapForeground() {
  currentForeground = currentForeground + 1;
  currentForeground %= foreground.length;
}

function draw() {
  foreground[currentForeground]();
  requestAnimationFrame(draw);
}
function GetMousePos(e) {
  prevMPos.x = mPos.x;
  prevMPos.y = mPos.y;
  mPos.x = e.clientX;
  mPos.y = e.clientY;
}

draw();

document.addEventListener("mousemove", GetMousePos);
document.addEventListener("mousedown", SwapForeground);
