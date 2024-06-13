var {Engine, Bodies, Mouse, MouseConstraint, Composite, Render, Runner, Constraint, Collision} = Matter;

var boxes = [];
var boundaries = [];
var pigs = [];
var shotBirds = [];
let bird, slingshot;
let world, engine, mConstraint, render, runner, constraint, collision;
let canvas, width, height;
let numOfShots = 5;
let numOfPigs = 2;
let index = 0;
let bodies = [];
let retryButton, nextButton, backButton, textBox;
let gameOver = false;
let currLevel = 10;

function spawnPigs() {
    for (let i = 0; i < numOfPigs - 1; i++) {
        pigs[i] = new Pig(width*.9+i*150, height*.4, 25);
    }
    pigs[2] = new Pig(width * .44 + 95, height*.5, 25)
}

function spawnBoxes() {
    boxes[0] = new Box(.5*width, .7*height, 200, 200);
    boxes[1] = new Box(0.50*width, .6*height, 200, 150);
    boxes[2] = new Box(.538*width, .5*height, 80, 135);
    boxes[3] = new Box(.455*width, .45*height, 30, 60);
    boxes[4] = new Box(.458*width, .45*height, 30, 40);
    boxes[5] = new Box(.5*width, .33*height, 220, 20);
    boxes[6] = new Box(.539*width, .3*height, 90, 60);
    boxes[2] = new Box(.9*width, .5*height, 300, 135);
}