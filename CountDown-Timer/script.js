let countDown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds){
    //clear any existing timers
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        //check if we should stop 
        if(secondsLeft < 0){
            clearInterval(countDown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? "0" : ""}${minutes}:${remainderSeconds < 10 ? "0" : "" }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    console.log(minutes,remainderSeconds);
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const adjustedHours = hours > 12 ? hours - 12 : hours;
    endTime.textContent = `Be Back At ${adjustedHours < 10 ? "0" : ""}${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer(){
    // console.log(this.dataset.time);
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener("click",startTimer));

document.customForm.addEventListener("submit",function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});