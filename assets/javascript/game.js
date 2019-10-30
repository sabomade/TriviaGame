// once page has loaded, run script
$( document ).ready(function() {
    start();
});

// VARIABLES
//=========================
var trivia = [
    {
        q:"If you touch a baby bird it's mother will reject it",
        a:false,
        info:"Many birds have a limited sense of smell and cannot detect human scent, or if they can detect it, do not react to it",
        asked: false,
    },
    {
        q:"Goats have rectangular pupils",
        a:true,
        info:"This shape helps goats see 280 degrees around their bodies",
        asked: false,
    },
    {
        q:"The smallest bird in the world, the Bee Hummingbird, weighs less than a penny",
        a:true,
        info:"A penny weighs around 2.5 grams, a Bee Hummingbird weighs 1.6 - 2 grams",
        asked: false,
    },
    {
        q:"Camels store water in their humps",
        a:false,
        info:"They hold fat in the humps",
        asked: false,
    },
    {
        q:"Bulls are enraged by the colour red",
        a:false,
        info:"Bulls only see blues and yellow. They react to the movement of the red cape",
        asked: false,
    },
    {
        q:"Chimpanzees are nocturnal",
        a:false,
        info:"They are mostly active during daytime",
        asked: false,
    },
    {
        q:"Houseflies only live for around 24 hours",
        a:false,
        info:"They live for around 1 month",
        asked: false,
    },
    {
        q:"Sharks are mammals",
        a:false,
        info: "",
        asked: false,
    },
    {
        q:"An Octopus has 5 hearts",
        a:false,
        info:"They don't have five but three hearts",
        asked: false,
    },
    {
        q:"Touching a toad can give you warts",
        a:false,
        info:"Warts is a human virus. However some toads have poison on their skin so it's better to not touch them anyway",
        asked: false,
    },
];

var trivia2 = [
    {
        q:"If you touch a baby bird it's mother will reject it",
        a:false,
        info:"Many birds have a limited sense of smell and cannot detect human scent, or if they can detect it, do not react to it",
        asked: false,
    },
    {
        q:"Goats have rectangular pupils",
        a:true,
        info:"This shape helps goats see 280 degrees around their bodies",
        asked: false,
    },
];

var question=[];
var timePerQuest = 10;
var intervalId;
var questionsAsked = 0;
var questionsCorrect = 0;
var questionsWrong = 0;
var wasClicked = 0;

var tBtn = $("<button>");
var fBtn = $("<button>");


// FUNCTIONS
//=========================
function selectQuestion(arr){
    wasClicked = 0;
    console.log("wasClicked = ", wasClicked);
    var numberOfItems = arr.length;
    //console.log("# of items in array "+ numberOfItems);
    
    var randomIndex = Math.floor(Math.random()*numberOfItems);
    console.log("randomIndex: "+randomIndex);
    
    //parse keys:values from trivia[randomIndex]
    question = arr[randomIndex];
    console.log("current question: ", question);
    
    if(question.asked === false){
        //call displayQuestion
        displayQuestion(question);
    }else if(question.asked !== false & questionsAsked !== arr.length){
        //get a new question    
        selectQuestion(arr);
    }else{
        gameEnd();
    }
}

function displayQuestion(question){
    //set question.asked to true & increase counter
    question.asked = true;
    questionsAsked++;

    //clear more-info div
    $("#more-info").empty();

    //assign object properties to variables
    const quest = question.q;
    const answer = question.a;
    const info = question.info;
    const asked = question.asked;

    console.log("======== current question ========");
    console.log("question: ", quest);
    console.log("answer: ", answer);
    console.log("more info: ", info);
    console.log("asked: ", asked);
    

    //write question to DOM
    $(".question").html("<p>" + quest + "</p>");

    //on click of button ture or false
    $(".option").on("click", function(){
        if (wasClicked === 0){
            // wasClicked = 1;
            // console.log("this: ", this);
            const valueOfButton = $(this).children().attr('value');
            console.log("valueOfButton is " +  valueOfButton);
            console.log("======= end of question =======");
        
            //compares strings: ans = value of button clicked?
            if(String(answer) === valueOfButton){
            // $(this).children().addClass("affirm");
            changeClassAff($(this).children());
                $("#more-info").html("<p> Correct! <br>"+ info+ "</p>");
                questionsCorrect++;
            }
            else if(String(answer) !== valueOfButton){
                //$(this).children().addClass("neg");
                changeClassNeg($(this).children());
                $("#more-info").html("<p>Wrong! <br>"+ info+ "</p>");
                questionsWrong++;
            }
            wasClicked = 1;

            //wait 3 seconds before getting next question
            //so info can be displayed and read before being cleared.
            setTimeout(function() {
                selectQuestion(trivia2);
                }, 3000);
        }
    });

    //reset time for question
    // timePerQuest = 10;
    // timeStart();
}

function changeClassNeg(btn){
    btn.addClass("neg");
    setTimeout(function(){
        btn.removeClass("neg");
    }, 3000);
}

function changeClassAff(btn){
    btn.addClass("affirm");
    setTimeout(function(){
        btn.removeClass("affirm");
    }, 3000);
}

function timeStart(){
    if(!intervalId){
        intervalId = setInterval(decrement, 1000);
    };
}

function decrement(){
    timePerQuest--;
    console.log(timePerQuest);
    if(timePerQuest === 0){
        stop();
    }
}

function stop(){
    clearInterval(intervalId);
    intervalId = 0;

     //print message to DOM
     $("#readout").text("Time's Up!").addClass("gameOver");
     $("#readout").append("<br>Correct Answers: "+questionsCorrect);
     $("#readout").append("<br>Wrong Answers: "+questionsWrong);
}

function gameEnd(){
    //clear other elements on screen
    $("#start").empty();
    $("#readout").empty();
    $(".option").empty();
    $("#more-info").empty();
    
    //print message to DOM
    $("#readout").text("All questions answered. Game Over!").addClass("gameOver").append("<br>Correct Answers: "+questionsCorrect + "<br>Wrong Answers: "+questionsWrong);

}

// MAIN PROCESS
//=========================
function start(){
    //clear divs
    $("#start").empty();
    $("#readout").empty();
    $("#more-info").empty();

    //reset variables
    questionsAsked = 0;
    questionsCorrect = 0;
    questionsWrong = 0;

    //write instructions to DOM
    $("#readout").append("<p>You have 10 seconds to answer each question once you press START.  If you don't answer a question in time, you lose a point.</p>")

    //write start button to DOM
    var newBtn = $("<button>");
    newBtn.attr("id", "startBtn").addClass("btn btn-light").text("Start");
    newBtn.appendTo("#start");
    
    //on click hide button & call selectQuestion(arr)
    $("#startBtn").on("click", function(){
        $("#start").empty();

        selectQuestion(trivia2);
        // timeStart();

        //write true btn to DOM
        tBtn.attr("id", "affirmative").attr("value", "true").addClass("btn btn-info").text("True");
        tBtn.appendTo("#yes");
        //console.log("tBtn= ", tBtn.attr("value"));

        //write false btn to DOM
        fBtn.attr("id", "negative").attr("value", "false").addClass("btn btn-info").text("False");
        fBtn.appendTo("#no");
        //console.log("nBtn= ", fBtn.attr("value"));
    });

}