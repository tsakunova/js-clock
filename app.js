const secondHands = document.querySelector('.second-hand');
const minsHands = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const hands = document.querySelectorAll('.hand');
const time = document.getElementById('time'),
  week = document.getElementById('week');
const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weekDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function setDate() {
  const now = new Date;

  const second = now.getSeconds();
  const secondDegrees = ((second / 60) * 360) + 90;
  secondHands.style.transform = `rotate(${secondDegrees}deg)`
  if (second === 0) {
    hands.forEach(hand => hand.style.transitionDuration = '0s');
  } else {
    hands.forEach(hand => hand.style.transitionDuration = '0.05s');
  }


  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + 90;
  minsHands.style.transform = `rotate(${minsDegrees}deg)`

  const hour = now.getHours();
  const hourDegrees = 0.5 * (hour * 60 + mins) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`
}

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    month = monthName[today.getMonth()],
    day = today.getDate(),
    year = today.getFullYear(),
    weekDay = weekDayName[today.getDay()]; //day of week 0-6
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  week.innerHTML = `${weekDay}<br>${day} ${month} ${year}`;
  if (min === 0 && sec === 0) {
    setBG();
  }
  setTimeout(showTime, 1000);
}

//add zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}

(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
    document.getElementById('slider').checked = false;
  } else {
    setTheme('theme-light');
    document.getElementById('slider').checked = true;
  }
})();

setInterval(setDate, 1000);
setDate();
showTime();