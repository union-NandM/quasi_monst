const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;
const cw = canvas.width;
const ch = canvas.height;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, cw, ch);

class Ball {
  constructor() {
    this.x = cw / 2;
    this.y = ch - 50;
    this.vx = 0;
    this.vy = 0;
    this.size = 20;
    this.tsx = null;
    this.tsy = null;

    window.addEventListener("touchstart", (ev) => {
      if (this.vx === 0 && this.vy === 0) {
        this.tsx = ev.changedTouches[0].clientX;
        this.tsy = ev.changedTouches[0].clientY;
      }
    });
    window.addEventListener("touchend", (ev) => {
      if (
        this.vx === 0 &&
        this.vy === 0 &&
        this.tsx !== null &&
        this.tsy !== null
      ) {
        const tex = ev.changedTouches[0].clientX;
        const tey = ev.changedTouches[0].clientY;
        this.vx = (this.tsx - tex) / 5;
        this.vy = (this.tsy - tey) / 5;
        this.tsx = null;
        this.tsy = null;
      }
    });
  }

  next() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x > cw - this.size) {
      this.x = (cw - this.size) * 2 - this.x;
      this.vx *= -1;
    }
    if (this.x < this.size) {
      this.x = this.size * 2 - this.x;
      this.vx *= -1;
    }
    if (this.y > ch - this.size) {
      this.y = (ch - this.size) * 2 - this.y;
      this.vy *= -1;
    }
    if (this.y < this.size) {
      this.y = this.size * 2 - this.y;
      this.vy *= -1;
    }

    this.vx *= 0.99;
    this.vy *= 0.99;

    if (this.vx ** 2 + this.vy ** 2 < 1) {
      this.vx *= 0.99;
      this.vy *= 0.99;
    }

    if (this.vx ** 2 + this.vy ** 2 < 0.001) {
      this.vx = 0;
      this.vy = 0;
    }
  }

  draw() {
    ctx.fillStyle = "#333333";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

const ball = new Ball();

setInterval(() => {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cw, ch);
  ball.draw();
  ball.next();
}, 20);
