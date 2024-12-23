let score = 0;
let clicks = 0;
let lastClickTime = 0;
let cps = 0;
let playTime = 0;
let timerInterval;
import { getTotalCommits } from "./revcheck.js";


function incrementScore() {
  score++;
  clicks++;
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = `Score: ${score}`;
}

setInterval(() => {
  cps = clicks;
  clicks = 0;
  const cpsDisplay = document.getElementById('cps');
  cpsDisplay.textContent = `CPS: ${cps}`;
}, 1000);

function toggleMenu() {
  const menu = document.querySelector('.menu');
  const settingsBox = document.getElementById('settings-box');
  menu.classList.toggle('open');
  settingsBox.classList.toggle('open');
}

function changeTheme(theme) {
  const body = document.body;
  body.setAttribute('data-theme', theme);
}

function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  clockElement.textContent = now.toLocaleTimeString();
}


(async () => {
  const totalCommits = await getTotalCommits();
  if (totalCommits !== null) {
        function revision() {
      var revcount = "1";
      document.getElementById("pubrevnum").innerHTML = number;
    }

    // Use totalCommits in your code
  } else {
    console.error("Failed to fetch the total commits.");
  }
})();



function updatePlayTime() {
  playTime++;
  const playTimeDisplay = document.getElementById('play-time');
  const hours = Math.floor(playTime / 3600);
  const minutes = Math.floor((playTime % 3600) / 60);
  const seconds = playTime % 60;
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  playTimeDisplay.textContent = `Play Time: ${timeString}`;
}

setInterval(updateClock, 1000);
setInterval(updatePlayTime, 1000);
updateClock();
