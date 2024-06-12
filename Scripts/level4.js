var {Engine, Bodies, Mouse, MouseConstraint, Composite, Render, Runner, Constraint, Collision} = Matter;

var boxes = [];
var boundaries = [];
var pigs = [];
var shotBirds = [];
let bird, slingshot;
let world, engine, mConstraint, render, runner, constraint, collision;
let canvas, width, height;
let numOfShots = 3;
let numOfPigs = 1;
let index = 0;
let bodies = [];
let retryButton, nextButton, backButton, textBox;
let gameOver = false;
let currLevel = 4;

function spawnPigs() {
    for (let i = 0; i < numOfPigs; i++) {
        pigs[i] = new Pig(width*.69, height*.9, 25);
    }
}

function spawnBoxes() {
    boxes[0] = new Box(0.65*width, .95*height, 10, 95);
    boxes[1] = new Box(0.75*width, .95*height, 10, 95);
    boxes[2] = new Box(0.70*width, .8*height, 200, 25);
}