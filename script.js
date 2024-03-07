// Slideshow handling
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function fetchSlideIndex() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      slideIndex = parseInt(this.responseText);
      showSlides(slideIndex);
    }
  };
  xhttp.open("GET", "/slide-index", true);
  xhttp.send();
}

function updateSlideIndex(newIndex) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/update-slide-index", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({ slideIndex: newIndex }));
}

function showSlides(n) {
  for (let i = 0; i < slides.length; i++) {
    if (i === n) {
      slides[i].style.display = "block";
    } else {
      slides[i].style.display = "none";
    }
  }
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlides(slideIndex);
  updateSlideIndex(slideIndex);
}

function nextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlides(slideIndex);
  updateSlideIndex(slideIndex);
}

fetchSlideIndex();

// Cookie handling
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=None;Secure`;
}

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

function fillInTextFields() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const savedName = getCookie("contact_name");
  const savedEmail = getCookie("contact_email");
  const savedMessage = getCookie("contact_message");

  if (savedName) nameInput.value = savedName;
  if (savedEmail) emailInput.value = savedEmail;
  if (savedMessage) messageInput.value = savedMessage;
}

window.addEventListener("DOMContentLoaded", (event) => {
  window.addEventListener("load", fillInTextFields);
  const el = document.getElementById("submit-btn");
  if (el) {
    el.addEventListener("click", (e) => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      setCookie("contact_name", name, 7);
      setCookie("contact_email", email, 7);
      setCookie("contact_message", message, 7);
    });
  }
});

// Weather handling
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/latest-weather");
    const data = await response.json();
    const temperature = data.temperature;
    updateWeather(temperature);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    updateWeather("N/A");
  }
});

function updateWeather(temperature) {
  const weatherElement = document.getElementById("weather");
  if (weatherElement) {
    weatherElement.textContent = `${temperature}°F`;
  }
}
