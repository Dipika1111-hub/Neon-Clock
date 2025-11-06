 const clock = document.querySelector(".clock");
    for (let i = 1; i <= 12; i++) {
      const number = document.createElement("div");
      number.classList.add("number");
      number.textContent = i;
      const angle = (i / 12) * 2 * Math.PI;
      const radius = 130;
      const x = 150 + radius * Math.sin(angle);
      const y = 150 - radius * Math.cos(angle);
      number.style.left = `${x}px`;
      number.style.top = `${y}px`;
      clock.appendChild(number);
    }

    let interval;
    function updateClock() {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const hourDeg = (hours + minutes / 60) * 30;
      const minuteDeg = (minutes + seconds / 60) * 6;
      const secondDeg = seconds * 6;
      document.getElementById("hour").style.transform = `rotate(${hourDeg}deg)`;
      document.getElementById("minute").style.transform = `rotate(${minuteDeg}deg)`;
      document.getElementById("second").style.transform = `rotate(${secondDeg}deg)`;
    }

    function startClock() {
      updateClock();
      interval = setInterval(updateClock, 1000);
    }

    function stopClock() {
      clearInterval(interval);
    }

    startClock();

    const btn = document.getElementById("showInfoBtn");
    const showTimeBtn = document.getElementById("showTimeBtn");
    const stopBtn = document.getElementById("stopBtn");
    const infoBox = document.getElementById("infoBox");
    const timeBox = document.getElementById("timeBox");
    const colorPicker = document.getElementById("colorPicker");

    btn.addEventListener("click", () => {
      const now = new Date();
      const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const day = dayNames[now.getDay()];
      const date = now.getDate();
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      infoBox.innerHTML = `📅 ${day}, ${month} ${date}, ${year} <br><span style="font-size:30px;">😊</span>`;
      infoBox.classList.toggle("show");
    });

    // 🎯 Continuous Exact Time
    let timeInterval;
    let timeVisible = false;

    showTimeBtn.addEventListener("click", () => {
      if (!timeVisible) {
        timeBox.classList.add("show");
        timeVisible = true;
        timeInterval = setInterval(() => {
          const now = new Date();
          const h = String(now.getHours()).padStart(2, "0");
          const m = String(now.getMinutes()).padStart(2, "0");
          const s = String(now.getSeconds()).padStart(2, "0");
          timeBox.innerHTML = `⏰ ${h}:${m}:${s}`;
        }, 1000);
        showTimeBtn.textContent = "Hide Time ❌";
      } else {
        clearInterval(timeInterval);
        timeBox.classList.remove("show");
        timeVisible = false;
        showTimeBtn.textContent = "Show Exact Time ⏰";
      }
    });

    stopBtn.addEventListener("click", () => {
      if (interval) {
        stopClock();
        stopBtn.textContent = "Start Clock ▶️";
        interval = null;
      } else {
        startClock();
        stopBtn.textContent = "Stop Clock ⏸️";
      }
    });

    colorPicker.addEventListener("input", (e) => {
      const newColor = e.target.value;
      document.documentElement.style.setProperty("--neon", newColor);
    });

    function createEmoji() {
      const emoji = document.createElement("div");
      emoji.classList.add("emoji");
      emoji.textContent = ["😊","💙","✨","💫","🌸","😄"][Math.floor(Math.random() * 6)];
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      const clockRect = clock.getBoundingClientRect();
      if (x > clockRect.left && x < clockRect.right && y > clockRect.top && y < clockRect.bottom) return;
      emoji.style.left = x + "px";
      emoji.style.top = y + "px";
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 5000);
    }
    setInterval(createEmoji, 800);