const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = (window.innerWidth - 50);
canvas.height = (window.innerHeight - 50);
canvas.style.background = "#222222";
canvas.style.margin = "10px";

let ship = ["}{x}{"];
let shipCargo = ["}[=]{"];

let origin = [(Math.floor(canvas.width / 2)), (Math.floor(canvas.height / 2))];
let x = origin[0];
let y = origin[1];

// left, top, right, bottom
let hitbox = [x, (y-10), 31, 14];

let pickupArea = [0, 0, 100, 100];
let dropoffArea = [canvas.width - 100, canvas.height - 100, 100, 100];

let topWall = [125, 0, 100, origin[1] + 100];
let botWall = [canvas.width - 225, canvas.height - (origin[1] + 100), 100, origin[1] + 100];


const game = () => {

	ctx.fillStyle = "#00ff00";
	ctx.strokeStyle = "#ffffff";
	//ctx.strokeRect(x, y - 10, 31, 14);
	ctx.strokeRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);

	ctx.fillText(ship[0], x, y);

	y = y - 30;
	hitbox = [x, (y-10), 31, 14];

	ctx.fillText(shipCargo[0], x, y);

	ctx.strokeRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
	ctx.strokeRect(pickupArea[0], pickupArea[1], pickupArea[2], pickupArea[3]);
	ctx.strokeRect(dropoffArea[0], dropoffArea[1], dropoffArea[2], dropoffArea[3]);
	ctx.strokeRect(topWall[0], topWall[1], topWall[2], topWall[3]);
	ctx.strokeRect(botWall[0], botWall[1], botWall[2], botWall[3]);
};

game();
