"use strict";
// 1行目に記載している 'use strict' は削除しないでください

const startButton = document.getElementById("start-button");
const reactionArea = document.getElementById("reaction-area");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const instructionCard = document.getElementById("instruction-card");
const level = document.getElementById("level");
const keta = document.getElementById("keta");
const time = document.getElementById("time");
const numberBox = document.getElementById("number-box");
const number = document.getElementById("number");
const answerForm = document.getElementById("answer-form");
const answerInput = document.getElementById("answer-input");
const answerButton = document.getElementById("answer-button");
const timer = document.getElementById("timer");
const result = document.getElementById("result");
const bestScore = document.getElementById("best-score");

//変数宣言
let correntLevel = 1;
let levelSettings = getLevelSettings(correntLevel);
let iscorrect = true;
let timerId;
let max = 10 ** 5 - 1;
let min = 10 ** 4;

function defo() {
  const savedScore = localStorage.getItem("memoryBestScore");
  if (savedScore !== null) {
    bestScore.textContent = savedScore;
  }
}

function getState() {
  let state = "";
  if (reactionArea.classList.contains("default")) {
    state = "default";
  } else if (reactionArea.classList.contains("show")) {
    state = "show";
  } else if (reactionArea.classList.contains("hide")) {
    state = "hide";
  } else if (reactionArea.classList.contains("result")) {
    state = "result";
  } else if (reactionArea.classList.contains("waiting")) {
    state = "waiting";
  }
  return state;
}

function changeState(state) {
  startButton.classList.remove("default", "waiting", "show", "hide", "result");
  reactionArea.classList.remove("default", "waiting", "show", "hide", "result");

  switch (state) {
    case "default":
    case "result":
      startButton.classList.remove("default");
      startButton.classList.add("invisible");

      instructionCard.hidden = true;
      number.textContent = Math.floor(Math.random() * (max - min + 1)) + min;
      numberBox.hidden = false;

      timerSet();
      text1.textContent = "覚えて！";
      text2.textContent = "覚えて！";
      reactionArea.classList.add("show");

      timerId = setTimeout(function () {
        text1.textContent = "タイムアップ！";
        text2.textContent = "数字を入力しよう！";

        number.style.visibility = "hidden";
        answerForm.hidden = false;
        answerInput.value = "";
        answerInput.focus();

        reactionArea.classList.remove("show");
        reactionArea.classList.add("hide");
      }, getLevelSettings(correntLevel)["time"] * 1000);
      break;

    case "hide":
      levelSettings = getLevelSettings(correntLevel);
      if (iscorrect) {
        text1.textContent = "正解！";
        text2.textContent = "ボタンを押して次に進む";
        text3.textContent = "NEXT";

        number.style.visibility = "visible";
        answerForm.hidden = true;
        instructionCard.hidden = false;
        numberBox.hidden = true;
        level.textContent = correntLevel;
        keta.textContent = levelSettings["keta"];
        time.textContent = levelSettings["time"];
        startButton.classList.remove("invisible");
        startButton.classList.add("default");
        reactionArea.classList.remove("hide");
        reactionArea.classList.add("result");
        break;
      } else {
        text1.textContent = "不正解！";
        text2.textContent = "ボタンを押してリトライ";
        text3.textContent = "RETRY";
        number.style.visibility = "visible";
        answerForm.hidden = true;
        instructionCard.hidden = false;
        numberBox.hidden = true;

        startButton.classList.remove("invisible");
        startButton.classList.add("default");
        reactionArea.classList.remove("hide");
        reactionArea.classList.add("result");
      }
      break;
  }
}

function getLevelSettings(level) {
  if (level <= 5) {
    return {
      keta: 5,
      time: 6 - level
    };
  }

  if (level <= 10) return { keta: 5, time: 1 };
  if (level <= 15) return { keta: Math.floor(level / 2), time: 1 };
  if (level <= 20) return { keta: Math.floor(level / 2), time: 1 };
  if (level <= 25) return { keta: Math.floor(level / 2), time: 1 };
  if (level <= 29) return { keta: Math.floor(level / 2), time: 1 };
  if (level === 30) return { keta: Math.floor(level / 2), time: 1 };
}

function timerSet() {
  for (let i = 0; i < getLevelSettings(correntLevel)["time"] + 1; i++) {
    setTimeout(function () {
      timer.textContent = (getLevelSettings(correntLevel)["time"] - i);
    }, i * 1000);
  }
}

function gameStart() {
  result.textContent = correntLevel - 1;

  const levelSettings = getLevelSettings(correntLevel);
  level.textContent = correntLevel;
  keta.textContent = levelSettings.keta;
  time.textContent = levelSettings.time;
}

function saveBestScore(score) {
  const savedScore = localStorage.getItem("memoryBestScore");

  if (savedScore === null || score > Number(savedScore)) {
    localStorage.setItem("memoryBestScore", Math.floor(score));

  }
}


//実行動作
defo()
startButton.addEventListener("click", function () {
  const state = getState();
  if (state === "default" || state === "result") {
    gameStart();
    changeState(state);
  }
});

answerButton.addEventListener("click", function () {
  if (answerInput.value === number.textContent) {
    iscorrect = true;
    result.textContent = correntLevel;
    saveBestScore(correntLevel);
    defo();
    correntLevel++;
    min = 10 ** (getLevelSettings(correntLevel)["keta"] - 1);
    max = 10 ** getLevelSettings(correntLevel)["keta"] - 1;
    changeState("hide");

  } else {
    iscorrect = false;
    correntLevel = 1;
    gameStart();
    min = 10 ** (getLevelSettings(correntLevel)["keta"] - 1);
    max = 10 ** getLevelSettings(correntLevel)["keta"] - 1;
    changeState("hide");
  }
});
