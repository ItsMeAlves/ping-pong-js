//Get all DOM elements to calculate ball movements
var playerLeft = document.querySelector('.player-left');
var playerRight = document.querySelector('.player-right');
var field = document.querySelector('.field-left');
var ball = document.querySelector('.ball');
var title = document.querySelector('.title');
var advise = document.querySelector('.advise');
var start = document.querySelector("#start");
var body = document.querySelector("body");
var timer = document.querySelector("#timer");
title.textContent = 'Sorry, you can never win :/'

//Create a time variable to hold the survival time
//And margin variable means a error margin to be sure when the player has lost
//Configure also the update rate of the ball movement by fps value
var time = 0;
var margin = 50;
var fps = 15;

//Configure the ball position
//And start listening the start button for kickoff
configure();
start.addEventListener("click", kickoff);

//A helper function to give random integer numbers different of 0 until a max delimiter
function randomize(max) {
	var signal = (Math.random() * 100) % 2? 1: -1;
	return parseInt(Math.random() * max) * signal + signal;
}

//When the mouse moves, it moves the player bar and the advise
window.addEventListener('mousemove', function(e) {
	playerLeft.style.top = (e.pageY - playerLeft.clientHeight/2) + 'px';
	advise.style.top = (playerLeft.offsetTop) + 'px';
});

//Kickoff removes the start button click listener and start moving the ball
function kickoff() {
	title.textContent = 'Sorry, you can never win :/'
	start.style.display = "none";
	start.removeEventListener("click", kickoff);
	configure();
	body.style.cursor = "none";
	moveBall(randomize(1)*8, randomize(1)*18);	
}

//Moves the ball recursively, using a incrementer for movement
//It updates the timer
function moveBall(topIncrementer, leftIncrementer) {
	time += fps;
	timer.textContent = "You survived for " + time + " ms";
	ball.center = (ball.offsetTop + ball.offsetTop + ball.clientHeight) / 2;

	//Moves the ball
	ball.style.left = (ball.offsetLeft + leftIncrementer) + 'px';
	ball.style.top = (ball.offsetTop + topIncrementer) + 'px';
	
	//Check if the ball touches the green field limits
	if(ball.offsetTop > field.offsetTop + field.clientHeight) topIncrementer *= -1;
	if(ball.offsetTop < field.offsetTop) topIncrementer *= -1;


	if(leftIncrementer < 0) {
		//Check if the ball is touching the left player
		//It it's true, it sends the ball in a reverse way, increasing its speed
		if(ball.center <= (playerLeft.offsetTop + playerLeft.clientHeight) && ball.center >= (playerLeft.offsetTop)) {
			if(ball.offsetLeft <= playerLeft.offsetLeft + playerLeft.clientWidth && ball.offsetLeft > playerLeft.offsetLeft) {
				leftIncrementer *= -1;
				leftIncrementer += 0.2 * (Math.abs(leftIncrementer)/leftIncrementer);
			} 
		}
	}
	else {
		//Check if the ball is touching the right player
		//It it's true, it sends the ball in a reverse way, increasing its speed
		if(ball.center <= (playerRight.offsetTop + playerRight.clientHeight) && ball.center >= (playerRight.offsetTop)) {
			if(ball.offsetLeft + ball.clientWidth >= playerRight.offsetLeft) {
				leftIncrementer *= -1;
				leftIncrementer += 0.2 * (Math.abs(leftIncrementer)/leftIncrementer);
			} 
		}
	}

	//Moves the right player (controlled by computer)
	playerRight.style.top = (ball.offsetTop - playerRight.clientHeight/2) + 'px';
	
	//Check if the player has lost the game
	if(ball.offsetLeft + ball.clientWidth + margin < playerLeft.offsetLeft) {
		//Prints some messages and reactivates the start button
		//Also, it restarts the timer
		title.textContent = 'I told you...';
		start.style.display = "inline-block";
		start.addEventListener("click", kickoff);
		body.style.cursor = "default";
		time = 0;
	}
	else {
		//If player did not lose, the game should continue
		setTimeout(moveBall, fps, topIncrementer, leftIncrementer);
	}
}

//Configure the ball to the center
function configure() {
	ball.style.top = '50%';
	ball.style.left = '50%';
}

