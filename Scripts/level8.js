var {Engine, Bodies, Mouse, MouseConstraint, Composite, Render, Runner, Constraint, Collision} = Matter;

var boxes = [];
var boundaries = [];
var pigs = [];
var shotBirds = [];
let bird, slingshot;
let world, engine, mConstraint, render, runner, constraint, collision;
let canvas, width, height;
let numOfShots = 3;
let numOfPigs = 4;
let index = 0;
let bodies = [];
let retryButton, nextButton, backButton, textBox;
let gameOver = false;
let currLevel = 10;

function spawnPigs() {
    for (let i = 0; i < 4; i++) {
        pigs[i] = new Pig(width*.70, height*.9-i*180-25, 25);
    }
}

function spawnBoxes() {
    // tower 1
    boxes[0] = new Box(0.65*width, .95*height, 50, 180);
    boxes[1] = new Box(0.75*width, .95*height, 50, 180);
    boxes[2] = new Box(0.70*width, .85*height, 250, 10);
    boxes[3] = new Box(0.66*width, .75*height, 30, 180);
    boxes[4] = new Box(0.74*width, .75*height, 30, 180);
    boxes[5] = new Box(0.70*width, .65*height, 230, 10);
    boxes[6] = new Box(0.67*width, .55*height, 20, 180);
    boxes[7] = new Box(0.73*width, .55*height, 20, 180);
    boxes[8] = new Box(0.70*width, .45*height, 180, 10);
    boxes[9] = new Box(0.68*width, .35*height, 12, 150);
    boxes[10] = new Box(0.72*width, .35*height, 12, 150);
    boxes[11] = new Box(0.70*width, .25*height, 150, 10);
    
    // tower 2
}