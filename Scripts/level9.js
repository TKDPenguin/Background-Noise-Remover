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
let currLevel = 9;

function spawnPigs() {
    for (let i = 0; i < numOfPigs; i++) {
        pigs[i] = new Pig(width*.76, height*.62-i*200, 25);
    }
}

function spawnBoxes() {
    boxes[0] = new Box(0.60*width, .95*height, 100, 100);
    boxes[1] = new Box(0.60*width, .85*height, 85, 35);
    boxes[2] = new Box(0.60*width, .6*height, 10, 150);
    boxes[3] = new Box(0.8*width, .75*height, 200, 95);
    boxes[4] = new Box(0.785*width, .6*height, 20, 95);
    boxes[5] = new Box(0.85*width, .6*height, 15, 95);
    boxes[6] = new Box(.8*width, .55*height, 200, 25);
}