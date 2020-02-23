const ground  = document.querySelectorAll('.ground');
const enemy =  document.querySelectorAll('.enemy');
const scoreBoard = document.querySelector(".scoreBoard");
const popSound = document.querySelector("#pop");
const timeBoard = document.querySelector(".timeBoard");
const playBtn = document.querySelector(".playBtn");

let  isStart = false;
let prevRand;
let flagFinish = false;
let score = 0;
let timeText = 10;
let currTime = 10;
function randPosition(ground){
    const rand = Math.floor(Math.random() * ground.length);
    const currRand = ground[rand];
    if(currRand == prevRand){
        randPosition(ground);
    }
    prevRand = currRand;
    return currRand;
}

function timeRand(min, max){
    return Math.round(Math.random() *(max - min) +min);
}

function showEnemy(){
    const rand = randPosition(ground);
    const time = timeRand(500,1000);
    rand.classList.add('show');
    let child = rand.firstElementChild;
    randImage(child);
    // rand.firstElementChild.innerHTML.style.backgroundImage = "url(../img/SailorMoon.png)";
    setTimeout(() => {
        rand.classList.remove('show');
        if(!flagFinish){
            showEnemy();
        }
    }, time);
}

function startGame(){
    if(!isStart){
        isStart = true;
        flagFinish = false;
        score = 0; 
        scoreBoard.textContent = "Score :"+ score; 
        timeBoard.textContent="Time : 10";
        playBtn.style.display = "none";
        showEnemy();
        let timer = setInterval(setTimer,1000);
        setTimeout(() => {
            flagFinish=true;
            clearInterval(timer);
            currTime = 10;
            isStart = false;
            playBtn.style.display = "block";
        }, 10000);
    }
   
}

function randImage(a){
    let imgRand = Math.round(Math.random()*(5-1)+1);
    console.log("Random = "+imgRand);
    if(imgRand == 1)
        a.style.backgroundImage = "url('./img/animegirl1.png')";
    else if(imgRand == 2)
        a.style.backgroundImage = "url('./img/animegirl2.png')";
    
    else if(imgRand == 3)
        a.style.backgroundImage = "url('./img/AnimeGirl3.png')";
    
    else if(imgRand == 4)
        a.style.backgroundImage = "url('./img/animegirl4.png')";
    
    else if(imgRand == 5)
        a.style.backgroundImage = "url('./img/animegirl5.png')";
    else
        a.style.backgroundImage = "url('./img/miku.png')";
} 

function setTimer(){
    currTime--;
    timeBoard.textContent = "Time : "+currTime;
}

enemy.forEach(e => {
    e.addEventListener('click',hitEnemy);
});

function hitEnemy(){
    this.parentNode.classList.remove('show');
    score++;
    scoreBoard.textContent = "Score :"+ score;
    pop.play();
}
