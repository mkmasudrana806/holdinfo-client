// axios config settings
const axiosIns = axios.create({
  baseURL: "https://ticker-server.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

// ######################## dark and light mode toggle #####################
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
    nightMode();
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

// ####################### fetch ticker data #########################
function fetchTickerData() {
  axiosIns
    .get("/ticker/top-ten-ticker")
    .then((res) => {
      // console.log(res.data);
      updateTableData(res.data);
    })
    .catch((err) => console.error(err));
}

fetchTickerData();

// Set the initial countdown value
let countdown = 60;
function updateTimer() {
  if (countdown === 0) {
    fetchTickerData();
    updateProgress(countdown);
    countdown = 60;

    setTimeout(updateTimer, 1000);
  } else {
    updateProgress(countdown);
    countdown--;
    setTimeout(updateTimer, 1000);
  }
}
// Start the timer
updateTimer();

// ################### counter updateProgress ############

// timer counter animation
function updateProgress(counterValue) {
  const circleElement = document.getElementById("circle-bg");
  const counterElement = document.getElementById("counter");

  counterElement.textContent = counterValue;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = ((60 - counterValue) / 60) * circumference;

  circleElement.style.strokeDasharray = `${circumference} ${circumference}`;
  circleElement.style.strokeDashoffset = dashOffset;
}

// ######################## update ticker table data #####################
function updateTableData(data) {
  const table = document.getElementById("table-body");
  table.innerHTML = "";
  data.forEach((item, index) => {
    // Calculate the difference
    const difference = Math.abs(item.last - item.buy);
    // Calculate the savings
    let savings = item.last > item.buy ? difference : -difference;
    // Calculate the percentage change
    const percentageChange = ((item.last - item.sell) / item.sell) * 100;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${item.platform}</td>
    <td>₹ ${item.last.toLocaleString("en-IN")}</td>
    <td>₹ ${item.buy.toLocaleString("en-IN")} / ${item.sell.toLocaleString(
      "en-US"
    )}</td>

    ${
      percentageChange < 0
        ? `
    <td class="down">${percentageChange.toFixed(2)} %</td>
    <td class="down">▼ ₹ ${savings.toFixed(3).toLocaleString("en-US")}</td>
    `
        : `
        <td>${percentageChange.toFixed(2)} %</td>
    <td>▲ ₹ ${savings.toFixed(3).toLocaleString("en-US")}</td>
        `
    }
    `;
    table.appendChild(row);
  });
  console.log("data after updated table", data[0]);
}
