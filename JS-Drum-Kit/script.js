window.addEventListener("keydown",(e) => {
    // console.log(e.keyCode);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // get the corresponding keyCode present using data-key from audio tags, if not found then returns null
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); // get the keyCode using key class from audio tags
    // console.log(audio);
    if(!audio) return; // if we hit any other key than the specified key it will stop the function from running all together.
    audio.currentTime = 0; // to reset an ongoing audio play. rewind to start
    audio.play(); // play the audios.
    key.classList.add("playing");

    function removeTransition(e){
        if(e.propertyName !== "transform") return;//skip if it's not a transform
        this.classList.remove("playing");
    }

    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
        key.addEventListener("transitionend",removeTransition)
    });
});