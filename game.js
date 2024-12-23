let score = 0;
let clicks = 0;
let playTime = 0;
let cps = 0;

import { getTotalCommits } from "./revcheck.js";

// Increment score and update display
function incrementScore() {
  score++;
  clicks++;
  const scoreDisplay = document.getElementById('score');
  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${score}`;
  }
}

// Update clicks per second (CPS)
setInterval(() => {
  cps = clicks;
  clicks = 0;
  const cpsDisplay = document.getElementById('cps');
  if (cpsDisplay) {
    cpsDisplay.textContent = `CPS: ${cps}`;
  }
}, 1000);

// Toggle menu visibility
function toggleMenu() {
  const menu = document.querySelector('.menu');
  const settingsBox = document.getElementById('settings-box');
  if (menu && settingsBox) {
    menu.classList.toggle('open');
    settingsBox.classList.toggle('open');
  }
}

// Change theme by setting a data attribute on the body
function changeTheme(theme) {
  document.body.setAttribute('data-theme', theme);
}

// Update and display the current time
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString();
  }
}

// Fetch and display total commits
(async () => {
  try {
    const totalCommits = await getTotalCommits();
    const pubRevNum = document.getElementById("pubrevnum");
    if (pubRevNum) {
      pubRevNum.textContent = totalCommits !== null ? totalCommits : "Error fetching commits";
    }
  } catch (error) {
    console.error("Error fetching commits:", error);
    const pubRevNum = document.getElementById("pubrevnum");
    if (pubRevNum) {
      pubRevNum.textContent = "Error fetching commits";
    }
  }
})();

// Update playtime and display it
function updatePlayTime() {
  playTime++;
  const playTimeDisplay = document.getElementById('play-time');
  if (playTimeDisplay) {
    const hours = Math.floor(playTime / 3600);
    const minutes = Math.floor((playTime % 3600) / 60);
    const seconds = playTime % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    playTimeDisplay.textContent = `Play Time: ${timeString}`;
  }
}

// Initialize periodic updates
setInterval(updateClock, 1000);
setInterval(updatePlayTime, 1000);

// Initial updates
updateClock();
