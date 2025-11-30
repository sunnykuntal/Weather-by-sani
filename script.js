 //  API SETTINGS  
const API_KEY = "9179e83a68d0abfed79d96af1d780bde";
const API_URL = "https://api.openweathermap.org/data/2.5/";
const AQI_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

//  ELEMENTS  
const searchBtn = document.getElementById("searchBtn");
const userLocation = document.getElementById("userLocation");
const tempDisplay = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const desc = document.getElementById("description");
const cityEl = document.getElementById("city");
const dateEl = document.getElementById("date");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");
const cloudsEl = document.getElementById("clouds");
const pressureEl = document.getElementById("pressure");
const aqiEl = document.getElementById("aqi");
const hourlyContainer = document.getElementById("hourlyContainer");
const weeklyContainer = document.getElementById("weeklyContainer");
const unitSwitch = document.getElementById("unitSwitch");
const bgVideo = document.getElementById("bgVideo");
const voiceBtn = document.getElementById("voiceBtn");
const recentCities = document.getElementById("recentCities");
const errorBox = document.getElementById("errorBox");
const weatherIcon = document.getElementById("weatherIcon");
const alertSound = document.getElementById("alertSound");

let isFahrenheit = false;
let lastWeather = null;
let lastForecast = null;

// Allow Sound on First Click (Mobile Support)
document.body.addEventListener("click", () => {
  alertSound.muted = false;
}, { once: true });

// LIVE DATE & TIME 
function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  dateEl.textContent = `${date} – ${time}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// TEMP CONVERSION
const convertTemp = c => isFahrenheit ? (c * 9/5) + 32 : c;
const unitSymbol = () => isFahrenheit ? "°F" : "°C";

// ICON SELECTION
function getIcon(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("clear")) return "https://img.icons8.com/color/96/sun--v1.png";
  if (condition.includes("cloud")) return "https://img.icons8.com/color/96/cloud.png";
  if (condition.includes("rain") || condition.includes("drizzle")) return "https://img.icons8.com/color/96/rain.png";
  if (condition.includes("storm") || condition.includes("thunder")) return "https://img.icons8.com/color/96/storm.png";
  if (condition.includes("snow")) return "https://img.icons8.com/color/96/snow.png";
  return "https://img.icons8.com/color/96/fog-day.png";
}

// BACKGROUND VIDEO 
function setBackground(d) {
  const now = Math.floor(Date.now() / 1000);
  const night = now > d.sys.sunset || now < d.sys.sunrise;
  const w = d.weather[0].main.toLowerCase();
  let video = "sunny.mp4";

  if (w.includes("rain"))
    video = night ? "night_rain.mp4" : "rain.mp4";
  else if (w.includes("snow"))
    video = night ? "night_snow.mp4" : "snow.mp4";
  else if (w.includes("storm") || w.includes("thunder"))
    video = night ? "night_storm.mp4" : "storm.mp4";
  else if (w.includes("cloud"))
    video = night ? "night_cloud.mp4" : "cloud.mp4";
  else if (w.includes("fog") || w.includes("mist") || w.includes("haze"))
    video = night ? "darkcloud.mp4" : "darkcloud.mp4";
  else
    video = night ? " night.mp4" : "sunny.mp4";

  bgVideo.src = `video/${video}`;
}

// POPUP ALERT
function showAlert(text) {
  const div = document.createElement("div");
  div.className = "alert-card";
  div.textContent = text;
  document.body.appendChild(div);
  alertSound.currentTime = 0;
  alertSound.play().catch(()=>{});
  setTimeout(() => div.remove(), 4000);
}

// VOICE 
let selectedVoice = null;
function initVoices() {
  const voices = speechSynthesis.getVoices();
  selectedVoice =
    voices.find(v => /google.*english/i.test(v.name)) ||
    voices.find(v => v.lang === "en-US") ||
    voices.find(v => v.lang.startsWith("en")) ||
    voices[0];
}
speechSynthesis.addEventListener("voiceschanged", initVoices);
initVoices();
function speakEnglish(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.voice = selectedVoice;
  msg.lang = "en-US";
  msg.rate = 1.02;
  msg.pitch = 1;
  msg.volume = 1;
  speechSynthesis.speak(msg);
}

// WEATHER ALERTS
function weatherAlerts(d) {
  const w = d.weather[0].main.toLowerCase();
  const t = d.main.temp;

  if (w.includes("rain")) {
    showAlert("Rain detected — carry an umbrella.");
    speakEnglish("Weather update. It is currently raining. Please carry an umbrella.");
  }
  else if (w.includes("snow")) {
    showAlert("Snowfall detected — roads may be slippery.");
    speakEnglish("Weather update. Snowfall detected. Stay warm and drive carefully.");
  }
  else if (w.includes("storm")) {
    showAlert("Thunderstorm alert — avoid going outside.");
    speakEnglish("Weather alert. A thunderstorm is active in your area. Avoid outdoor travel.");
  }

  if (t > 40) {
    showAlert("Extreme heat warning — stay hydrated.");
    speakEnglish("Heat alert. The temperature is extremely high. Please stay hydrated.");
  }

  if (t < 5) {
    showAlert("Extreme cold — wear warm clothes.");
    speakEnglish("Cold alert. The temperature is very low. Wear warm clothing and avoid long outdoor exposure.");
  }
}

// SEARCH HISTORY
function saveToHistory(name) {
  let hs = JSON.parse(localStorage.getItem("history")) || [];
  if (!hs.includes(name)) {
    hs.unshift(name);
    if (hs.length > 10) hs.pop();
    localStorage.setItem("history", JSON.stringify(hs));
  }
  loadHistory();
}
function loadHistory() {
  let hs = JSON.parse(localStorage.getItem("history")) || [];
  recentCities.innerHTML = `<option value="">Recent</option>`;
  hs.forEach(c => recentCities.innerHTML += `<option value="${c}">${c}</option>`);
}
recentCities.onchange = () => recentCities.value && getWeather(recentCities.value);

// MAIN WEATHER 
async function getWeather(query) {
  if (!query) return showError("Enter city name");
  try {
    const res = await fetch(`${API_URL}weather?q=${query}&appid=${API_KEY}&units=metric`);
    const d = await res.json();
    if (d.cod !== 200) return showError("City not found");

    lastWeather = d;
    updateWeather(d);
    getForecast(d.coord.lat, d.coord.lon);
    getAQI(d.coord.lat, d.coord.lon);
    saveToHistory(d.name);
  } catch {
    showError("Network Error");
  }
}

// ERROR 
function showError(msg) {
  errorBox.style.display = "block";
  errorBox.innerText = msg;
  setTimeout(() => (errorBox.style.display = "none"), 3000);
}

// UPDATE UI 
function updateWeather(d) {
  tempDisplay.textContent = `${Math.round(convertTemp(d.main.temp))}${unitSymbol()}`;
  feelsLike.textContent = `Feels like: ${Math.round(convertTemp(d.main.feels_like))}${unitSymbol()}`;
  desc.textContent = d.weather[0].description;
  cityEl.textContent = d.name;
  humidityEl.textContent = d.main.humidity + "%";
  windEl.textContent = d.wind.speed + " m/s";
  sunriseEl.textContent = new Date(d.sys.sunrise * 1000).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true});
  sunsetEl.textContent = new Date(d.sys.sunset * 1000).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true});
  cloudsEl.textContent = d.clouds.all + "%";
  pressureEl.textContent = d.main.pressure + " hPa";
  weatherIcon.innerHTML = `<img src="${getIcon(d.weather[0].description)}" width="95">`;
  setBackground(d);
  weatherAlerts(d);
}

// FORECAST 
async function getForecast(lat, lon) {
  const res = await fetch(`${API_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  const d = await res.json();
  lastForecast = d;

  hourlyContainer.innerHTML = "";
  d.list.slice(0, 8).forEach(x => {
    hourlyContainer.innerHTML += `
      <div class="box">
        <p>${new Date(x.dt * 1000).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true})}</p>
        <img src="${getIcon(x.weather[0].description)}" width="55">
        <h3>${Math.round(convertTemp(x.main.temp))}${unitSymbol()}</h3>
      </div>`;
  });

  weeklyContainer.innerHTML = "";
  let days = {};
  d.list.forEach(f => {
    const day = f.dt_txt.split(" ")[0];
    if (!days[day]) days[day] = f;
  });

  Object.values(days).slice(0, 7).forEach(f => {
    weeklyContainer.innerHTML += `
      <div class="box">
        <p>${new Date(f.dt_txt).toDateString().slice(0, 10)}</p>
        <img src="${getIcon(f.weather[0].description)}" width="55">
        <h3>${Math.round(convertTemp(f.main.temp))}${unitSymbol()}</h3>
      </div>`;
  });
}

