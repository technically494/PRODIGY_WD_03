document.addEventListener("DOMContentLoaded", function () {
  // Button hover sound
  const hoverSound = new Audio("sounds/hover.mp3");
  const clickSound = new Audio("sounds/click.mp3");
  const bgMusic = new Audio("sounds/bg_music.mp3");
  bgMusic.loop = true;

  const buttons = document.querySelectorAll(".menu-button");
  buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
      hoverSound.play();
    });
    button.addEventListener("click", () => {
      clickSound.play();
    });
  });

  // Background music toggle
  const musicToggle = document.getElementById("music-toggle");
  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = "🔊 Music On";
      } else {
        bgMusic.pause();
        musicToggle.textContent = "🔇 Music Off";
      }
    });
  }

  // Save game mode to localStorage (optional)
  document.getElementById("btn-ai")?.addEventListener("click", () => {
    localStorage.setItem("gameMode", "AI");
  });
  document.getElementById("btn-multiplayer")?.addEventListener("click", () => {
    localStorage.setItem("gameMode", "Multiplayer");
  });
});
