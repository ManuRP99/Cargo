const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = (window.innerWidth - 50);
canvas.height = (window.innerHeight - 70);


let speedMult = 1;
//let ship = `}-${speedMult}-{`;
let ship = "}]x[{";
let cargo = '[=]';

// rn is at center of screen
let origin = [(Math.floor(canvas.width / 2)), (Math.floor(canvas.height / 2))];
let xVel = 0;
let yVel = 0;
let x = origin[0];
let y = origin[1];

function backToOrigin() {
	x = origin[0];
	y = origin[1];
	ctx.fillStyle = '#000000';
	ctx.fillRect(10, 10, 10000, 10000);
	score = 0;
	points.innerText = score;
	actualPoints.innerText = actualScore;
}


// arrow keys event listeners
document.body.addEventListener('keydown', (ev) => {
	if (ev.key == 'ArrowUp'){
		yVel = -1;
		xVel = 0;
	}
	if (ev.key == 'ArrowDown'){
		yVel = 1;
		xVel = 0;
	}
	if (ev.key == 'ArrowLeft'){
		xVel = -1;
		yVel = 0;
	}
	if (ev.key == 'ArrowRight'){
		xVel = 1;
		yVel = 0;
	}
});


// this prints the ship at origin
//ctx.fillStyle = '#00ff00';
//ctx.fillText(ship, origin[0], origin[1]);
//ctx.clearRect(x, y, 100, 100);


//border
function drawBorder() {
ctx.strokeStyle = '#ff0000';
ctx.strokeRect(10, 10, (canvas.width - 20), (canvas.height - 20));
}
//ctx.fillStyle = '#aaaaaa';
//ctx.fillRect(10, 10, (canvas.width - 20), (canvas.height - 20));
ctx.clearRect(10, 10, (canvas.width - 20), (canvas.height - 20));


ctx.strokeStyle = '#00ff00';

// collision with border
//
function borderCollision(x, y) {
	if (x < 10 || (x + 28) > (canvas.width - 20)) {
		console.log("X collision!");
		backToOrigin();
	}else if (y < 10 || (y + 15) > (canvas.height -20)) {
		console.log("Y collision!");
		backToOrigin();
	}
}


// goal region 
 
 function drawGoal() {
	ctx.strokeStyle = "#30aa30";
	ctx.strokeRect(10, 10, 100, 100);
 }

 function checkGoal(x, y) {
	if (10 < x && 10 < y && 110 > x && 110 > y) {
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Picking up cargo!", origin[0], (canvas.height - 15));
		showScore();
		ctx.fillText(cargo, (x + 5), (y + 22));
		
	}
 }

// drop points region

function drawotherGoal() {
	ctx.strokeStyle = "#aaffaa";
	ctx.strokeRect((canvas.width - 110), (canvas.height - 110), 100, 100);

}

 function checkAnotherGoal(x, y) {
	if ((canvas.width - 110) < x && (canvas.height - 110) < y/* && 110 > x && 110 > y*/) {
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Dropping cargo!", origin[0], (canvas.height - 15));
		showActualScore();
		ctx.fillText(cargo, (x + 5), (y + 22));

		
	}
 }
 // draw red areas
 function drawRedArea() {
	ctx.strokeStyle = "#ff0000";
	ctx.strokeRect(110, 10, 100, 400);
 }

 // check red area
 function checkRed(x, y) {
	if (110 < x && 10 < y && 210 > x && 410 > y) {
		backToOrigin();
		
	}
 }

const level = document.getElementById("level");
const points = document.getElementById("points");
const actualPoints = document.getElementById("actual-points");
let score = 0;
let actualScore = 0;
function showScore() {
	if (score < 1200) {
	score++;
	points.innerText = score;
	}
}

function showActualScore() {
	if (score > 0) {
		actualScore++;
		score--;

		actualPoints.innerText = actualScore;
		points.innerText = score;
		if (actualScore > 1000) {
			speedMult++;
			actualScore = 0;
		}
	}
}

function game() {
	ctx.clearRect(10, 10, (canvas.width - 20), (canvas.height - 20));
	const hitbox = [x, (y - 10), 28, 15];
	ctx.fillStyle = '#000000';
	//ctx.fillRect(x, (y - 10), 28, 15);
	ctx.fillRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
	//ctx.strokeRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
	x += xVel * speedMult;
	y += yVel * speedMult;
	ctx.strokeStyle = '#00ff00';
	ctx.strokeText(ship, x, y);
	drawBorder();
	drawGoal();
	drawotherGoal();
	checkAnotherGoal(hitbox[0], hitbox[1]);
	drawRedArea();
	checkRed(hitbox[0], hitbox[1]);
	checkGoal(hitbox[0], hitbox[1]);
	borderCollision(hitbox[0], hitbox[1]);
	level.innerText = speedMult;
}

setInterval(game, 4);


