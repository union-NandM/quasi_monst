const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const container = document.getElementById("container");

let cw, ch;

const init = () => {
  canvas.width = container.clientWidth;
  canvas.height = window.innerHeight - 100;
  cw = canvas.width;
  ch = canvas.height;
  container.style.height = `${window.innerHeight}px`;
};
init();

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
    window.addEventListener("mousedown", (ev) => {
      if (this.vx === 0 && this.vy === 0) {
        this.tsx = ev.clientX;
        this.tsy = ev.clientY;
      }
    });
    window.addEventListener("mouseup", (ev) => {
      if (
        this.vx === 0 &&
        this.vy === 0 &&
        this.tsx !== null &&
        this.tsy !== null
      ) {
        const tex = ev.clientX;
        const tey = ev.clientY;
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

window.addEventListener("resize", init);
