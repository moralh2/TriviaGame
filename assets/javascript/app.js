var answerArray = ["This is the first answer", "This is the second answer", "This is the third answer", "This is the fourth answer"]
var timeInSeconds = "7"

$( document ).ready(function() {
    console.log( "ready!" );
    var cardBody = $(".card-body")

    var cardFooter = $(".card-footer")
    var timeRemaining = "<p>Time Remaining: <span>"+timeInSeconds+"</span> seconds</p>"
    cardFooter.html(timeRemaining)

    for (i = 0; i < arr.length; i++) {
        var ansDiv = $("<div>")
        ansDiv.addClass("alert")
        ansDiv.addClass("possible-answer")
        ansDiv.text(arr[i])
        ansDiv.on( "click", function(event) {
            which_one = $(this)[0].innerText  
            console.log( which_one )
            weveGotALiveOne(which_one)
        });
        cardBody.append(ansDiv)
    }

    var weveGotALiveOne = function(answerText) {
        if (answerText) {
            if (answerText == correctAnswer) {
                //you win
            } else {
                // you lose
            }
        }
        else {
            // timeout
        }

    }
});