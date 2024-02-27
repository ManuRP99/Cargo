const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = (window.innerWidth - 50);
canvas.height = (window.innerHeight - 70);

let ship = "}{x}{";
let shipCargo = "}[=]{"

let origin = [(Math.floor(canvas.width / 2)), (Math.floor(canvas.height / 2))];
let x = origin[0];
let y = origin[1];

// left, top, right, bottom
let hitbox = [x, (y-10), 31, 14];

let pickupArea = [0, 0, 100, 100];
let dropoffArea = [];

const game = () => {
	ctx.fillStyle = "#00ff00";
	ctx.strokeStyle = "#ffffff";
	//ctx.strokeRect(x, y - 10, 31, 14);
	ctx.strokeRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
	ctx.fillText(ship, x, y);

	y = y - 30;
	hitbox = [x, (y-10), 31, 14];

	ctx.fillText(shipCargo, x, y);
	ctx.strokeRect(hitbox[0], hitbox[1], hitbox[2], hitbox[3]);
	ctx.strokeRect(pickupArea[0], pickupArea[1], pickupArea[2], pickupArea[3]);
};

game();
