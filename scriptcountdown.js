//countdown stuff

const startingMinutes =60;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('minutes');

setInterval(updateCountdown, 1000);
function updateCountdown() {
    const minutes = Math.floor(time /60);
    let seconds = time % 60;
    
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`
    time--;
    
}

//mouse stuff

const myBox = document.getElementById('box1');

function changeColor(event){
    console.log(event);
}
myBox.addEventListener("click", callback);