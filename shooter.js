const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Player
const player = {
  x: 300,
  y: 200,
  size: 12,
  speed: 3
};

let bullets = [];
let targets = [];
let keys = {};
let score = 0;

// Controls
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Shoot
document.addEventListener("keydown", e => {
  if (e.key === " ") {
    bullets.push({ x: player.x, y: player.y, r: 4 });
  }
});

// Create targets
function spawnTarget() {
  targets.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 10
  });
}
setInterval(spawnTarget, 1000);

// Game loop
function update() {
  // Movement
  if (keys["w"] || keys["ArrowUp"]) player.y -= player.speed;
  if (keys["s"] || keys["ArrowDown"]) player.y += player.speed;
  if (keys["a"] || keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["d"] || keys["ArrowRight"]) player.x += player.speed;

  // Bullets
  bullets.forEach(b => b.y -= 5);

  // Collision
  bullets.forEach((b, bi) => {
    targets.forEach((t, ti) => {
      const dx = b.x - t.x;
      const dy = b.y - t.y;
      if (Math.sqrt(dx*dx + dy*dy) < t.size) {
        bullets.splice(bi, 1);
        targets.splice(ti, 1);
        score++;
      }
    });
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();

  // Bullets
  ctx.fillStyle = "yellow";
  bullets.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Targets
  ctx.fillStyle = "red";
  targets.forEach(t => {
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // Score
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 20);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
