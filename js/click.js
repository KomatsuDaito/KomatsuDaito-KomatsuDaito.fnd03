"use strict";
// 1行目に記載している 'use strict' は削除しないでください

const startButton = document.getElementById("start-button");
const reactionArea = document.getElementById("reaction-area");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const timer = document.getElementById("timer");
const result = document.getElementById("result");
const bestScore = document.getElementById("best-score");

let score = 0;
let timerId;
let startTime;


function defo() {
  const savedScore = localStorage.getItem("clickBestScore");
  if (savedScore !== null) {
    bestScore.textContent = savedScore;
  }
}

function getState() {
  let state = "";
  if (reactionArea.classList.contains("waiting")) {
    state = "waiting";
  } else if (reactionArea.classList.contains("clicking")) {
    state = "clicking";
  } else if (reactionArea.classList.contains("default")) {
    state = "default";
  } else if (reactionArea.classList.contains("result")) {
    state = "result";
  } else if (reactionArea.classList.contains("end")) {
    state = "end";
  }
  return state;
}

function changeState(state) {
  startButton.classList.remove("default", "waiting", "clicking", "result", "end");
  reactionArea.classList.remove("default", "waiting", "clicking", "result", "end");

  switch (state) {
    case "default":
    case "result":
      text1.textContent = "測定中...";
      text2.textContent = "カウントが0になったらたくさんクリック！";
      text3.textContent = "3";
      timer.textContent = "10";

      for (let i = 2; i > 0; i--) {
        setTimeout(function () {
          text3.textContent = i;
        }, (3 - i) * 1000);
      }

      setTimeout(function () {
        timerSet();
        text1.textContent = "測定中...";
        text2.textContent = "連打！";
        text3.textContent = "click!!";
        reactionArea.classList.add("clicking");
        startButton.classList.add("clicking");

        requestAnimationFrame(function () {
          startTime = performance.now();
        });

        timerId = setTimeout(function () {
          text1.textContent = "測定終了！";
          text2.textContent = "おつかれ！";
          text3.textContent = "FINISH!";
          saveBestScore(score);
          defo()

          reactionArea.classList.remove("clicking");
          startButton.classList.remove("clicking");
          reactionArea.classList.add("end");
          startButton.classList.add("end");

          setTimeout(function () {
            text2.textContent = "ボタンを押してリトライ";
            text3.textContent = "RETRY!";

            reactionArea.classList.remove("end");
            startButton.classList.remove("end");
            reactionArea.classList.add("result");
            startButton.classList.add("result");

          }, 4000);
        }, 10000);
      }, 3000);
      break;
  }
}

function timerSet() {
  for (let i = 0; i < 11; i++) {
    setTimeout(function () {
      timer.textContent = (10 - i);
    }, i * 1000);
  }
}

function gameStart() {
  score = 0;
  result.textContent = 0;

}

function update() {
  score++;
  result.textContent = score;
}

function saveBestScore(score) {
  const savedScore = localStorage.getItem("clickBestScore");

  if (savedScore === null || score > Number(savedScore)) {
    localStorage.setItem("clickBestScore", Math.floor(score));

  }
}


//実行動作
defo()
startButton.addEventListener("click", function () {
  const state = getState();
  if (state === "default" || state === "result") {
    gameStart();
    changeState(state);
  } else if (state === "clicking") {
    update();
  }
});
