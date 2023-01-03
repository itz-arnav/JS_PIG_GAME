"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, gameOver;

function init() {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  activePlayer = 0;
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  dice.classList.add("hidden");
  gameOver = false;
}

btnRoll.addEventListener("click", function () {
  if (gameOver) {
    return;
  }
  let randomNumber = Math.trunc(Math.random() * 6) + 1;
  if (dice.classList.contains("hidden")) {
    dice.classList.remove("hidden");
  }
  dice.src = `dice-${randomNumber}.png`;
  if (randomNumber === 1) {
    if (activePlayer === 0) {
      current0.textContent = 0;
      player0.classList.remove("player--active");
      player1.classList.add("player--active");
      activePlayer = 1;
    } else {
      current1.textContent = 0;
      player1.classList.remove("player--active");
      player0.classList.add("player--active");
      activePlayer = 0;
    }
  } else {
    if (activePlayer === 0) {
      current0.textContent = Number(current0.textContent) + randomNumber;
    } else {
      current1.textContent = Number(current1.textContent) + randomNumber;
    }
  }
});

btnHold.addEventListener("click", function () {
  if (gameOver) {
    return;
  }
  if (activePlayer === 0) {
    score0.textContent =
      Number(score0.textContent) + Number(current0.textContent);

    if (Number(score0.textContent) >= 20) {
      player0.classList.remove("player--active");
      player0.classList.add("player--winner");
      gameOver = true;
      return;
    }

    player0.classList.remove("player--active");
    player1.classList.add("player--active");
    activePlayer = 1;
    current0.textContent = 0;
  } else {
    score1.textContent =
      Number(score1.textContent) + Number(current1.textContent);

    if (Number(score1.textContent) >= 20) {
      player1.classList.remove("player--active");
      player1.classList.add("player--winner");
      gameOver = true;
      return;
    }

    player1.classList.remove("player--active");
    player0.classList.add("player--active");
    activePlayer = 0;
    current1.textContent = 0;
  }
});

btnNew.addEventListener("click", function () {
  init();
});

init();
