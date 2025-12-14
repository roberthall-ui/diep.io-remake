// Clicker Game
let clickerScore = 0;

function startClicker() {
  const scoreText = document.getElementById("score");
  const button = document.getElementById("clickBtn");

  // Remove previous event listener if exists
  button.replaceWith(button.cloneNode(true));
  const newButton = document.getElementById("clickBtn");

  newButton.addEventListener("click", () => {
    clickerScore += 1;
    scoreText.textContent = "Score: " + clickerScore;
  });

  // Update score display immediately
  scoreText.textContent = "Score: " + clickerScore;
}
