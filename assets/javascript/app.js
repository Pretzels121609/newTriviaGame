//make a list of all the questions that will be used in the game
//make a list of all the answers to each question
//need buttons for each answer
//start button to start the game
//need a clock timer that counts down the time on each question
//need a function to determine if the answer is correct or not from user
//display to user if they got the question correct or not
//if no user imput, game moves on to the next question
//when there's no more questions game displays 'game over' over something to that effect
//at end of game it shows you all the correct, incorrect and unanswered questions 
//start over button that restarts the game


var gameQandA = [
    {
        q: "Who invented the wonderful candy known as Peeps?",
        o: ["Julia Childs", "Thom Fosse", "Unknown", "Sam Born"],
        a: "Sam Born"
    },

    {
        q: "In what city did Peeps first appear?",
        o: ["Seattle", "Boston", "New York City", "St. Louis"],
        a: "New York City"
    },
    
    {
        q: "How long does it take to make a Peep?",
        o: ["12 hours", "1 hour", "6 minutes", "30 minutes"],
        a: "6 minutes"
    },

    {
        q: "A single Peep has how many calories?",
        o: ["10", "27", "50", "32"],
        a: "32"
    },
    {
        q: "How many Peeps are made each DAY in the Bethlehem, Pennsylvania factory?",
        o: ["4.2 million", "Too many to count!", "1 million", "500,000"],
        a: "4.2 million"
    }   
]
var answers = [null, null, null, null, null]
var timer;

$(document).ready(function(){
    console.log("hello") 
    $("#start").on("click", function() {
        $("#start").addClass("hide")
        $("#gameContent, #timer").removeClass("hide")
        startTimer()
    })
    // $("#questionsAndAnswers").text("hello")
    $(document).on("click",".option", function(){
      console.log("click me")

        var selectedButton = $(this).text()
       
        console.log(selectedButton)

        // groupAttribute is the current button clicked's data-QAgroup 
        // the value of data-QAgroup is always a integer
        // use the interger as a position (aka as index) in the answers array
        var groupAttribute = $(this).attr("data-QAgroup")

        // find any button with the attribute data-QAgroup 
        // the value of QAgroup needs to be the value of the attribute of the button clicked which is groupAtrribute
        // when the buttons with the same attibute value are found remove the class selected
        //and then add it just to the button thatb was recently clicked
        $(`button[data-QAgroup="${groupAttribute}"]`).removeClass("selected");
        $(this).addClass("selected")

        console.log(groupAttribute)


        // update the place holder (null) at the position which is groupAttribute
        // replace 1 item at that position with the text from the current button clicked which is selectedButton
        answers.splice(groupAttribute,1,selectedButton)
        console.log(answers) 
    }) 
    $("#done").on("click", function(){
        clearInterval(timer);
        $("#gameContent").empty()
        finalScore();
    })  
    
    renderQandA() 
    
})

//this function makes the question <p> tag and the options <btn>

function renderQandA(){
    for (var i = 0; i < gameQandA.length; i++){
        //block of code
        console.log("current Object Index", i)
        console.log(gameQandA[i])

        var currentObject = gameQandA[i]

        var questionWrapper = $("<div>")
        var questionText = $("<p>")
        questionText.addClass("question")
        questionText.attr("data-QAgroup", i)
        var text = currentObject.q
        questionText.text(text)

        console.log(text)

        $(questionWrapper).append(questionText)
        $("#questionsAndAnswers").append(questionWrapper)



    //this is where the container is for all the buttons
        var optionsWrapper = $("<div>")
        optionsWrapper.addClass("btn-group")

    //this is where the options are for each question
    //create a button option for each option in the nested array
        for (var j = 0; j < currentObject.o.length; j++){
            var optionButton = $("<button>")
            optionButton.attr("data-QAgroup", i)
            optionButton.addClass("btn btn-primary option")
            optionButton.attr("type", "button")
            var buttonText = currentObject.o[j]
            optionButton.text(buttonText)

            $(optionsWrapper).append(optionButton)
        }
        $("#questionsAndAnswers").append(optionsWrapper)
    }
    
}

function finalScore(){
    var right = 0
    var wrong = 0
    var unanswered = 0

    for (var i = 0; i < answers.length; i++){
        var currentAnswer = answers[i]

        if (currentAnswer === null){
            unanswered++
        }
        else if (currentAnswer !== gameQandA[i].a){
            wrong++
        }
        else if (currentAnswer === gameQandA[i].a){
            right++
        }
    }

    var results = `<div>
                        <h2>correctly answered questions: ${right}</h2>
                        <h2>incorrectly answered questions: ${wrong}</h2>
                        <h2>unanswered questions: ${unanswered}</h2>
                    </div>`

    $("#results").append(results)

}

function startTimer(){
    var counter = 45
    $("#counter").text(counter)

    timer = setInterval(function(){ 
        //console.log("Hello"); 
        $("#counter").text("")
        --counter
        $("#counter").text(counter)
        if(counter === 0){
            clearInterval(timer);
            $("#gameContent").empty()
            finalScore()
        }

    }, 1000);
}




