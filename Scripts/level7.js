var {Engine, Bodies, Mouse, MouseConstraint, Composite, Render, Runner, Constraint, Collision} = Matter;

var boxes = [];
var boundaries = [];
var pigs = [];
var shotBirds = [];
let bird, slingshot;
let world, engine, mConstraint, render, runner, constraint, collision;
let canvas, width, height;
let numOfShots = 3;
let numOfPigs = 6;
let index = 0;
let bodies = [];
let retryButton, nextButton, backButton, textBox;
let gameOver = false;
let currLevel = 7;

function spawnPigs() {
    for (let i = 0; i < 3; i++) {
        pigs[i] = new Pig(width*.69, height*.9-i*350, 25);
    }
    for (let i = 3; i < 6; i++) {
        pigs[i] = new Pig(width*.89, height*.9-(i-3)*350, 25);
    }
}

function spawnBoxes() {
    // tower 1
    boxes[0] = new Box(0.65*width, .95*height, 30, 200);
    boxes[1] = new Box(0.75*width, .95*height, 30, 200);
    boxes[2] = new Box(0.70*width, .8*height, 250, 10);
    boxes[3] = new Box(0.65*width, .6*height, 20, 200);
    boxes[4] = new Box(0.75*width, .6*height, 20, 200);
    boxes[5] = new Box(0.70*width, .4*height, 250, 10);
    boxes[6] = new Box(0.65*width, .3*height, 10, 200);
    boxes[7] = new Box(0.75*width, .3*height, 10, 200);
    boxes[8] = new Box(0.70*width, .1*height, 250, 10);
    
    // tower 2
    boxes[9] = new Box(0.85*width, .95*height, 30, 200);
    boxes[10] = new Box(0.95*width, .95*height, 30, 200);
    boxes[11] = new Box(0.90*width, .8*height, 250, 10);
    boxes[12] = new Box(0.85*width, .6*height, 20, 200);
    boxes[13] = new Box(0.95*width, .6*height, 20, 200);
    boxes[14] = new Box(0.90*width, .4*height, 250, 10);
    boxes[15] = new Box(0.85*width, .3*height, 10, 200);
    boxes[16] = new Box(0.95*width, .3*height, 10, 200);
    boxes[17] = new Box(0.90*width, .1*height, 250, 10);
}