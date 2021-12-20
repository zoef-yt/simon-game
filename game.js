var level = 0;
buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
function nextSequence() {
	userClickedPattern = [];

	var randomNumber = Math.floor(Math.random() * 4);
	randomChosenColour = buttonColors[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#" + randomChosenColour)
		.fadeIn(300)
		.fadeOut(300)
		.fadeIn(300);
	new Audio("sounds/" + randomChosenColour + ".mp3").play();

	$("h1").text("Level " + level);
	level++;
}

$(".btn").on("click", function () {
	$("#" + this.id).addClass("pressed");
	setTimeout(() => {
		$("#" + this.id).removeClass("pressed");
	}, 100);
	new Audio("sounds/" + this.id + ".mp3").play();
	userChosenColor = this.id;
	userClickedPattern.push(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function () {
	if (level === 0) {
		nextSequence();
		$("h1").text("Level " + level);
		level++;
	}
});

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		new Audio("sounds/wrong.mp3").play();
		$("body").addClass("game-over");
		$("h1").text("Game Over, Press Any Key to Restart");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
}
