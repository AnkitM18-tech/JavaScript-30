/* Get our elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* Build our functions */
function togglePlay(){
    const method = video.paused ? "play" : "pause";
    video[method]();
    /*
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    */
}

function updateButton(){
    const icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
}

function skip(){
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // console.log(e);
}

function handleRangeUpdate(){
    // console.log(this.value);
    // console.log(this.name);
    video[this.name] = this.value;
}

function handleProgressBar(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

/* Hook up event listeners */
video.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",handleProgressBar);
toggle.addEventListener("click",togglePlay);
skipButtons.forEach(button => button.addEventListener("click",skip));
ranges.forEach(range => range.addEventListener("change",handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove",handleRangeUpdate));

let mouseDown = false;
progress.addEventListener("click",scrub);
progress.addEventListener("mousemove",(e) => mouseDown && scrub(e));
progress.addEventListener("mousedown",() => mouseDown = true);
progress.addEventListener("mouseup",() => mouseDown = false);