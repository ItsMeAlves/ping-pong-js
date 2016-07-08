var playerLeft = document.querySelector('.player-left');
var playerRight = document.querySelector('.player-right');
var field = document.querySelector('.field-left');
var ball = document.querySelector('.ball');
var title = document.querySelector('.title');
var advise = document.querySelector('.advise');
var start = document.querySelector("#start");
var body = document.querySelector("body");
var timer = document.querySelector("#timer");
var time = 0;
var margin = 50;

configure();
start.addEventListener("click", kickoff);

function randomize(max) {
	var signal = (Math.random() * 100) % 2? 1: -1;
	return parseInt(Math.random() * max) * signal + signal;
}

window.addEventListener('mousemove', function(e) {
	playerLeft.style.top = (e.pageY - playerLeft.clientHeight/2) + 'px';
	advise.style.top = (playerLeft.offsetTop) + 'px';
});

function kickoff() {
	title.textContent = 'Sorry, you can never win :/'
	start.style.display = "none";
	start.removeEventListener("click", kickoff);
	configure();
	body.style.cursor = "none";
	moveBall(randomize(1)*8, randomize(1)*18);	
}

function moveBall(topIncrementer, leftIncrementer) {
	time += 15;
	timer.textContent = "You survived for " + time + " ms";
	ball.center = (ball.offsetTop + ball.offsetTop + ball.clientHeight) / 2;

	if(ball.offsetTop > field.offsetTop + field.clientHeight) topIncrementer *= -1;
	if(ball.offsetTop < field.offsetTop) topIncrementer *= -1;

	if(leftIncrementer < 0) {
		if(ball.center <= (playerLeft.offsetTop + playerLeft.clientHeight) && ball.center >= (playerLeft.offsetTop)) {
			if(ball.offsetLeft <= playerLeft.offsetLeft + playerLeft.clientWidth && ball.offsetLeft > playerLeft.offsetLeft) {
				leftIncrementer *= -1;
				leftIncrementer += 0.2 * (Math.abs(leftIncrementer)/leftIncrementer);
			} 
		}
	}
	else {
		if(ball.center <= (playerRight.offsetTop + playerRight.clientHeight) && ball.center >= (playerRight.offsetTop)) {
			if(ball.offsetLeft + ball.clientWidth >= playerRight.offsetLeft) {
				leftIncrementer *= -1;
				leftIncrementer += 0.2 * (Math.abs(leftIncrementer)/leftIncrementer);
			} 
		}
	}

	ball.style.left = (ball.offsetLeft + leftIncrementer) + 'px';
	ball.style.top = (ball.offsetTop + topIncrementer) + 'px';

	playerRight.style.top = (ball.offsetTop - playerRight.clientHeight/2) + 'px';
	if(ball.offsetLeft + ball.clientWidth + margin < playerLeft.offsetLeft) {
		title.textContent = 'I told you...';
		start.style.display = "inline-block";
		start.addEventListener("click", kickoff);
		body.style.cursor = "default";
		time = 0;
	}
	else {
		setTimeout(moveBall, 15, topIncrementer, leftIncrementer);
	}
}


function configure() {
	ball.style.top = '50%';
	ball.style.left = '50%';
}

