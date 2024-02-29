
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = (window.innerWidth - 50);
canvas.height = (window.innerHeight - 50);
canvas.style.background = "#222222";
canvas.style.margin = "10px";


let ship = ["}{x}{"];
let shipCargo = ["}[=]{"];
let working = false;	// to show shipCargo

let origin = [(Math.floor(canvas.width / 2)), (Math.floor(canvas.height / 2))];
let x = origin[0];
let y = origin[1];
let speedMult = 1;
let xVel = 0;
let yVel = 0;
let deaths = 0;

// left, top, right, bottom
let hitbox = [x, (y-10), (x + 31), (y + 14)];

let pickupArea = [0, 0, 100, 100];
let dropoffArea = [canvas.width - 100, canvas.height - 100, 100, 100];

let topWall = [125, 0, 100, origin[1] + 100];
let botWall = [canvas.width - 225, canvas.height - (origin[1] + 100), 100, origin[1] + 100];

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

//staticFrame();

const resetCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "#aaffaa";
	ctx.strokeRect(pickupArea[0], pickupArea[1], pickupArea[2], pickupArea[3]);
	ctx.strokeRect(dropoffArea[0], dropoffArea[1], dropoffArea[2], dropoffArea[3]);
	ctx.strokeStyle = "#ffaaaa";
	ctx.strokeRect(topWall[0], topWall[1], topWall[2], topWall[3]);
	ctx.strokeRect(botWall[0], botWall[1], botWall[2], botWall[3]);
	working = false;
};

const collisions = () => {
	wallCollision();
	zoneCollision();
};

const zoneCollision = () => {
	if ((x + 33) < 100 && (y + 8) < 100) {
		//pickup();
		console.log('good');
		working = true;
	}
	if ((x + 31) > dropoffArea[0] && (y + 10) > dropoffArea[1]) {
		//dropoff();
		console.log('good');
		working = true;
	}
	
};

const wallCollision = () => {
	if (x < (topWall[2] + topWall[0]) && x > (topWall[0] - 31) && (y -10) < topWall[3]) {
		x = origin[0];
		y = origin[1];
	} else if (x < (botWall[0] + 100) && (x + 31) > botWall[0] && (y + 8) > botWall[1]) {
		x = origin[0];
		y = origin[1];
	}
};

const moveShip = () => {
	x += xVel;
	y += yVel;
};


const drawShip = () => {
	ctx.fillStyle = "#00ff00";
	if (!working) {
		ctx.fillText(ship, x, y);
	} else {
		ctx.fillText(shipCargo, x, y);
	}
};

const gameFrame = () => {
	resetCanvas();
	moveShip();
	collisions();
	drawShip();
};

setInterval(gameFrame, 2);
