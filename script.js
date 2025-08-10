let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(2, '0')
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        startStopButton.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-item';
        lapTime.textContent = formatTime(elapsedTime);
        lapsContainer.prepend(lapTime);
    }
}

startStopButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
