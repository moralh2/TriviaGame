var time = 0;                                   // time in seconds for timer
var intermission = 0                            // to know what kind of content is being displayed, and set the appropriate wait time
var wins = 0
var losses = 0
var questionNumber = 1;                         // current question
var intervalId;                                 // id for setInterval timer
var waitForUser = 14                            // seconds to wait for user to respond
var waitForMessage = 2                          // duration [s] for message in-between questions (correct or wrong answer)

// initial call; loads start button, waits for user
$(document).ready(function() { promptStart() });

// fnc for start button and initial display, awaiting user to click to begin the game
var promptStart = function() { displayStart("How about playing some trivia, and finding out?", "assets/images/bender-electric.gif", "Start Game") }

// fnc for game over, loads play-again btn
var gameOver = function() {
    head = "Game Over. Let's see how you did: " + wins + " right & " + losses + " wrong!"
    displayStart(head, "assets/images/bender-dancing.gif", "Play Again")
}

// reset variables for new game
var resetGame = function() {
    time = 0
    wins = 0
    losses = 0
    questionNumber = 1
}

// display card header content
var displayHeader = function(head) {
    var cardHeader = $(".card-header")
    cardHeader.empty()
    var qDiv = $("<h3>")
    qDiv.text(head)
    cardHeader.append(qDiv)
}

// display image in card body
var displayImage = function(image) {
    var cardBody = $(".card-body")
    cardBody.empty()
    imgBody = $('<img>',{id:'theImg',src: image})
    imgBody.addClass("img-fluid")
    cardBody.prepend(imgBody)
}

// display second image in card body
var displaySecondImage = function(image) {
    var cardBody = $(".card-body")
    // cardBody.empty()
    imgBody = $('<img>',{id:'theImg',src: image})
    imgBody.addClass("img-fluid")
    cardBody.append(imgBody)
}

// loads content for game start and game over (message, btn, gif)
var displayStart = function(head, image, footer) {
    displayHeader(head)
    displayImage(image)
    var cardFooter = $(".card-footer")
    cardFooter.empty()
    var strBtn = $("<button>")
    strBtn.addClass("btn").addClass("btn-primary").text(footer)
    strBtn.on( "click", function(event) {
        resetGame() 
        displayQuestion(questionNumber)
    });
    cardFooter.append(strBtn)
}

// fnc to load html w/ question and answers unto page; resets, starts timer
var displayQuestion = function(questionNumber) {
    intermission = 0
    curruentQuestion = String(questionNumber)
    displayHeader(trivia[curruentQuestion].question)

    var cardBody = $(".card-body")
    cardBody.empty()
    var answerArray = trivia[curruentQuestion].answers

    for (i = 0; i < answerArray.length; i++) {
        var ansDiv = $("<div>")
        ansDiv.addClass("alert").addClass("possible-answer").text(answerArray[i])
        ansDiv.on( "click", function(event) {
            verifyResponse($(this)[0].innerText)
        });
        cardBody.append(ansDiv)
    }
    timer.reset(waitForUser)
    timer.start()
}

// loads html content for in-between questions, with approproate message (win, loss, timeout) and gif
var displayIntermission = function(head, image) {
    displayHeader(head)
    displayImage(image)
    displaySecondImage(trivia[String(questionNumber)].gif)

}

// verify if user answered correctly or not at all, display meesage/gif for win, lose or
var verifyResponse = function(answerText) {
    if (answerText) {
        timer.stop()
        if (answerText == trivia[String(questionNumber)].correct) {
            wins++
            displayIntermission("You got it right!", "assets/images/bender-high-fives-self.gif")
        } else {
            losses++
            var messageWrong = "You got it wrong, brah! The correct answer was: " + trivia[String(questionNumber)].correct + "!"
            displayIntermission(messageWrong, "assets/images/bender-crying.gif")
        }
    }
    else {
        displayIntermission("You ran out of 🕰", "assets/images/bender-you-stink.gif")
        losses++
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
        correct: "Nibbler",
        gif: "assets/images/leele-and-nibblers.gif"
    },
    '2': {
        question: "What is Fry's favorite soft drink?",
        answers: ["Slurm", "Slurp", "Zero", "Zoorp"],
        correct: "Slurm",
        gif: "assets/images/fry-vending-machine.gif"
    },
    '3': {
        question: "What did the Professor's smelloscope detect in space?",
        answers: ["A planet made of cheese", "A comet", "A ball of garbage", "An alien ship"],
        correct: "A ball of garbage",
        gif: "assets/images/garbage-ball.jpg"
    },
    '4': {
        question: "What was at the top of the list of Bender's 10 most commonly used words?",
        answers: ["Chump", "Pimpmobile", "Ass", "Chumpette"],
        correct: "Ass",
        gif: "assets/images/bender-bite-shiny-metal-ass.gif"
    },
    '5': {
        question: "What's the name of the Professor's company?",
        answers: ["Federal Express", "Planet Express", "Earth Express", "Federal Express"],
        correct: "Planet Express",
        gif: "assets/images/planet-express.gif"
    },
    '6': {
        question: "What is the name of Captain Zapp's assistant?",
        answers: ["Yip", "Kif", "Zip", "Bif"],
        correct: "Kif",
        gif: "assets/images/kif-zap-fry.gif"
    },
    '7': {
        question: "What was the name of the space cruise ship that was destroyed by a black hole?",
        answers: ["The Mayflower One", "The Titanic", "The Enterprise", "Hunter IV"],
        correct: "The Titanic",
        gif: "assets/images/zap-titanic.gif"
    },
    '8': {
        question: "What was Fry's job in 1999?",
        answers: ["Pizza Delivery Boy", "Software Developer", "Candy Truck Driver", "Milkman"],
        correct: "Pizza Delivery Boy",
        gif: "assets/images/fry-pizza-beer.gif"
    },
    '9': {
        question: "What was Fry's bank account balance in 1999?",
        answers: ["33 Cents", "53 Cents", "73 Cents", "93 Cents"],
        correct: "93 Cents",
        gif: "assets/images/fry-rich-slob.gif"
    },
    '10': {
        question: "1000 years later, what was Fry's bank account balance?",
        answers: ["2.1 Million", "4.3 Billion", "6.5 Trillion", "6.2 Billion"],
        correct: "4.3 Billion",
        gif: "assets/images/bender-making-rain.gif"
    }
}