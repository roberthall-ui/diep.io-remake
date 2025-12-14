// Shooter Game
function startShooter() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const player = { x: canvas.width / 2, y: canvas.height / 2, size: 12, speed: 3 };
  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  let bullets = [];
  let targets = [];
  let particles = [];
  let keys = {};
  let score = 0;

  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  document.addEventListener("keydown", e => keys[e.key] = true);
  document.addEventListener("keyup", e => keys[e.key] = false);

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

  function spawnTarget() {
    targets.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 15,
      health: 3,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    });
  }
  setInterval(spawnTarget, 1000);

  function update() {
    if (keys["w"] || keys["ArrowUp"]) player.y -= player.speed;
    if (keys["s"] || keys["ArrowDown"]) player.y += player.speed;
    if (keys["a"] || keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["d"] || keys["ArrowRight"]) player.x += player.speed;

    bullets.forEach(b => { b.x += b.dx; b.y += b.dy; });

    targets.forEach(t => {
      t.x += t.dx; t.y += t.dy;
      if (t.x < t.size || t.x > canvas.width - t.size) t.dx *= -1;
      if (t.y < t.size || t.y > canvas.height - t.size) t.dy *= -1;
    });

    bullets.forEach((b, bi) => {
      targets.forEach((t, ti) => {
        const dx = b.x - t.x, dy = b.y - t.y;
        if (Math.sqrt(dx*dx + dy*dy) < t.size) {
          bullets.splice(bi, 1);
          t.health -= 1;
          for (let i=0;i<5;i++) {
            particles.push({x:b.x, y:b.y, dx:(Math.random()-0.5)*4, dy:(Math.random()-0.5)*4, life:20});
          }
          if (t.health<=0){targets.splice(ti,1);score++;}
        }
      });
    });

    particles.forEach((p,i)=>{
      p.x+=p.dx;p.y+=p.dy;p.life--;
      if(p.life<=0) particles.splice(i,1);
    });
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    ctx.save(); ctx.translate(player.x, player.y); ctx.rotate(angle);
    ctx.fillStyle = "cyan"; ctx.beginPath(); ctx.arc(0,0,player.size,0,Math.PI*2); ctx.fill();
    ctx.restore();

    ctx.fillStyle = "yellow";
    bullets.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();});

    targets.forEach(t=>{
      ctx.fillStyle="red";ctx.beginPath();ctx.arc(t.x,t.y,t.size,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="green";ctx.fillRect(t.x-t.size, t.y-t.size-6, (t.health/3)*t.size*2, 4);
    });

    ctx.fillStyle="orange";
    particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();});

    ctx.fillStyle="white";ctx.font="16px Arial";ctx.fillText("Score: "+score,10,20);
  }

  function loop(){update();draw();requestAnimationFrame(loop);}
  loop();
}
