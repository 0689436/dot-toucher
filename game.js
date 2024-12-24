let score = 0;
let clicks = 0;
let playTime = 0;
let cps = 0;
let pubrevnum = 0;

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

const cpsDisplay = document.querySelector('.cps');


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

// Fetch and display total commits from GitHub API
function fetchRevisions() {
  const owner = "0689436";
  const repo = "dot-toucher";
  const branch = "main"; // Replace with your branch name
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=1`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`GitHub API returned an error: ${response.status}`);
      }

      // Get the 'Link' header to determine pagination
      const linkHeader = response.headers.get("Link");
      let totalCommits;

      if (linkHeader) {
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (match) {
          totalCommits = parseInt(match[1], 10);
        }
      }

      // If not paginated (only 1 page), get the number of results
      return response.json().then(data => totalCommits || data.length);
    })
    .then(totalCommits => {
      pubrevnum = totalCommits;
      console.log("Total Commits:", pubrevnum);

      // Update the displayed revision number
      const pubRevNumDisplay = document.getElementById("pubrevnum");
      if (pubRevNumDisplay) {
        pubRevNumDisplay.textContent = pubrevnum; // Set only the revision number
      }
    })
    .catch(error => {
      console.error("Error fetching commits:", error);
    });
}

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

// Fetch revisions initially and then periodically
fetchRevisions();
setInterval(fetchRevisions, 60000); // Update every minute

// Initial updates
updateClock();
