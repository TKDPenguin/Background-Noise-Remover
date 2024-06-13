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
let currLevel = 8;

function spawnPigs() {
    for (let i = 0; i < numOfPigs - 1; i++) {
        pigs[i] = new Pig(width*.9+i*150, height*.4, 25);
    }
    pigs[1] = new Pig(width * .445 + 95, height*.5, 25)
}

function spawnBoxes() {
    boxes[0] = new Box(.5*width, .7*height, 250, 200);
    boxes[1] = new Box(0.50*width, .6*height, 250, 150);
    boxes[2] = new Box(.538*width, .5*height, 100, 135);
    boxes[3] = new Box(.457*width, .45*height, 30, 60);
    boxes[4] = new Box(.468*width, .45*height, 30, 40);
    boxes[5] = new Box(.51*width, .33*height, 240, 20);
    boxes[6] = new Box(.539*width, .3*height, 90, 80);
    boxes[7] = new Box(.9*width, .8*height, 300, 135);
}