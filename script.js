var timer = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var rightWrong = document.querySelector("#right-wrong");

var q1 = {
    question: "Which is the coolest letter?",
    option: ["A","B","C","π"],
    correctAnswer: "π"
};

var q2 = {
    question: "Which is the biggest number?",
    option: ["5","6","7","888"],
    correctAnswer: "888"
};

var q3 = {
    question: "Which is the best soda?",
    option: ["Mountain \"heavenly\" Dew","Coca \"kaka\" Cola","Fanta \"holy CRAPPA\"","Dr Pepper (pretty sure it's a fake degree)"],
    correctAnswer: "Mountain \"heavenly\" Dew"
};

var q4 = {
    question: "How to code?",
    option: ["Groan like a pig","Type like a Chad","Whine like a baby","Cry like a drama queen"],
    correctAnswer: "Type like a Chad"
};

var q5 = {
    question: "Say my name!",
    option: ["OliOli","Holly Molly","Monopoly","Oligopoly"],
    correctAnswer: "OliOli"
};

var questionPool = [q1,q2,q3,q4,q5];
var randomPool = randomize(questionPool);
for (var i=0;i<5;i++) {
    randomPool[i].option = randomize(randomPool[i].option);
}

function randomize(array) {
    var length = array.length;
    var randomed = new Array(length);
    var deck = array;
    for (var i=0;i<length;i++) {
        randomIndex = Math.floor(Math.random()*deck.length);
        randomed[i] = deck[randomIndex];
        deck.splice(randomIndex,1);
    }
    return randomed;
}

var quizTime = 20;
var questionIndex = 0;
var quizArea = document.querySelector("#quiz-area");
var playerName = [];
var hiscoreList = [];
var hiscoreRanking = document.querySelector("#hiscore-players");
var hiscorePoints = document.querySelector("#hiscore-scores");
var resetButton = document.querySelector("#reset");

startButton.addEventListener("click",function(){
    countDown();
    startButton.style.display = "none";
});

function countDown() {
    displayQuestion(randomPool[questionIndex]);
    timer.textContent = quizTime;
    var timerInterval = setInterval(function() {
        
        if((quizTime <= 0) || (questionIndex>=(randomPool.length))) {
            clearInterval(timerInterval);
            quizArea.innerHTML = "";
            player = prompt("Game over! your final score is " + quizTime + "! Enter your name:");
            addPlayer((player !== null) && (player !== ""));
            storePlayer();
            displayPlayer();
            
            if (confirm("Play Again?")) {
                location.reload();
            } else {
                timer.style.display = "none";
            }
        }
        quizTime--;
        timer.textContent = quizTime;

    }, 1000);
}

function displayQuestion(qNum) {

    var questionTitle = document.createElement("h3");
    questionTitle.className = "added";
    questionTitle.textContent = qNum.question;
    quizArea.appendChild(questionTitle);

    for (var i=0;i<4;i++) {
        var optionButton = document.createElement("button");
        optionButton.textContent = qNum.option[i];
        if (optionButton.textContent==qNum.correctAnswer) {
            optionButton.className = "added-button correct";
        } else {
            optionButton.className = "added-button wrong";
        }
        quizArea.appendChild(optionButton);
    }
}

quizArea.addEventListener("click",function(event) {
    var element=event.target;
    if (element.matches(".added-button")) {
        rightWrong.setAttribute("style","border-top: 2px solid black");
        if (element.matches(".correct")) {
            rightWrong.textContent = "Correct!";
        } else {
            rightWrong.textContent = "Wrong!";
            quizTime -= 10;
        }
    }
    quizArea.innerHTML = "";
    questionIndex++;
    if ((questionIndex<randomPool.length) && (quizTime>0)) {
        displayQuestion(randomPool[questionIndex]);
    }
})

function storePlayer() {
    localStorage.setItem("player names", JSON.stringify(playerName));
    localStorage.setItem("player scores", JSON.stringify(hiscoreList));
}

function addPlayer(boolean) {
    index = 0;
    while(quizTime<hiscoreList[index]) {
        index++;
    }
    if (boolean){
        playerName.splice(index,0,player);
        hiscoreList.splice(index,0,quizTime);
    }
}

function init() {
    var storedHiscore = JSON.parse(localStorage.getItem("player scores"));
    if (storedHiscore !== null) {
      hiscoreList = storedHiscore;
    }
    var storedPlayer = JSON.parse(localStorage.getItem("player names"));
    if (storedPlayer !== null) {
        playerName = storedPlayer;
        displayPlayer();
    }
}

function displayPlayer() {
    hiscoreRanking.innerHTML = "";
    for (var i=0;i<playerName.length;i++) {
        var li = document.createElement("li");
        li.textContent = playerName[i];
        hiscoreRanking.appendChild(li);
    }

    hiscorePoints.innerHTML = "";
    for (var i=0;i<hiscoreList.length;i++) {
        var li = document.createElement("li");
        li.textContent = hiscoreList[i];
        hiscorePoints.appendChild(li);
    }
}

resetButton.addEventListener("click", function() {
    playerName = [];
    hiscoreList = [];
    localStorage.clear();
    displayPlayer();
});

init();