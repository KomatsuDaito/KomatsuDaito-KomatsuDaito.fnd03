"use strict";
// 1行目に記載している 'use strict' は削除しないでください


const reactionSavedScore = document.getElementById("reactionBestScore");
const clickSavedScore = document.getElementById("clickBestScore");
const stopSavedScore = document.getElementById("stopBestScore");
const memorySavedScore = document.getElementById("memoryBestScore");

if (localStorage.getItem("reactionBestScore") !== null) {
    reactionSavedScore.textContent = localStorage.getItem("reactionBestScore");
}

if (localStorage.getItem("clickBestScore") !== null) {
    clickSavedScore.textContent = localStorage.getItem("clickBestScore");
}

if (localStorage.getItem("stopBestScore") !== null) {
    stopSavedScore.textContent = localStorage.getItem("stopBestScore");
}
if (localStorage.getItem("memoryBestScore") !== null) {
    memorySavedScore.textContent = localStorage.getItem("memoryBestScore");
}