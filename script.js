var timer = document.querySelector("#timer"); //the timer display
var startButton = document.querySelector("#start-button"); 
var rightWrong = document.querySelector("#right-wrong"); //the popup message that tells the user if they were correct
var quizArea = document.querySelector("#quiz-area");
var hiscoreRanking = document.querySelector("#hiscore-players");
var hiscorePoints = document.querySelector("#hiscore-scores");
var resetButton = document.querySelector("#reset");

//questions with options and answer keys
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
//randomizing the order of questions and their respective options
var randomPool = randomize(questionPool);
for (var i=0;i<5;i++) {
    randomPool[i].option = randomize(randomPool[i].option);
}

//set global timer, question index, player names and scores
var quizTime = 40;
var questionIndex = 0;
var playerName = [];
var hiscoreList = [];

//randomizing items in an array
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

//when clicking start button, the button disappears and countdown begins
startButton.addEventListener("click",function(){
    countDown();
    startButton.style.display = "none";
});

function countDown() {
    //display first question
    displayQuestion(randomPool[questionIndex]);
    timer.textContent = quizTime;

    //set coundown by 1-second intervals
    var timerInterval = setInterval(function() {
        
        //set condition for clearing interval, when questions run out or when timer reaches 0
        if((quizTime <= 0) || (questionIndex>=(randomPool.length))) {
            clearInterval(timerInterval);

            //deletes the quiz area to prevent further attempts at answering
            quizArea.innerHTML = "";
            player = prompt("Game over! your final score is " + quizTime + "! Enter your name:");
            //add player to hiscores ony if the player entered a non-empty name or didn't choose cancel
            addPlayer((player !== null) && (player !== ""));
            //local storage
            storePlayer();
            //display player on hiscores
            displayPlayer();
            
            //prompt to ask if play again, if yes then refresh page, if no then simply hide timer
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

//display a specific question in the queue depending on question index
function displayQuestion(qNum) {

    //display the question
    var questionTitle = document.createElement("h3");
    questionTitle.className = "added";
    questionTitle.textContent = qNum.question;
    quizArea.appendChild(questionTitle);

    //display each of the 4 options
    for (var i=0;i<4;i++) {
        var optionButton = document.createElement("button");
        optionButton.textContent = qNum.option[i];

        //determine if each option is the correct one, and assign respective classes
        if (optionButton.textContent==qNum.correctAnswer) {
            optionButton.className = "added-button correct";
        } else {
            optionButton.className = "added-button wrong";
        }
        quizArea.appendChild(optionButton);
    }
}

//when clicking the quiz area
quizArea.addEventListener("click",function(event) {

    var element=event.target;

    //target the buttons only
    if (element.matches(".added-button")) {
        //check if the button has the correct answer, and print the corresponding message
        if (element.matches(".correct")) {
            rightWrong.textContent = "Correct!";
        } else {
            rightWrong.textContent = "Wrong!";
            //penalty of picking wrong answer, timer -10s
            quizTime -= 10;
        }
    }

    //removes current question, add 1 to question index, and display next question if there's time AND questions left
    quizArea.innerHTML = "";
    questionIndex++;
    if ((questionIndex<randomPool.length) && (quizTime>0)) {
        displayQuestion(randomPool[questionIndex]);
    }
})

//add the player to hiscores should they choose to
function addPlayer(boolean) {
    if (boolean){
        //check for where to insert the player/score depending on rank
        index = 0;
        while(quizTime<hiscoreList[index]) {
            index++;
        }
        //separate storage for player name and score, a random choice
        playerName.splice(index,0,player);
        hiscoreList.splice(index,0,quizTime);
    }
}

//local storage of player name and score
function storePlayer() {
    localStorage.setItem("player names", JSON.stringify(playerName));
    localStorage.setItem("player scores", JSON.stringify(hiscoreList));
}

//initialize page when refreshed, and display hiscore
function init() {

    //retrieve local storage to update hiscore list
    var storedHiscore = JSON.parse(localStorage.getItem("player scores"));
    if (storedHiscore !== null) {
      hiscoreList = storedHiscore;
    }
    var storedPlayer = JSON.parse(localStorage.getItem("player names"));
    if (storedPlayer !== null) {
        playerName = storedPlayer;
    }
    displayPlayer();
}

//print player name and score on hiscore, separately
function displayPlayer() {
    //for player name
    hiscoreRanking.innerHTML = "";
    for (var i=0;i<playerName.length;i++) {
        var li = document.createElement("li");
        li.textContent = playerName[i];
        hiscoreRanking.appendChild(li);
    }

    //for player score
    hiscorePoints.innerHTML = "";
    for (var i=0;i<hiscoreList.length;i++) {
        var li = document.createElement("li");
        li.textContent = hiscoreList[i];
        hiscorePoints.appendChild(li);
    }
}

//removes hiscore when clicking reset
resetButton.addEventListener("click", function() {

    //clears variable, local storage, and display the new empty list
    playerName = [];
    hiscoreList = [];
    localStorage.clear();
    displayPlayer();
});

init();