var {Engine, Bodies, Mouse, MouseConstraint, Composite, Render, Runner, Constraint, Collision} = Matter;

var boxes = [];
var boundaries = [];
var pigs = [];
var shotBirds = [];
let bird, slingshot;
let world, engine, mConstraint, render, runner, constraint, collision;
let canvas, width, height;
let numOfShots = 3;
let numOfPigs = 2;
let index = 0;
let bodies = [];
let retryButton, nextButton, backButton, textBox;
let gameOver = false;
let currLevel = 5;

function spawnPigs() {
    for (let i = 0; i < numOfPigs; i++) {
        pigs[i] = new Pig(width*.69, height*.9-i*200, 25);
    }
}

function spawnBoxes() {
    boxes[0] = new Box(0.65*width, .95*height, 15, 95);
    boxes[1] = new Box(0.75*width, .95*height, 15, 95);
    boxes[2] = new Box(0.70*width, .8*height, 200, 25);
    boxes[3] = new Box(0.65*width, .75*height, 15, 95);
    boxes[4] = new Box(0.75*width, .75*height, 15, 95);
}