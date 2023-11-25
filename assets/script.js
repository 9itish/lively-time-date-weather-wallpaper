const dark_colors = [
  "#B71C1C",
  "#880E4F",
  "#4A148C",
  "#311B92",
  "#1A237E",
  "#0D47A1",
  "#01579B",
  "#006064",
  "#004D40",
  "#1B5E20",
  "#33691E",
  "#827717",
  "#F57F17",
  "#FF6F00",
  "#E65100",
  "#BF360C"
];

const light_colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722"
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update_weather_joke() {
  fetch('https://api.weatherapi.com/v1/current.json?key=8f60b71c677d4cd98c8175806222001&q=New_Delhi&aqi=yes')
    .then(response => response.json())
    .then(json_data => {
      let temperature = json_data.current.feelslike_c;
      let wind = json_data.current.wind_kph;
      let visibility = json_data.current.vis_km;
      let humidity = json_data.current.humidity;

      document.querySelector("p.temp").textContent = "Temperature: " + temperature + " °C";
      document.querySelector("p.hum").textContent = "Humidity: " + humidity + "%";
      document.querySelector("p.wind").textContent = "Wind Speed: " + wind + " km/hr";
      document.querySelector("p.vis").textContent = "Visibility: " + visibility + " km";
    });

  update_joke();
  
}

function update_time() {
  const date = new Date();
  let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  let [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

  const am_pm = hour >= 12 ? "PM" : "AM";

  if (hour > 12) {
    hour %= 12;
  }

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  document.querySelector(".hour").innerText = `${hour}`.padStart(2, "0");
  document.querySelector(".minutes").innerText = `${minutes}`.padStart(2, "0");
  document.querySelector(".seconds").innerText = `${seconds}`.padStart(2, "0");

  document.querySelector(".am-pm").innerText = am_pm;

  document.querySelector(".day").innerText = `${day} ${months[month]}, ${year}`;

  if (minutes % 30 === 0 && seconds === 0) {
    document.querySelector(".time").style.color =
      light_colors[getRandomInt(0, light_colors.length - 1)];
    update_weather_joke();
  }
}


function update_joke() {
  fetch('https://v2.jokeapi.dev/joke/Misc?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=1')
  .then(response => response.json())
  .then(json_data => {
    if(json_data.joke.includes("LGBT")) {
      update_joke();
    } else {
      document.querySelector("section.joke p").innerText = json_data.joke;
    }
  });
}

update_time();

window.setInterval(update_time, 1000);

document.addEventListener('DOMContentLoaded', function () {

  particlesJS('particle-container', {
"particles": {
  "number": {
    "value": 60,
    "density": {
      "enable": true,
      "value_area": 800
    }
  },
  "color": {
    "value": "random"
  },
  "shape": {
    "type": "circle",
    "stroke": {
      "width": 0,
      "color": "random"
    },
  },
  "opacity": {
    "value": 1,
    "random": false
  },
  "size": {
    "value": 4,
    "random": true
  },
  "line_linked": {
    "enable": false,
    "distance": 300,
    "color": "#000",
    "opacity": 1,
    "width": 1
  },
  "move": {
    "enable": true,
    "speed": 2,
    "direction": "none",
    "random": true,
    "straight": false,
    "out_mode": "out",
    "bounce": false
  }
},
"interactivity": {
  "detect_on": "canvas",
  "events": {
    "onhover": {
      "enable": true,
      "mode": "grab"
    },
    "onclick": {
      "enable": false
    },
    "resize": true
  },
  "modes": {
    "grab": {
      "distance": 150,
      "line_linked": {
        "opacity": 1
      }
    }
  }
},
"retina_detect": true
});

  update_weather_joke();

  const buttonElement = document.querySelector('button');
    buttonElement.addEventListener('click', function () {
      update_joke();
  });

});