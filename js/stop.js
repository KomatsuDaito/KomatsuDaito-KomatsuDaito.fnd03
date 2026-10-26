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
let timerTime;
const startSeconds = 10;


function defo() {
    const savedScore = localStorage.getItem("stopBestScore");
    if (savedScore !== null) {
        bestScore.textContent = savedScore;
    }
}

function getState() {
    let state = "";
    if (reactionArea.classList.contains("waiting")) {
        state = "waiting";
    } else if (reactionArea.classList.contains("default")) {
        state = "default";
    } else if (reactionArea.classList.contains("result")) {
        state = "result";
    }
    return state;
}

function changeState(state) {
    startButton.classList.remove("default", "waiting", "result");
    reactionArea.classList.remove("default", "waiting", "result");

    switch (state) {
        case "default":
        case "result":
            text1.textContent = "測定中...";
            text2.textContent = "10秒ピッタリで止めよう！";
            text3.textContent = "STOP";


            startTime = performance.now();

            timerId = setInterval(() => {
                const elapsed = (performance.now() - startTime) / 1000;
                timerTime = startSeconds - elapsed;

                timer.textContent = timerTime.toFixed(2);
            }, 10);

            reactionArea.classList.add("waiting");
            startButton.classList.add("waiting");
            timer.classList.add("hidden");
            break;

        case "waiting":
            text1.textContent = "測定終了！";
            text2.textContent = "ボタンを押してリトライ";
            text3.textContent = "RETRY!";

            clearInterval(timerId);

            timer.classList.remove("hidden");
            reactionArea.classList.add("result");
            startButton.classList.add("result");
            break;
    }
}

function saveBestScore(score) {
    const savedScore = localStorage.getItem("stopBestScore");

    if (savedScore === null || Math.abs(score) < Math.abs(Number(savedScore))) {
        localStorage.setItem("stopBestScore", score);

    }
}


//実行動作
defo()
startButton.addEventListener("click", function () {
    const state = getState();
    if (state === "default" || state === "result") {
        changeState(state);
    } else if (state === "waiting") {
        changeState(state);
        saveBestScore(timerTime.toFixed(2));
        defo();
    }
});
