
var choice1 = "";
var choice2 = "";
var wins = 0;
var losses = 0;
var ties = 0;

var database = firebase.database();
var active = [];
var queued = [];



$("#nameSubmit").on("click", function(event){
    event.preventDefault();

    var name = $("#nameInput").val().trim();
    
    $("#nameInput").val("");
    $(".form-inline").hide();

    console.log(name);

    database.ref().set({
        name: name,
    })


});

$("#messageSubmit").on("click", function(event){
    event.preventDefault();

    var message = $("#messageInput").val().trim();
    
    $("#messageInput").val("");

    console.log(message);

    database.ref().set({
        message: message,
    })


});


$(document).on("click", ".choice", function(){

    $("#cpuChoice").empty();
    $("#chosenImage").empty();
    choice1= $(this).val();

    var imageURL = "assets/images/" + choice1 + ".png";    
    var imageChoice = $("<img>");

    imageChoice.attr("src", imageURL);
    imageChoice.attr("width", "100");
    $("#chosenImage").prepend(imageChoice);

    cpuChoice(choice1);

});

function cpuChoice(choice1){

     var choices = ["rock", "paper", "scissors", "lizard", "spock"] 
     var index = Math.floor(Math.random() * 5);

     choice2 = choices[index];
     var cpuURL = "assets/images/cpu" + choice2 + ".png";    
     var cpuChoice = $("<img>");

     cpuChoice.attr("src", cpuURL);
     cpuChoice.attr("width", "100");
     $("#cpuChoice").prepend(cpuChoice);       

     checkWinner(choice1, choice2);
}

function checkWinner(player1choice, player2choice){

    if (player1choice == "rock"){
        if(player2choice == "lizard" || player2choice == "scissors" ){
            wins++;
            $("#operator").text(">");
        }

        else if (player2choice != "rock") {
            losses++;
            $("#operator").text("<");
        }

        else {
            ties++;
            $("#operator").text("=");
        }

    }   /* end player1 rock */

    if (player1choice == "paper"){
        if(player2choice == "rock" || player2choice == "spock" ){
            wins++;
            $("#operator").text(">");
        }

        else if (player2choice != "paper") {
            losses++;
            $("#operator").text("<");
        }

        else {
            ties++;
            $("#operator").text("=");
        }
        
    }   /* end player1 paper */

    if (player1choice == "scissors"){
        if(player2choice == "paper" || player2choice == "lizard" ){
            wins++;
            $("#operator").text(">");
        }

        else if (player2choice != "scissors") {
            losses++;
            $("#operator").text("<");
        }

        else {
            ties++;
            $("#operator").text("=");        
        }
        
    }   /* end player1 scissors */

    if (player1choice == "lizard"){
        if(player2choice == "spock" || player2choice == "paper" ){
            wins++;
            $("#operator").text(">");
        }

        else if (player2choice != "lizard") {
            losses++;
            $("#operator").text("<");
        }

        else {
            ties++;
            $("#operator").text("=");
        }
        
    }   /* end player1 lizard */

    if (player1choice == "spock"){
        if(player2choice == "scissors" || player2choice == "rock" ){
            wins++;
            $("#operator").text(">");
        }

        else if (player2choice != "spock") {
            losses++;
            $("#operator").text("<");
        }

        else {ties++}
        
    }   /* end player1 spock */

    console.log(wins);
    console.log(losses);
    console.log(ties);


}


