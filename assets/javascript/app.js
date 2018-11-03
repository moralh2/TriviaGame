// used for timers
var time = 0;

// to know what kind of content is being displayed, and set the appropriate wait time
var intermission = 0

// user stats
var wins = 0
var losses = 0

// current question
var questionNumber = 1;

// id for setInterval timer
var intervalId;

// save id for timer in between questions
var waitId;
// try to use one timer

// seconds to wait for user to respond
var waitForUser = 14

// duration [s] for message in-between questions (correct or wrong answer)
var waitForMessage = 2

// initial call; loads start button, waits for user
$( document ).ready(function() {
    promptStart()
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

    var strBtn = $("<button>")
    strBtn.addClass("btn")
    strBtn.addClass("btn-primary")
    strBtn.text("Start Game")
    strBtn.on( "click", function(event) {
        displayQuestion(questionNumber)
    });
    cardFooter.append(strBtn)
}

var gameOver = function() {
    var cardHeader = $(".card-header")
    cardHeader.empty()
    
    var qDiv = $("<h3>")
    qDiv.text("Game Over. Let's see how you did: " + wins + " right & " + losses + " wrong")
    cardHeader.append(qDiv)

    var cardBody = $(".card-body")
    cardBody.empty()
    
    cardBody.prepend($('<img>',{id:'theImg',src:"assets/images/bender-dancing.gif"}))

    var cardFooter = $(".card-footer")
    cardFooter.empty()

    var strBtn = $("<button>")
    strBtn.addClass("btn")
    strBtn.addClass("btn-primary")
    strBtn.text("Play Again")
    strBtn.on( "click", function(event) {
        resetGame()
        displayQuestion(questionNumber)
    });
    cardFooter.append(strBtn)
}

var resetGame = function() {
    time = 0
    wins = 0
    losses = 0
    questionNumber = 1
    waitForUser--
}

// fnc to load html w/ question and answers unto page; resets, starts timer
var displayQuestion = function(questionNumber) {
    intermission = 0
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
            verifyResponse(which_one)
        });
        cardBody.append(ansDiv)
    }

    timer.reset(waitForUser)
    timer.start()
}

var rightAnswer = function() {
    var cardHeader = $(".card-header")
    cardHeader.empty()
    var qDiv = $("<h3>")
    var question = "You got it right!"
    qDiv.text(question)
    cardHeader.append(qDiv)
    var cardBody = $(".card-body")
    cardBody.empty()
    cardBody.prepend($('<img>',{id:'theImg',src:"assets/images/bender-high-fives-self.gif"}))
}

var wrongAnswer = function() {
    var cardHeader = $(".card-header")
    cardHeader.empty()
    var qDiv = $("<h3>")
    var question = "You got it wrong, brah"
    qDiv.text(question)
    cardHeader.append(qDiv)
    var cardBody = $(".card-body")
    cardBody.empty()
    cardBody.prepend($('<img>',{id:'theImg',src:"assets/images/bender-crying.gif"}))
}

var timedOut = function() {
    var cardHeader = $(".card-header")
    cardHeader.empty()
    var qDiv = $("<h3>")
    var question = "You ran out of 🕰"
    qDiv.text(question)
    cardHeader.append(qDiv)
    var cardBody = $(".card-body")
    cardBody.empty()
    cardBody.prepend($('<img>',{id:'theImg',src:"assets/images/bender-you-stink.gif"}))
}

var verifyResponse = function(answerText) {
    if (answerText) {
        if (answerText == trivia[String(questionNumber)].correct) {
            console.log("you win")
            wins++
            timer.stop()
            rightAnswer()
        } else {
            losses++
            console.log("you lose")
            timer.stop()
            wrongAnswer()
        }
    }
    else {
        console.log("time out")
        timedOut()
    }
    intermission = 1
    timer.reset(waitForMessage)
    timer.start()
}

// timer obj
var timer = {
    reset: function(resetTime) {
        time = resetTime
        if (!intermission) { displayTime(time) } 
    },
    stop: function() {
        clearInterval(intervalId); 
    },
    count: function() {
        time--
        if (intermission) {
            timer.checkIntermission()
        }
        else {
            displayTime(time)
            timer.check()
        }
    },
    start: function() {
        intervalId = setInterval(timer.count, 1000);
    },
    check: function() {
        if (time <= 0) {
            timer.stop()
            verifyResponse()
        }
    },
    checkIntermission: function() {
        if (time <= 0) {
            timer.stop()
            timer.reset(waitForUser)
            ++questionNumber
            if (questionNumber > 10) {
                console.log("Game Over")
                gameOver()
            }
            else {
                displayQuestion(questionNumber)
            }
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