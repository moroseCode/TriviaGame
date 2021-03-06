var time;  
var counter = 0;
var interval1;
var score = 0;
// - create object with all the questions
    // - each question will have an index, the actual question itself, possible answers, and the correct answer.
var questions = [
    {
        text: "What color are aircraft black boxes?",
        answers: ["Black", "Orange", "Red", "Blue"],
        correctAnswer: "Orange",
        used: false
    },
    {
        text: "What is the main ingredient of Bombay Duck?",
        answers: ["Duck", "Goose", "Fish", "Chicken"],
        correctAnswer: "Fish",
        used: false
    },
    {
        text: "How long (in miles) is Ninety Mile Beach in New Zealand?",
        answers: ["55", "90", "88", "104"],
        correctAnswer: "55",
        used: false
    },
    {
        text: "How many years did the 100 years war last?",
        answers: ["116", "100", "95", "80"],
        correctAnswer: "116",
        used: false
    },
    {
        text: "What kind of animal is the horned toad?",
        answers: ["Lizard", "Toad", "Frog", "Snake"],
        correctAnswer: "Lizard",
        used: false
    },
    {
        text: "From which country do French Fries originate?",
        answers: ["Belgium", "USA", "France", "England"],
        correctAnswer: "Belgium",
        used: false
    },
    {
        text: "What kind of animal is the firefly?",
        answers: ["Winged Beetle", "Flying Ant", "Fly", "Wasp"],
        correctAnswer: "Winged Beetle",
        used: false
    },
    {
        text: "Which country invented the Caesar salad?",
        answers: ["Mexico", "Italy", "Greece", "Spain"],
        correctAnswer: "Mexico",
        used: false
    },
    {
        text: "What kind of animal is the prairie dog?",
        answers: ["Rodent", "Canine", "Feline", "Hare"],
        correctAnswer: "Rodent",
        used: false
    },
    {
        text: "In which state was Tennessee Williams born?",
        answers: ["Mississippi", "Tennessee", "Kentucky", "Ohio"],
        correctAnswer: "Mississippi",
        used: false
    }
];

/*- create startGame function that will fill in the html template with the question and the possible answers (potentially randomized order to prevent cheating)
    - make a timer start as soon as the game starts
- player must either select an answer and submit to move on to the next question or have the time run out and move on to the next question
- the correct/incorrect message will render for 5 seconds and the correct answer will render regardless
    
*/
$(document).ready(function() {



    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        };

        return array;
    };

    function newQuestion() {
        if(counter >= questions.length) {
            $(".answerForm").html("<h2>Game Over</h2>");
            $(".answerForm").append("<p>Correct Answers: " + score + "</p>");
            $("<input type='submit' class='btn btn-light replay' value='Play Again' />" ).appendTo(".answerForm");
            $(document).on('click', ".replay", function(e){
                e.preventDefault();
                counter = 0;
                score = 0;
                clearScreen();
                startGame();
            });
        } else {
            $(".timer").html("Time Remaining: <span id='timeLeft'></span>")
            roundTimer();
            $(".question").html("<h2>" + questions[counter].text + "</h2>");
            arr = questions[counter].answers;
            arr = shuffle(arr);
            
            answerPop();
        };
    };

    function answerPop() {
        for(var i = 0; i < arr.length; i++){
            var ans = questions[counter].answers[i];
            $("<input type='radio' value='" + ans + "' name='answers'/>" + ans+  "<br>").appendTo(".answerForm");
        };
        $(".answerForm").css({"font-size": "1.5rem"})
        $("input[type='radio']").css({"margin-right": "1%", "margin-top": "-1px", "vertical-align": "middle"})
        $("<input type='submit' class='btn btn-info submit' value='Submit' />" ).appendTo(".answerForm");
        $(".btn").css({"background-color":"#AE89B3", "color": "#EEFFDE", "margin-top": "2%"})
    };

    function clearScreen() {
        $(".question").empty();
        $(".answerForm").empty();
        $(".timer").empty();
    };

    function roundTimer() {
        time = 10;
        interval1 = setInterval(function() {
            time--;
            if(time >= 0){
                $("#timeLeft").html(time);
            }
            if(time == 0){
                clearInterval(interval1);
                clearScreen();
                $(".answerForm").text("Correct answer is: " + questions[counter].correctAnswer).css("font-size", "2rem")

                counter++;
                $(".timer").html("<h1>Time Is Up</h1>");
                setTimeout(function(){
                    clearScreen()
                    newQuestion()
                }, 5000);
                

            }
        }, 1000);
      };

    function startGame() {
        newQuestion();
        clearInterval(time);
        $(document).on('click', ".submit", function(e){
            e.preventDefault();
            if($(".answerForm").find("input[name='answers']:checked").length == 0){
                $(".answerForm").append("<br><span style='color:red'>Please select an answer</span>");
            } else {
                var selectedAnswer = $("input[name='answers']:checked").val();
                console.log(questions[counter].correctAnswer);
                console.log(selectedAnswer);
                clearInterval(interval1);
                if(questions[counter].correctAnswer == selectedAnswer){
                    $(".timer").html("<h1>Correct!</h1>")
                    $(".question").text("Correct answer is: " + questions[counter].correctAnswer).css("font-size", "2rem")
                    $(".answerForm").empty()
                    counter++;
                    score++;
                    console.log("Correct!");
                    setTimeout(function(){
                        clearScreen()
                        newQuestion()
                    }, 5000);
                } else {
                    $(".timer").html("<h1>Incorrect</h1>")
                    $(".answerForm").text("Correct answer is: " + questions[counter].correctAnswer).css("font-size", "2rem")
                    counter++;
                    setTimeout(function(){
                        clearScreen()
                        newQuestion()
                    }, 5000);
                };
            };
        });
    };

    shuffle(questions);
    startGame();
});