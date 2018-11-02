var answerArray = ["This is the first answer", "This is the second answer", "This is the third answer", "This is the fourth answer"]
// var timeInSeconds = "7"
var correctAnswer = "This is the second answer"

// save id for setInterval
var intervalId;


$( document ).ready(function() {
    console.log( "ready!" );
    var cardBody = $(".card-body")

    // var cardFooter = $(".card-footer")
    // var timeRemaining = "<p>Time Remaining: <span>"+timeInSeconds+"</span> seconds</p>"
    // cardFooter.html(timeRemaining)

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
});

var weveGotALiveOne = function(answerText) {
    if (answerText) {
        if (answerText == correctAnswer) {
            console.log("you win")
            timer.stop()
            //you win
        } else {
            console.log("you lose")
            // timer.stop()
            // you lose
        }
    }
    else {
        console.log("time out")
        // timeout
    }
}

var timer = {
    time: 30,
    reset: function() {
        timer.time = 30
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
        }
    }
}

var displayTime = function(time) {
    var cardFooter = $(".card-footer")
    var timeRemaining = "<p>Time Remaining: <span>"+time+"</span> seconds</p>"
    cardFooter.html(timeRemaining)
}