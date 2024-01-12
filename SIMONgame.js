let gameSeq = [];
let userSeq = [];
let btns =["red","yellow","blue","purple"];

let started = false;
let level = 0;
let highestScore =0;

let h2 = document.querySelector("h2");
let p =document.querySelector("p");


document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
     }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");   
    }, 250);
}


function levelUp(){
    userSeq=[];               // as our level update we update our userseq to empty//
    level++;

    h2.innerText =`level ${level}`;    
    // random btn choose//
    let randIdx = Math.floor(Math.random()*4);                       // to generate rand no.//
    let randColor = btns[randIdx];                                    // to access color using idx//
    let randbtn = document.querySelector(`.${randColor}`);              // give random class of btn//
   // console.log(randIdx);
   // console.log(randColor);
   // console.log(randbtn);
   gameSeq.push(randColor);
   console.log(gameSeq);
    btnflash(randbtn);

}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function checkAns(idx){                 // so we pass idx as same btn we want to check in userSeq//
    console.log(`curr level ${level}`);

   // let idx = level-1;//       // because here, userSeq is our idx that we want to check//
    if(gameSeq[idx]=== userSeq[idx]){
        if(gameSeq.length===userSeq.length){
            setTimeout(levelUp,1000);
        }
    }
else{
        h2.innerHTML=`Game Over!, Your Score is <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout( function(){
            document.querySelector("body").style.backgroundColor="white";
        },250);

        reset();
    }   
}

function btnpress(){
    //console.log(this);//
    if (started){                          // ?   started in braces//
    let btn = this;
    userflash(btn);
    userColor = btn.getAttribute("id");
   // console.log(userColor);//
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
}

let allbtns = document.querySelectorAll(".btn");
for(let btn of allbtns){
    btn.addEventListener("click",btnpress);
}

 function reset(){
    if(level>highestScore){
        highestScore = level;
        updateHighestScore();
    }

    gameSeq=[];
    userSeq=[];
    started=false;
    level=0;
 }

 function updateHighestScore(){
    let displayScore = document.querySelector("p");                                                   
    displayScore.innerText = `highest score  = ${highestScore}`
 }

