// script.js
let workTime = document.getElementById("workTime").value * 60;
let shortBreakTime = document.getElementById("shortBreakTime").value * 60;
let longBreakTime = document.getElementById("longBreakTime").value * 60;

let currentSession = 'work';
let isRunning = false;
let interval;

const workSessionButton = document.getElementById("work-session");
const shortBreakButton = document.getElementById("short-break");
const longBreakButton = document.getElementById("long-break");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

function switchSession(session) {
    currentSession = session;
    stopTimer();

    if (session === 'work') {
        updateTimerDisplay(workTime);
        setActiveButton(workSessionButton);
    } else if (session === 'shortBreak') {
        updateTimerDisplay(shortBreakTime);
        setActiveButton(shortBreakButton);
    } else if (session === 'longBreak') {
        updateTimerDisplay(longBreakTime);
        setActiveButton(longBreakButton);
    }
}

function setActiveButton(activeButton) {
    workSessionButton.classList.remove('active');
    shortBreakButton.classList.remove('active');
    longBreakButton.classList.remove('active');

    activeButton.classList.add('active');
}

function updateTimerDisplay(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            let time;

            if (currentSession === 'work') {
                time = --workTime;
            } else if (currentSession === 'shortBreak') {
                time = --shortBreakTime;
            } else if (currentSession === 'longBreak') {
                time = --longBreakTime;
            }

            updateTimerDisplay(time);

            if (time <= 0) {
                stopTimer();
                alert(`${currentSession === 'work' ? 'Break' : 'Back to work'} time!`);
                switchSession(currentSession === 'work' ? 'shortBreak' : 'work');
            }
        }, 1000);
    }
}

function stopTimer() {
    isRunning = false;
    clearInterval(interval);
}

function resetTimer() {
    stopTimer();
    if (currentSession === 'work') {
        workTime = document.getElementById("workTime").value * 60;
        updateTimerDisplay(workTime);
    } else if (currentSession === 'shortBreak') {
        shortBreakTime = document.getElementById("shortBreakTime").value * 60;
        updateTimerDisplay(shortBreakTime);
    } else if (currentSession === 'longBreak') {
        longBreakTime = document.getElementById("longBreakTime").value * 60;
        updateTimerDisplay(longBreakTime);
    }
}

workSessionButton.addEventListener("click", () => switchSession('work'));
shortBreakButton.addEventListener("click", () => switchSession('shortBreak'));
longBreakButton.addEventListener("click", () => switchSession('longBreak'));

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

switchSession('work');
