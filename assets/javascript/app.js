// var answerArray = ["This is the first answer", "This is the second answer", "This is the third answer", "This is the fourth answer"]
// var timeInSeconds = "7"
var correctAnswer = "This is the second answer"

// save id for setInterval
var intervalId;


// save id for timer in between questions
var waitId;


$( document ).ready(function() {
    console.log( "ready!" );
    game("first")
});

var game = function(which) {

    var cardHeader = $(".card-header")
    cardHeader.empty()
    var qDiv = $("<h3>")
    var question = trivia[which].question
    qDiv.text(question)
    cardHeader.append(qDiv)

    var cardBody = $(".card-body")
    cardBody.empty()
    var answerArray = trivia[which].answers

    for (i = 0; i < answerArray.length; i++) {
        var ansDiv = $("<div>")
        ansDiv.addClass("alert")
        ansDiv.addClass("possible-answer")
        ansDiv.text(answerArray[i])
        ansDiv.on( "click", function(event) {
            which_one = $(this)[0].innerText  
            console.log( which_one )
            weveGotALiveOne(which_one)
        });
        cardBody.append(ansDiv)
    }

    timer.reset()
    timer.start()

}

var weveGotALiveOne = function(answerText) {
    if (answerText) {
        if (answerText == correctAnswer) {
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
    waitForNew.start()
}

// timer obj
var timer = {
    time: 15,
    reset: function() {
        timer.time = 15
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
            weveGotALiveOne()
        }
    }
}

var waitForNew = {
    time: 5,
    start: function() {
        waitId = setInterval(waitForNew.count, 1000);
    },
    stop: function() {
        clearInterval(waitId); 
    },
    count: function() {
        waitForNew.time--
        waitForNew.check()
    },
    check: function() {
        if (waitForNew.time <= 0) {
            waitForNew.stop()
            game("second")

            // nextQuestion()
        }
    },
}

// function to add inner html to card footer w info on time remaining
var displayTime = function(time) {
    var cardFooter = $(".card-footer")
    var timeRemaining = "<p>Time Remaining: <span>"+time+"</span> seconds</p>"
    cardFooter.html(timeRemaining)
}

// obj to store questions and answers
var trivia = {
    first: {
        question: "What is the name of Leela's Pet?",
        answers: ["This is the first answer", "This is the second answer", "This is the third answer", "This is the fourth answer"]
    },
    second: {
        question: "What is the name of Leela's OTHER Pet?",
        answers: ["This is the first AAnswer", "This is the second answer", "This is the third AAnswer", "This is the fourth AAnswer"]
    }
}