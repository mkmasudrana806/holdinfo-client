// axios config settings
const axiosIns = axios.create({
  baseURL: "http://127.0.0.1:5000",
  withCredentials: true,
});

// select the toogle button and body to apply the dark / day theme
const toggleBox = document.querySelector(".toggle-btn");
const bodyEle = document.querySelector("#body");
const darkStyleSheet = document.getElementById("dark-style");

function nightMode() {
  darkStyleSheet.setAttribute("href", "dark-style.css");
  bodyEle.classList.add("dark-mode");
  localStorage.setItem("mode", "night");
  toggleBox.classList.add("active");
}

function dayMode() {
  darkStyleSheet.removeAttribute("href");
  bodyEle.classList.remove("dark-mode");
  toggleBox.classList.remove("active");
  localStorage.setItem("mode", "day");
}

// To retrieve the mode preference when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const mode = localStorage.getItem("mode");
  // after loading page, set mode based on mode preference saved in localStorage
  if (mode === "night") {
    nightMode();
    // when the mode is null then the light mode by default
  } else if (mode === null) {
    bodyEle.classList.add("dark-mode");
  } else {
    dayMode();
  }
});

// Function to toggle between day and night mode
function toggleMode() {
  if (bodyEle.classList.contains("dark-mode")) {
    // Switch to day mode
    dayMode();
  } else {
    // Switch to night mode
    nightMode();
  }
}

toggleBox.addEventListener("click", () => {
  toggleMode();
});

async function fetchTickerData() {}

// Get the timer element
const timerElement = document.querySelector(".timer");
// Set the initial countdown value
let countdown = 60;
function updateTimer() {
  timerElement.textContent = countdown;
  if (countdown === 0) {
    fetchTickerData();
    countdown = 60;
    setTimeout(updateTimer, 1000);
  } else {
    countdown--;
    setTimeout(updateTimer, 1000);
  }
}
// Start the timer
updateTimer();
