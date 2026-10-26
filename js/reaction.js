"use strict";
// 1行目に記載している 'use strict' は削除しないでください

const startButton = document.getElementById("start-button");
const reactionArea = document.getElementById("reaction-area");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const text4 = document.getElementById("text4");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const result3 = document.getElementById("result3");
const result4 = document.getElementById("result4");
const result5 = document.getElementById("result5");
const averageResult = document.getElementById("average-result");
const bestScore = document.getElementById("best-score");

const resultText = [result1, result2, result3, result4, result5];
let result = [null, null, null, null, null];
let startTime = 0;
let endTime = 0;
let count;
let timerId;
let sum = 0;


function defo() {
  const savedScore = localStorage.getItem("reactionBestScore");
  if (savedScore !== null) {
    bestScore.textContent = savedScore;
  }
}

function getState() {
  let state = "";
  if (reactionArea.classList.contains("nomal")) {
    state = "nomal";
  } else if (reactionArea.classList.contains("waiting")) {
    state = "waiting";
  } else if (reactionArea.classList.contains("ready")) {
    state = "ready";
  } else if (reactionArea.classList.contains("default")) {
    state = "default";
  } else if (reactionArea.classList.contains("error")) {
    state = "error";
  } else if (reactionArea.classList.contains("result")) {
    state = "result";
  }
  return state;
}

function changeState(state) {
  startButton.classList.remove("default", "nomal", "waiting", "ready", "error", "result");
  reactionArea.classList.remove("default", "nomal", "waiting", "ready", "error", "result");

  switch (state) {
    case "default":
    case "error":
    case "result":
      text1.textContent = "測定中...";
      text2.textContent = "画面が緑色になったらすぐにクリック！";
      text3.textContent = "WAIT...";
      text4.hidden = true;
      reactionArea.classList.add("waiting");
      startButton.classList.add("waiting");

      timerId = setTimeout(
        function () {
          changeState("toReady");
          startTime = performance.now();
        },
        (Math.random() * 8 + 2) * 1000,
      );

      break;
    case "waiting":
      text1.textContent = "エラー！";
      text2.textContent = "早すぎます！";
      text3.textContent = "RETRY";
      text4.hidden = true;
      reactionArea.classList.add("error");
      startButton.classList.add("error");
      break;
    case "toReady":
      text1.textContent = "測定中...";
      text2.textContent = "クリック！";
      text3.textContent = "CLICK!";
      text4.hidden = true;
      reactionArea.classList.add("ready");
      startButton.classList.add("ready");
      break;
    case "ready":
      if (count !== 5) {
        text1.textContent = "次に進む";
        text2.textContent = "クリックで次に進む";
        text3.textContent = "NEXT";
        reactionArea.classList.add("nomal");
        startButton.classList.add("nomal");
        break;
      } else {
        text1.textContent = "測定完了！";
        text2.textContent = "おつ！";
        text3.textContent = "RETRY";
        text4.hidden = true;
        for (const res of result) {
          sum += res;
        }
        averageResult.textContent = Math.floor(sum / 5);
        saveBestScore(Math.floor(sum / 5));
        defo();
        reactionArea.classList.add("result");
        startButton.classList.add("result");
      }
      break;
    case "nomal":

      text1.textContent = "測定中...";
      text2.textContent = "画面が緑色になったらすぐにクリック！";
      text3.textContent = "WAIT...";
      text4.hidden = true;
      reactionArea.classList.add("waiting");
      startButton.classList.add("waiting");

      timerId = setTimeout(function () {
        changeState("toReady");

        requestAnimationFrame(function () {
          startTime = performance.now();
        });
      }, (Math.random() * 6 + 2) * 1000);
      break;

  }
}

function gameStart() {
  result = [null, null, null, null, null];
  count = 0;
  sum = 0;
  result1.textContent = "---";
  result2.textContent = "---";
  result3.textContent = "---";
  result4.textContent = "---";
  result5.textContent = "---";
  averageResult.textContent = "---";

}

function update() {
  result[count] = endTime - startTime;
  resultText[count].textContent = Math.floor(result[count]);
  console.log(result);
  console.log(count);
  count++;
}

function saveBestScore(score) {
  const savedScore = localStorage.getItem("reactionBestScore");

  if (savedScore === null || score < Number(savedScore)) {
    localStorage.setItem("reactionBestScore", Math.floor(score));

  }
}


//実行動作
defo()
startButton.addEventListener("click", function () {
  const state = getState();
  if (state === "default" || state === "result") {
    gameStart();
    changeState(state);
  } else if (state === "nomal") {
    changeState(state);
  }
  else if (state === "waiting") {
    clearTimeout(timerId);
    changeState(state);
  } else if (state === "error") {
    changeState(state);
  } else if (state === "ready") {
    endTime = performance.now();
    update();
    changeState(state);
  }
});
