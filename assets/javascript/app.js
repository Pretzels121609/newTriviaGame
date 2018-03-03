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




