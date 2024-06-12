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
let currLevel = 3;

function spawnPigs() {
    for (let i = 0; i < numOfPigs; i++) {
        pigs[i] = new Pig(width*.69, height*.3, 25);
    }
}

function spawnBoxes() {
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 7; i++) {
            boxes[7*j+i] = new Box(0.75*width-j*50, .95*height-i*76, 50, 75);
        }
    }
}
