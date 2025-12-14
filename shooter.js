const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Player
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 12,
  speed: 3
};

// Mouse
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// Bullets, targets, particles
let bullets = [];
let targets = [];
let particles = [];
let keys = {};
let score = 0;

// Controls
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Shoot bullets toward mouse
document.addEventListener("keydown", e => {
  if (e.key === " ") {
    const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    bullets.push({
      x: player.x,
      y: player.y,
      r: 4,
      dx: Math.cos(angle) * 5,
      dy: Math.sin(angle) * 5
    });
  }
});

// Create moving targets
function spawnTarget() {
  target
