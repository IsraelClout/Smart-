/* =========================================
   SMART JUNIOR LOVE WEBSITE
   CUSTOM SETTINGS
========================================= */

const LOGIN_USERNAME = "Smart junior";
const LOGIN_PASSWORD = "gokah";

/*
   CHANGE THIS TO THE DATE YOU TWO STARTED
   Example:
   const relationshipStartDate = "2026-01-15T00:00:00";
*/
const relationshipStartDate = "2026-01-01T00:00:00";


/* =========================================
   LOGIN SYSTEM
========================================= */

const loginScreen = document.getElementById("loginScreen");
const mainWebsite = document.getElementById("mainWebsite");
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

function showWebsite() {
  loginScreen.classList.add("hidden");
  mainWebsite.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  startAnimations();
}

if (sessionStorage.getItem("smartJuniorLoggedIn") === "true") {
  showWebsite();
}

loginForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const enteredUsername = username.value.trim();
  const enteredPassword = password.value;

  if (
    enteredUsername.toLowerCase() === LOGIN_USERNAME.toLowerCase() &&
    enteredPassword === LOGIN_PASSWORD
  ) {

    sessionStorage.setItem("smartJuniorLoggedIn", "true");

    loginMessage.textContent = "Welcome to my heart, Smart Junior ❤️";

    setTimeout(() => {
      showWebsite();
    }, 600);

  } else {

    loginMessage.textContent =
      "Hmm... that doesn't look right, my love ❤️ Try again.";

  }

});


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

document.getElementById("togglePassword").addEventListener("click", function() {

  if (password.type === "password") {
    password.type = "text";
    this.textContent = "🙈";
  } else {
    password.type = "password";
    this.textContent = "👁️";
  }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function() {
  navMenu.classList.toggle("active");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});


/* =========================================
   RELATIONSHIP TIMER
========================================= */

function updateTimer() {

  const start = new Date(relationshipStartDate);
  const now = new Date();

  let difference = now - start;

  if (difference < 0) {
    difference = 0;
  }

  const seconds = Math.floor(difference / 1000);

  const days = Math.floor(seconds / 86400);

  const hours = Math.floor(
    (seconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  const secs = seconds % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = secs;
}

updateTimer();

setInterval(updateTimer, 1000);


/* =========================================
   DAILY LOVE MESSAGE
========================================= */

const loveMessages = [

  "You make ordinary moments feel special. ❤️",

  "Your smile is one of my favorite things in this world. 🥰",

  "Every day with you is another memory worth keeping. 💕",

  "I'm grateful that our paths crossed. ❤️",

  "You are one of the most beautiful parts of my story. 🌹",

  "No matter how busy life gets, I hope you always remember how special you are to me. ❤️",

  "You have a way of making my world brighter. ✨",

  "Some people come into your life and make it better. You are one of those people. ❤️"

];

const randomMessage =
  loveMessages[
    Math.floor(Math.random() * loveMessages.length)
  ];

document.getElementById("dailyMessage").textContent =
  randomMessage;


/* =========================================
   SURPRISE MODAL
========================================= */

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseModal = document.getElementById("surpriseModal");
const closeModal = document.getElementById("closeModal");
const replayBtn = document.getElementById("replayBtn");

surpriseBtn.addEventListener("click", openSurprise);

function openSurprise() {

  surpriseModal.classList.add("active");

  createHearts();

}

function closeSurprise() {

  surpriseModal.classList.remove("active");

}

closeModal.addEventListener("click", closeSurprise);

replayBtn.addEventListener("click", function() {

  surpriseModal.classList.remove("active");

  setTimeout(() => {
    surpriseModal.classList.add("active");
    createHearts();
  }, 300);

});

surpriseModal.addEventListener("click", function(event) {

  if (event.target === surpriseModal) {
    closeSurprise();
  }

});


/* =========================================
   FLOATING HEARTS
========================================= */

function createHearts() {

  for (let i = 0; i < 25; i++) {

    const heart = document.createElement("div");

    heart.textContent = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize =
      (15 + Math.random() * 25) + "px";

    heart.style.zIndex = "1000";
    heart.style.pointerEvents = "none";

    document.body.appendChild(heart);

    const duration =
      2500 + Math.random() * 2500;

    heart.animate(
      [
        {
          transform: "translateY(0) scale(.7)",
          opacity: 1
        },
        {
          transform:
            `translateY(-${window.innerHeight + 100}px) scale(1.2)`,
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      heart.remove();
    }, duration);

  }

}


/* =========================================
   SCROLL REVEAL
========================================= */

function startAnimations() {

  const revealElements =
    document.querySelectorAll(".reveal");

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(element => {
    observer.observe(element);
  });

}


/* =========================================
   LOGOUT
========================================= */

document.getElementById("logoutBtn")
  .addEventListener("click", function() {

    sessionStorage.removeItem("smartJuniorLoggedIn");

    mainWebsite.classList.add("hidden");
    loginScreen.classList.remove("hidden");

    username.value = "";
    password.value = "";
    loginMessage.textContent = "";

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  });
