// alert("Hello!");
// array for hold btn color
var buttonColours = ["red", "blue", "green", "yellow"];

//array for game color sequence
var gamePattern = [];

//array for user click sequence
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

//detect keyboard presskey 
$(document).keypress(function(){
  if(!gameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

//detect click event
$(".btn").click(function(){
  //variable for clicked box 
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);// like ["red", " yellow"]
  playSound(userChosenColour);// plays the sound corresponds to that box
  animatePress(userChosenColour);
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

//function for answer check
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  }else {
    console.log("wrong");

    playSound("wrong");

    //adds the class to the selected element
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
  
}

//create the sequence for game
function nextSequence(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  //generate random no. [0 - 3]
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  // console.log(gamePattern);

  //flash animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