// AQI 
async function getAQI(lat, lon) {
  const r = await fetch(`${AQI_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const d = await r.json();
  aqiEl.textContent = d.list[0].main.aqi;
}

// VOICE BUTTON 
voiceBtn.onclick = () => {
  if (!lastWeather) return;
  const d = lastWeather;
  speakEnglish(
    `Weather report for ${d.name}. Temperature is ${Math.round(convertTemp(d.main.temp))}${unitSymbol()}. Condition: ${d.weather[0].description}.`
  );
};

// UNIT SWITCH 
unitSwitch.onchange = () => {
  isFahrenheit = unitSwitch.checked;
  if (lastWeather) updateWeather(lastWeather);
};

// AUTO SUGGESTION 
const suggestionBox = document.createElement("div");
suggestionBox.className = "suggestion-box";
suggestionBox.style.display = "none";
userLocation.parentElement.appendChild(suggestionBox);

userLocation.addEventListener("input", async () => {
  const q = userLocation.value.trim();
  if (q.length < 2) return hideSuggestions();

  const geo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=6&appid=${API_KEY}`);
  const result = await geo.json();
  if (!result.length) return hideSuggestions();

  let html = "";
  result.forEach(c => html += `<div class="suggest-item">${c.name}, ${c.country}</div>`);
  showSuggestions(html);

  document.querySelectorAll(".suggest-item").forEach(item => {
    item.onclick = () => {
      userLocation.value = item.innerText.split(",")[0];
      hideSuggestions();
      getWeather(userLocation.value);
    };
  });
});

function showSuggestions(html) {
  suggestionBox.innerHTML = html;
  suggestionBox.style.display = "block";
}
function hideSuggestions() {
  suggestionBox.style.display = "none";
}
document.addEventListener("click", e => {
  if (!suggestionBox.contains(e.target) && e.target !== userLocation) hideSuggestions();
});

// SEARCH
function handleSearch() {
  const city = userLocation.value.trim();
  if (city === "") showError("Enter city name");
  else getWeather(city);
}
searchBtn.addEventListener("click", handleSearch);
userLocation.addEventListener("keypress", (e) => { if (e.key === "Enter") handleSearch(); });

// AUTO LOCATION 
window.onload = () => {
  loadHistory();
  if (!navigator.geolocation) return showError("Location not supported");
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetch(`${API_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(r => r.json())
        .then(d => {
          lastWeather = d;
          updateWeather(d);
          getForecast(lat, lon);
          getAQI(lat, lon);
        });
    },
    () => showError("Location permission denied — enter city manually"),
    { enableHighAccuracy: true, timeout: 10000 }
  );
};
