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
  add(other) {
    return new Vector2(this.x + other.x, this.y + other.y);
  }
  sub(other) {
    return new Vector2(this.x - other.x, this.y - other.y);
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
  static DuoLines() {
    ctx.fillStyle = "rgba(256,256,256,0.1)";
    ctx.fillRect(0, 0, vw, vh);

    const v1 = new Vector2(
      Math.abs(vw - prevMPos.x),
      Math.abs(vh - prevMPos.y),
    );
    const v2 = new Vector2(Math.abs(vw - mPos.x), Math.abs(vh - mPos.y));
    Funs.line(prevMPos, mPos);
    Funs.line(v1, v2);
  }
  static QuadLines() {
    ctx.fillStyle = "rgba(256,256,256,0.1)";
    ctx.fillRect(0, 0, vw, vh);

    const rb1 = new Vector2(
      Math.abs(vw - prevMPos.x),
      Math.abs(vh - prevMPos.y),
    );
    const rb2 = new Vector2(Math.abs(vw - mPos.x), Math.abs(vh - mPos.y));

    const rt1 = new Vector2(Math.abs(vw - prevMPos.x), prevMPos.y);
    const rt2 = new Vector2(Math.abs(vw - mPos.x), mPos.y);

    const lb1 = new Vector2(prevMPos.x, Math.abs(vh - prevMPos.y));
    const lb2 = new Vector2(mPos.x, Math.abs(vh - mPos.y));

    Funs.line(prevMPos, mPos); // left top
    Funs.line(rb1, rb2);
    Funs.line(rt1, rt2);
    Funs.line(lb1, lb2);
  }
}

const foreground = [
  DrawFunction.triangles,
  DrawFunction.rectangles,
  DrawFunction.line,
  DrawFunction.DuoLines,
  DrawFunction.QuadLines,
];
var currentForeground = -1; // init fun is -1 so reset on first swap
var currentFun = () => {console.log("Dummy fun ;p")};

function SwapForeground() {
  currentForeground = currentForeground + 1;
  currentForeground %= foreground.length;
  currentFun = foreground[currentForeground];
}

function draw() {
  currentFun();
  requestAnimationFrame(draw);
}
function GetMousePos(e) {
  prevMPos.x = mPos.x;
  prevMPos.y = mPos.y;
  mPos.x = e.clientX;
  mPos.y = e.clientY;
}

var drawLineThread;
document.addEventListener("mousemove", (e) => {
  GetMousePos(e);
  drawLineThread = requestAnimationFrame(draw);
});
document.addEventListener("mousedown", SwapForeground);
