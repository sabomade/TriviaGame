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

var question=[];
// var questionsAsked=[];

// FUNCTIONS
//=========================
function selectQuestion(arr){
    var numberOfItems = arr.length;
    // console.log("# of items in trivia "+ numberOfItems);
    
    var randomIndex = Math.floor(Math.random()*numberOfItems);
    // console.log("randomIndex: "+randomIndex);
    

    //parse keys:values from trivia[randomIndex]
    question = trivia[randomIndex];
    // console.log(question);
    if(question.asked === false){
        const quest = question.q;
        const ans = question.a;
        const xtra = question.info;

        console.log("question: ", quest);
        console.log("answer: ", ans);
        console.log("more info: ", xtra);

         //call displayQuestion
        displayQuestion(quest, ans, xtra);
    }else{
        trivia.splice(question);
        selectQuestion(trivia);
    }

    // //adds current question to new array
    // questionsAsked.push(question);
}

function displayQuestion(arg1, arg2, arg3){
    $(".question").html("<p>" + arg1+ "</p>");

    $("#affirmative").on("click", function(){
        if(arg2 === true){
            $("#affirmative").addClass("affirm");
            $("#negative").addClass("neutral");
            $("#more-info").html("<p>"+ arg3+ "</p>");
        }
        else if(arg2 === false){
            $("#affirmative").addClass("neg");
            $("#negative").addClass("affirm");
            $("#more-info").html("<p>"+ arg3+ "</p>");
        }
        //get next question
        selectQuestion(trivia);
    });

    $("#negative").on("click", function(){
        if(arg2 === true){
            $("#affirmative").addClass("neg");
            $("#negative").addClass("affirm");
            $("#more-info").html("<p>"+ arg3+ "</p>");
        }
        else if(arg2 === false){
            $("#affirmative").addClass("neutral");
            $("#negative").addClass("affirm");
            $("#more-info").html("<p>"+ arg3+ "</p>");
        }
        
        //get next question
        selectQuestion(trivia);      
    });
    

}




// MAIN PROCESS
//=========================
function start(){
    //clear button div
    $("#start").empty();
    //write start button to DOM
    var newBtn = $("<button>");
    newBtn.attr("id", "startBtn").addClass("btn btn-light").text("Start");
    newBtn.appendTo("#start");
    
    //on click hide button & call selectQuestion(arr)
    $("#startBtn").on("click", function(){
        $("#start").empty();
        selectQuestion(trivia);
    });

}