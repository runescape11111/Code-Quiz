var timer = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var rightWrong = document.querySelector("#right-wrong");

var q1 = {
    question: "Which is the biggest number?",
    option: [1,2,3,4],
    correctAnswer: 4
};

var q2 = {
    question: "Which is the biggest number?",
    option: [5,6,7,8],
    correctAnswer: 8
};

var q3 = {
    question: "Which is the best soda?",
    option: ["Mountain Dew","Coca Cola","Fanta","Dr Pepper"],
    correctAnswer: "Mountain Dew"
};

var q4 = {
    question: "How to code?",
    option: ["Groan","Type","Whine","Cry"],
    correctAnswer: "Type"
};

var q5 = {
    question: "Say my name!",
    option: ["OliOli","Holly Molly","Monopoly","Oligopoly"],
    correctAnswer: "OliOli"
};

questionPool = [q1,q2,q3,q4,q5];
console.log(questionPool);

var quizTime = 60;
var questionIndex = 0;
var quizArea = document.querySelector("#quiz-area");

startButton.addEventListener("click",function(){
    countDown();
    startButton.style.display = "none";
});

function countDown() {
    var timerInterval = setInterval(function() {
        timer.textContent = quizTime;
        
        if((quizTime <= 0) || (questionIndex>=(questionPool.length-1))) {
            clearInterval(timerInterval);
        }
        
        quizTime--;
    }, 1000);
    displayQuestion(questionPool[questionIndex]);
}

function displayQuestion(qNum) {

    var questionTitle = document.createElement("h3");
    questionTitle.className = "added";
    questionTitle.textContent = qNum.question;
    quizArea.appendChild(questionTitle);

    for (i=0;i<4;i++) {
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

        if (element.matches(".correct")) {
            rightWrong.textContent = "Correct!";
        } else {
            rightWrong.textContent = "Wrong!";
            quizTime -= 10;
        }
    }
    quizArea.innerHTML = "";
    questionIndex++;
    if (questionIndex<questionPool.length) {
        displayQuestion(questionPool[questionIndex]);
    }
})