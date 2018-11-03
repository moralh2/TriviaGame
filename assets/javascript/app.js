// global for time
var time = 0;

var questionNumber = 1;

// save id for setInterval
var intervalId;

// save id for timer in between questions
var waitId;

// how long to wait for user to answer
var waitForUser = 20

// duration of message in-between questions
var waitForMessage = 5

$( document ).ready(function() {
    console.log( "ready!" );
    promptStart()
    // triviaGame.displayQuestion(questionNumber)
    // game(questionNumber)
    // load a start button on lead
    // btn triggers game to start as new
});

// fnc for start button and initial display, awaiting user to click to begin the game
var promptStart = function() {
    var cardHeader = $(".card-header")
    cardHeader.empty()
    var qDiv = $("<h3>")
    qDiv.text("How about playing some trivia, and finding out?")
    cardHeader.append(qDiv)

    var cardBody = $(".card-body")
    cardBody.empty()
    cardBody.prepend($('<img>',{id:'theImg',src:"assets/images/bender-electric.gif"}))

    var cardFooter = $(".card-footer")
    cardFooter.empty()

    var timeRemaining = "<p>Time Remaining: <span>"+time+"</span> seconds</p>"


    var strBtn = $("<button>")
    strBtn.addClass("btn")
    strBtn.addClass("btn-primary")
    strBtn.text("Start Game")
    strBtn.on( "click", function(event) {
        console.log( "Starting a new game" )
        triviaGame.displayQuestion(questionNumber)

    });
    cardFooter.append(strBtn)
}

var triviaGame = {
    questionNumber: 1,
    intervalId: '',
    displayQuestion: function(questionNumber) {
        curruentQuestion = String(questionNumber)

        var cardHeader = $(".card-header")
        cardHeader.empty()
        var qDiv = $("<h3>")
        var question = trivia[curruentQuestion].question
        qDiv.text(question)
        cardHeader.append(qDiv)
    
        var cardBody = $(".card-body")
        cardBody.empty()
        var answerArray = trivia[curruentQuestion].answers
    
        for (i = 0; i < answerArray.length; i++) {
            var ansDiv = $("<div>")
            ansDiv.addClass("alert")
            ansDiv.addClass("possible-answer")
            ansDiv.text(answerArray[i])
            ansDiv.on( "click", function(event) {
                which_one = $(this)[0].innerText  
                console.log( which_one )
                triviaGame.verifyResponse(which_one)
            });
            cardBody.append(ansDiv)
        }
    
        timer.reset()
        timer.start()
    },
    wrongAnswer: function() {
        var cardHeader = $(".card-header")
        cardHeader.empty()
        var qDiv = $("<h3>")
        var question = "You got it wrong, brah"
        qDiv.text(question)
        cardHeader.append(qDiv)
    
        var cardBody = $(".card-body")
        cardBody.empty()
    
        cardBody.prepend($('<img>',{id:'theImg',src:"assets/images/bender-crying.gif"}))
    },
    verifyResponse: function(answerText) {
        if (answerText) {
            if (answerText == trivia[String(questionNumber)].correct) {
                console.log("you win")
                timer.stop()
                //you win
            } else {
                console.log("you lose")
                timer.stop()
                // you lose
            }
        }
        else {
            console.log("time out")
            // timeout
        }
        triviaGame.wrongAnswer()
        waitForNew.start()
    }

}


// timer obj
var timer = {
    time: waitForUser,
    reset: function() {
        timer.time = waitForUser
        displayTime(timer.time)
    },
    stop: function() {
        clearInterval(intervalId); 
    },
    count: function() {
        timer.time--
        displayTime(timer.time)
        timer.check()
    },
    start: function() {
        intervalId = setInterval(timer.count, 1000);
    },
    check: function() {
        if (timer.time <= 0) {
            timer.stop()
            triviaGame.verifyResponse()
        }
    }
}

var waitForNew = {
    time: waitForMessage,
    start: function() {
        waitId = setInterval(waitForNew.count, 1000);
    },
    stop: function() {
        clearInterval(waitId); 
    },
    reset: function() {
        waitForNew.time = waitForMessage
    },
    count: function() {
        waitForNew.time--
        waitForNew.check()
    },
    check: function() {
        if (waitForNew.time <= 0) {
            waitForNew.stop()
            waitForNew.reset()
            ++questionNumber
            if (questionNumber > 10) {
                console.log("Game Over")
            }
            else {
                triviaGame.displayQuestion(questionNumber)
            }
            // game(questionNumber)

            // nextQuestion()
        }
    },
}

// function to add inner html to card footer w info on time remaining
var displayTime = function(time) {
    var cardFooter = $(".card-footer")
    cardFooter.empty()
    var timeRemaining = "<p>Time Remaining: <span>"+time+"</span> seconds</p>"
    cardFooter.html(timeRemaining)
}

// obj to store questions and answers
var trivia = {
    '1': {
        question: "What is the name of Leela's Pet?",
        answers: ["Nobber", "Mibbler", "Nubben", "Nibbler"],
        correct: "Nibbler"
    },
    '2': {
        question: "What is Fry's favorite soft drink?",
        answers: ["Slurm", "Slurp", "Zero", "Zoorp"],
        correct: "Slurm"
    },
    '3': {
        question: "What did the Professor's smelloscope detect in space?",
        answers: ["A planet made of cheese", "A comet", "A ball of garbage", "An alien ship"],
        correct: "A ball of garbage"
    },
    '4': {
        question: "What was at the top of the list of Bender's 10 most commonly used words?",
        answers: ["Chump", "Pimpmobile", "Ass", "Chumpette"],
        correct: "Ass"
    },
    '5': {
        question: "What's the name of the Professor's company?",
        answers: ["Federal Express", "Planet Express", "Earth Express", "Federal Express"],
        correct: "Planet Express",
    },
    '6': {
        question: "What is the name of Captain Zapp's assistant?",
        answers: ["Yip", "Kif", "Zip", "Bif"],
        correct: "Kif"
    },
    '7': {
        question: "What was the name of the space cruise ship that was destroyed by a black hole?",
        answers: ["The Mayflower One", "The Titanic", "The Enterprise", "Hunter IV"],
        correct: "The Titanic"
    },
    '8': {
        question: "What was Fry's job in 1999?",
        answers: ["Pizza Delivery Boy", "Software Developer", "Candy Truck Driver", "Milkman"],
        correct: "Pizza Delivery Boy"
    },
    '9': {
        question: "What was Fry's bank account balance in 1999?",
        answers: ["33 Cents", "53 Cents", "73 Cents", "93 Cents"],
        correct: "93 Cents"
    },
    '10': {
        question: "1000 years later, what was Fry's bank account balance?",
        answers: ["2.1 Million", "4.3 Billion", "6.5 Trillion", "6.2 Billion"],
        correct: "4.3 Billion"
    }
}