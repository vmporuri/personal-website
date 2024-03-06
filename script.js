// Slideshow
slideIndex = 0;
showSlides(slideIndex);

function plusSlide(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    if (i == slideIndex) {
      slides[i].style.display = "block";
    } else {
      slides[i].style.display = "none";
    }
  }
}

function prevSlide() {
  plusSlide(-1);
}

function nextSlide() {
  plusSlide(1);
}

// Cookies
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=None;Secure`;
}

// Function to get a cookie by name
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

// Function to fill in text fields with saved data
function fillInTextFields() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Get saved contact info from cookies
  const savedName = getCookie("contact_name");
  const savedEmail = getCookie("contact_email");
  const savedMessage = getCookie("contact_message");

  // Fill in text fields with saved data
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
      setCookie("contact_name", name, 7); // Save name for 7 days
      setCookie("contact_email", email, 7); // Save email for 7 days
      setCookie("contact_message", message, 7); // Save message for 7 days
    });
  }
});
