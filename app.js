let gameSeq = [];
let userSeq = [];
let highest = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');

document.addEventListener("keypress", function(){
    if(started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }

    
});

function btnFlash(btn){
     btn.classList.add("flash");

     setTimeout(function (){
        btn.classList.remove("flash");
     },250);
}

function userFlash(btn){
     btn.classList.add("userflash");

     setTimeout(function (){
        btn.classList.remove("userflash");
     },250);
}

function levelUp(){
    let h3 = document.querySelector('h3');
    h3.innerText = "";
    userSeq = [];
    level ++;
    
    // if(level != 1) Score(level);
    h2.innerText = `Level ${level}`;

    //random btn flash
    let randIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randomColor}`);

    // console.log(randIdx);
    // console.log(randomColor);
    // console.log(randBtn);

    gameSeq.push(randomColor);
    console.log(gameSeq);

    btnFlash(randBtn);
}

function checkAns(idx){
    // console.log("curr level:",level);
  
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){// last matched generate next by level up
            setTimeout(levelUp(),1000);
        }
    }
    else {
        h2.innerText = `Game Over! Press any Key to Start`;
        h2.style.color = "rgba(215, 68, 0, 1)";

        Score(level);

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "rgb(247, 226, 198)";
        },120);

        reset();

    }
}
function btnPress(){
    // console.log("Button was Pressed");
    // console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1 );
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}


function Score(level){
    highest.push(level - 1);// highest score
    let score = document.querySelector('.score');
    // score.innerText = `Your score is : ${level -1}`;

    let highscore = highest.reduce((ele,max) => {
        if(max < ele) return ele;
        else return max;
    })

    if(highscore != 0){
        score.innerText = `Your Curent Score is : ${level - 1} & Your Highest Score is : ${highscore}`;
    }

}