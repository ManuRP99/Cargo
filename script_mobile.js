

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const textPicked = document.getElementById("points"); 
const textDroped = document.getElementById("actual-points"); 
const textLevel  = document.getElementById("level"); 

const up_ctrl = document.getElementById("up");
const down_ctrl = document.getElementById("down");
const left_ctrl = document.getElementById("left");
const right_ctrl = document.getElementById("right");


const legend = document.getElementById("legend");

canvas.width = (window.innerWidth - 50);
canvas.height = (window.innerHeight - 50);
canvas.style.background = "#222222";
canvas.style.margin = "10px";


let ship = ["}{x}{"];
let shipCargo = ["}[=]{"];
let working = false;	// to show shipCargo

let stages = ["#ff0000", "#ffff00", "#aaff00", "#00ff00"]

let origin = [(Math.floor(canvas.width / 2)), (Math.floor(canvas.height / 2))];
let x = origin[0];
let y = origin[1];
let speedMult = 1;
let xVel = 0;
let yVel = 0;
let lives = 3;

// left, top, right, bottom
let hitbox = [x, (y-10), (x + 31), (y + 14)];

let pickupArea = [0, 0, 100, 100];
let dropoffArea = [canvas.width - 100, canvas.height - 100, 100, 100];

let topWall = [125, 0, 10, origin[1] + 10];
let botWall = [origin[0] + 70, canvas.height - (origin[1] + 100), 10, origin[1] + 100];

// cargo numbers
let pickedCargo = 0;
let dropedCargo = 0;



// arrow keys event listeners
//

//
function moveUp() {
	yVel = -1;
	xVel = 0;
	console.log("asdfasdf");
}

function moveDown() {
	yVel = 1;
	xVel = 0;
	console.log("asdfasdf");
}


function moveLeft() {
	xVel = -1;
	yVel = 0;
	console.log("asdfasdf");
}

function moveRight() {
	xVel = 1;
	yVel = 0;
	console.log("asdfasdf");
}



const staticFrame = () => {

	ctx.fillStyle = "#00ff00";
	ctx.strokeStyle = "#ffffff";
	//ctx.strokeRect(x, y - 10, 31, 14);
	ctx.strokeRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);

	ctx.fillText(ship[0], x, y);

	y = y - 30;
	hitbox = [x, (y-10), 31, 14];

	ctx.fillText(shipCargo[0], x, y);

	ctx.strokeRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
	ctx.strokeStyle = "#aaffaa";
	ctx.strokeRect(pickupArea[0], pickupArea[1], pickupArea[2], pickupArea[3]);
	ctx.strokeRect(dropoffArea[0], dropoffArea[1], dropoffArea[2], dropoffArea[3]);
	ctx.strokeStyle = "#ffaaaa";
	ctx.strokeRect(topWall[0], topWall[1], topWall[2], topWall[3]);
	ctx.strokeRect(botWall[0], botWall[1], botWall[2], botWall[3]);
};
//
//staticFrame();

const resetCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "#aaffaa";
	ctx.strokeRect(pickupArea[0], pickupArea[1], pickupArea[2], pickupArea[3]);
	ctx.strokeRect(dropoffArea[0], dropoffArea[1], dropoffArea[2], dropoffArea[3]);

	ctx.fillStyle = "#000000";
	ctx.fillRect(pickupArea[0] + 10, pickupArea[1] + 10, pickupArea[2] - 20, pickupArea[3] - 20);
	ctx.fillRect(dropoffArea[0] + 10, dropoffArea[1] + 10, dropoffArea[2] - 20, dropoffArea[3] - 20);

	ctx.strokeStyle = "#ffaaaa";
	ctx.strokeRect(topWall[0], topWall[1], topWall[2], topWall[3]);
	ctx.strokeRect(botWall[0], botWall[1], botWall[2], botWall[3]);
	working = false;
	textPicked.innerHTML = pickedCargo;
	textDroped.innerHTML = dropedCargo;
	textLevel.innerHTML = speedMult;
};

const collisions = () => {
	wallCollision();
	zoneCollision();
	borderCollision();
	if (dropedCargo > 1000) {
		speedMult++;
		dropedCargo = 0;
	}
};

const zoneCollision = () => {

	if ((x + 33) < 100 && (y + 8) < 100) {
		//pickup();
		if (pickedCargo < 1200) {
			pickedCargo++;
			working = true;
		}

	}
	if ((x + 31) > dropoffArea[0] && (y + 10) > dropoffArea[1]) {
		//dropoff();
			if (pickedCargo > 0) {
			working = true;
			dropedCargo++;
			pickedCargo--;
		}
	}	
};

const wallCollision = () => {
	if (x < (topWall[2] + topWall[0]) && x > (topWall[0] - 31) && (y -10) < topWall[3]) {
		x = origin[0];
		y = origin[1];
		xVel = 0;
		yVel = 0;
		pickedCargo = 0;
		lives--;
	} else if (x < (botWall[0] + 10) && (x + 31) > botWall[0] && (y + 8) > botWall[1]) {
		x = origin[0];
		y = origin[1];
		xVel = 0;
		yVel = 0;
		pickedCargo = 0;
		lives--;
	}
};

const borderCollision = () => {
	if (x < 0 || (y - 10) < 0 || (x + 31) > canvas.width || (y + 8) > canvas.height) {
		x = origin[0];
		y = origin[1];
		xVel = 0;
		yVel = 0;
		pickedCargo = 0;
		lives--;
	}
};

const moveShip = () => {
	x += xVel * speedMult;
	y += yVel * speedMult;
};


const drawShip = () => {
	ctx.fillStyle = stages[lives];
	if (lives >= 0) {
		if (!working) {
			ctx.fillText(ship, x, y);
		} else {
			ctx.fillText(shipCargo, x, y);
		}
	} else {

	}
};


const gameFrame = () => {
	if (lives >= 0) {
		resetCanvas();
		moveShip();
		collisions();
		drawShip();
	} else {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#ff0000";
		ctx.fillText("GAME OVER", origin[0], origin[1]);

	}

};

setInterval(gameFrame, 8);
