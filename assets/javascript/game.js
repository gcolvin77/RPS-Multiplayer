
var choice1 = "";
var choice2 = "";
var wins = 0;
var losses = 0;
var ties = 0;

var database = firebase.database();
var message="";
var user= {};

$("#messageInput").hide();
$("#messageSubmit").hide();

/* connected.on("value", function(snap) {

if (snap.val()) {
    connectedUser = totalUsers.push(true);
    connectedUser.onDisconnect().remove();
}

});
 */

$("#nameSubmit").on("click", function(event){
    event.preventDefault();

     user = {
         name : $("#nameInput").val().trim(),
         selection: ""
    }
    
    $("#nameInput").val("");
    $(".form-inline").hide();
    $("#messageInput").show();
    $("#messageSubmit").show();   
    
    var ref = firebase.database().ref("active");
    ref.once("value")
        .then(function(snapshot){
         var activeUsers = snapshot.numChildren(); 
         console.log(activeUsers);

        if (activeUsers < 2){   //max 2 users in active
        database.ref("/active").push(user).onDisconnect().remove();
    }
        else {
        database.ref("/users").push(user).onDisconnect().remove();

    }
    
 }); //end snapshot for "active"      

});  //end name submit event


$("#messageSubmit").on("click", function(event){
    event.preventDefault();

    message = $("#messageInput").val().trim();
    
    $("#messageInput").val("");

    database.ref("/messages").push(user.name + ": " + message);

});  //end message submit

database.ref("/messages").on("child_added", function(childSnapshot, prevChildKey) {
   
    var newMessage = childSnapshot.val();
    $("#chat").append(newMessage + "<br>");

});  //end display messages

database.ref("/users").on("child_added", function(childSnapshot, prevChildKey) {
   
    var newUser = JSON.parse(JSON.stringify(childSnapshot.val()));

    $("#queue").append(newUser.name + "<br>");

});  //end display player queue


database.ref("/active").on("value", function(snapshot, prevChildKey) {
    $("#versus").empty();
    var currentPlayers = JSON.parse(JSON.stringify(snapshot.val()));
    var activeUsersCount = snapshot.numChildren();
    
    $("#versus").append("Active Players: <br>")

    $("#versus").append(Object.values(currentPlayers)[0].name +  "&nbsp;&nbsp;&nbsp;");
    
    $("#versus").append(Object.values(currentPlayers)[1].name);
    

    if (activeUsersCount < 2){
       var queuedUsers = database.ref("/users");
       var userNext = Object.values(queuedUsers)[0];
       console.log(userNext);
       delete queuedUsers[0]; 

    }

}); //end display active players


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


