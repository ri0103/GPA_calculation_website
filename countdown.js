const day = document.getElementById("day");
const hour = document.getElementById("hour");
const min = document.getElementById("min");
const sec = document.getElementById("sec");

let interval; // 修正: interval をグローバルで宣言

function countdown() {
  const now = new Date(); // 現在時刻を取得
  const targetDate = new Date(Date.UTC(2025, 2, 10, 1, 0)); // 学科分けの発表日付
  const diff = targetDate - now.getTime(); // 時間の差を取得（ミリ秒）

  if (diff <= 0) {
    clearInterval(interval);
    day.innerHTML = "00";
    hour.innerHTML = "00";
    min.innerHTML = "00";
    sec.innerHTML = "00";

    // .message クラスを持つ要素を非表示にする
    const messageDiv = document.querySelector('.message');
    if (messageDiv) {
        console.log("messageDiv found, hiding it.");
        messageDiv.style.display = 'none';
    } else {
        console.log("messageDiv not found.");
    }
    return;
  }

  // ミリ秒から単位を修正
  const calcDay = Math.floor(diff / 1000 / 60 / 60 / 24);
  const calcHour = Math.floor(diff / 1000 / 60 / 60) % 24;
  const calcMin = Math.floor(diff / 1000 / 60) % 60;
  const calcSec = Math.floor(diff / 1000) % 60;

  // 取得した時間を表示（2桁表示）
  day.innerHTML = calcDay < 10 ? '0' + calcDay : calcDay;
  hour.innerHTML = calcHour < 10 ? '0' + calcHour : calcHour;
  min.innerHTML = calcMin < 10 ? '0' + calcMin : calcMin;
  sec.innerHTML = calcSec < 10 ? '0' + calcSec : calcSec;
}

countdown();
interval = setInterval(countdown, 1000); // 修正: interval を適切なスコープで設定