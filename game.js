/* game steps

1) Look for a keypress to start
2) Game over if click instead of keypress
3)Change H1 to Level 1
4) Select a random square out of the 4 and Animate with the appropriate sound effect and visual effect
5) Look for if square clicked matches to the random selected square
6) Do until end of level
7) Next level, change the H1
8) Generates +1 amount of random square selected in sequence
9) Animate & sound
10) Look for correct matching step by step, fail in one missmatches
*/

// set the button colours array
var buttonColours = ["red", "blue", "green", "yellow"];

//initialize an empty array for the game pattern
var gamePattern = [];

//create an empty user clicked pattern
var userClickedPattern = [];

//create a new variable named level that starts with 0

var level = 0;

//Keep track if it's the game's start

var started = false;

//listen for key press to start the game
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//record clicks

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern);
});

//Function that plays a sound

function playSound(name) {
  var colorSound = new Audio("./sounds/" + name + ".mp3");

  colorSound.play();
}

//Animation for user clicks

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Check answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Fail");

    var failSound = new Audio("./sounds/wrong.mp3");
    failSound.play();


    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}

//create a function that returns a random number
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}
