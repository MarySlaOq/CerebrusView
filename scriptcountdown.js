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

const myBox = document.getElementById('myBox');
const myButton = document.getElementById('myButton');

myBox.addEventListener("click", event =>{
    event.target.style.backgroundColor = "tomato";
    event.target.textContent = "bite!!"

});

myBox.addEventListener("mouseover", event =>{
    event.target.style.backgroundColor = "yellow";
    event.target.textContent = "grrrr!!"

});
myBox.addEventListener("mouseout", event =>{
    event.target.style.backgroundColor = "aquamarine";
    event.target.textContent = "click me :e"

});