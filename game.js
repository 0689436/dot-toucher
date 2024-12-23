let score = 0;
let clicks = 0;
let lastClickTime = 0;
let cps = 0;
let playTime = 0;
let timerInterval;

// Increment score and track clicks
function incrementScore() {
  score++;
  clicks++;
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = `Score: ${score}`;
}

// Update CPS counter every second
setInterval(() => {
  cps = clicks;
  clicks = 0;
  const cpsDisplay = document.getElementById('cps');
  cpsDisplay.textContent = `CPS: ${cps}`;
}, 1000);

// Toggle the hamburger menu and theme options visibility
function toggleMenu() {
  const menu = document.querySelector('.menu');
  const settingsBox = document.getElementById('settings-box');
  menu.classList.toggle('open');
  settingsBox.classList.toggle('open');
}

// Change theme based on selected option
function changeTheme(theme) {
  const body = document.body;
  body.setAttribute('data-theme', theme);
}

// Clock function
function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  clockElement.textContent = now.toLocaleTimeString();
}

// Play timer function with formatted hours, minutes, seconds
function updatePlayTime() {
  playTime++;
  const playTimeDisplay = document.getElementById('play-time');

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(playTime / 3600);
  const minutes = Math.floor((playTime % 3600) / 60);
  const seconds = playTime % 60;

  // Format the time string
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Update the display with formatted time
  playTimeDisplay.textContent = `Play Time: ${timeString}`;
}

// Update clock and play time every second
setInterval(updateClock, 1000);
setInterval(updatePlayTime, 1000);
updateClock(); // Initial call to show the time immediately
