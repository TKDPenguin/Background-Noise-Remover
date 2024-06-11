const {Engine, Bodies, Mouse, MouseConstraint, Composite, Render, Runner, Constraint, Collision} = Matter;

const boxes = [];
const boundaries = [];
const shotBirds = [];
let bird, pig, slingshot;
let world, engine, mConstraint, render, runner, constraint, collision;
let canvas, width, height;
let numOfShots = 3;
let numOfPigs = 1;
let index = 0;
let bodies = [];
let retryButton, nextButton, backButton, textBox;
let gameOver = false;

function setup() {
    canvas = document.querySelector('canvas');
    width = window.innerWidth;
    height = window.innerHeight * .95;
    console.log(width);
    console.log(height);
    canvas.width = width;
    canvas.height = height;
    engine = Engine.create();
    engine.gravity.y = .7;
    world = engine.world;
    for (let i = 0; i < 3; i++) {
        boxes[i] = new Box(0.75*width, height-75-i*75, 50, 75);
    }
    boundaries[0] = new staticBox(width+25, height/2, 50, height);
    boundaries[1] = new staticBox(width/2, -25, width, 50);
    boundaries[2] = new staticBox(-25, height/2, 50, height);
    boundaries[3] = new staticBox(width/2, height+25, width, 50);

    pig = new Pig(.75*width-50, height-50, 25);

    bird = new Bird(width*.12, height*.85, 15);

    slingshot = new Slingshot(width*.12, height*.85, bird.body);

    const mouse = Mouse.create(canvas.elt);
    console.log(mouse);
    const options = {
        mouse: mouse,
        constraint: {
            render: {
                visible: false
            }
        },
        collisionFilter: {
            mask: 0b1
        }
    }
    mConstraint = MouseConstraint.create(engine, options);
    Composite.add(world, mConstraint);
    render = Render.create({
        element: document.body,
        canvas: canvas,
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: 'rgb(255,255,255)'
        }
    });
    runner = Runner.create();
}

onmouseup = (event) => {
    for (let i = 0; i < bodies.length; i++) {
        if (bodies[i] == bird.body & mConstraint.mouse.collisionFilter != 2) {
            setTimeout(() => {
                slingshot.fly();
                bird.body.collisionFilter.category = 0b10;
                shotBirds[index++] = bird;
            }, 12);
            if (--numOfShots > 0) {
                setTimeout(() => {
                    bird = new Bird(width*.12, height*.85, 15);
                    slingshot.attach(bird.body);
                }, 1000);
            }       
        }
    }
}

onmousedown = (event) => {
    bodies = Matter.Query.point(Composite.allBodies(world), {x: mConstraint.mouse.position.x, y: mConstraint.mouse.position.y});
    if (mConstraint.mouse.collisionFilter == 2) {
        for (let i = 0; i < bodies.length; i++) {
            if (bodies[i] == retryButton.body) {
                reloadLevel();
            } else if (bodies[i] == backButton.body) {
                backtoTitle();
            } else if (nextButton != null && bodies[i] == nextButton.body) {
                nextLevel();
            }
        }
    }
}

// onkeydown = (event) => {
//     if (event.key == ' ') {
//         bird = new Bird(width*.1, height*.82, 15);
//         slingshot.attach(bird.body);
//     }
// }

function checkCollisions() {
    for (let i = 0; i < shotBirds.length; i++) {
        if (Collision.collides(pig.body, shotBirds[i].body) != null && gameOver == false) {
            pig.die();
            --numOfPigs;
        }
    }
    for (let i = 0; i < boxes.length; i++) {
        if (Collision.collides(boxes[i].body, pig.body) != null && boxes[i].body.speed > 1.00) {
            setTimeout(() => {
                pig.die();
            }, 200);
            --numOfPigs;
        }
    }
    if (numOfPigs <= 0) {
        win();
    }
    else if (numOfShots <= 0) {
        lose();
    }
}

function win() {
    console.log("You win!!");
    mConstraint.mouse.collisionFilter = 2;
    let menu = new staticBox(width/2, height/2, width*.25, 3*height/4, 1);
    nextButton = new staticBox(width*.59, 3*height/4, width*.05, height*.1);
    nextButton.setImage("../Images/next.png");
    retryButton = new staticBox(width*.505, 3*height/4, width*.05, height*.1);
    retryButton.setImage("../Images/retry.png");
    backButton = new staticBox(width*.415, 3*height/4, width*.05, height*.1);
    backButton.setImage("../Images/menu.png");
    textBox = new staticBox(width/2, height*.35, width*.23, height/4);
    textBox.setImage("../Images/win_text.png");
    gameOver = true;
    clearInterval(checkInterval);
}

function nextLevel() {
    let newUrl = "http://127.0.0.1:5500/Views/level2.html";
    window.location = newUrl;
}

function reloadLevel() {
    let newUrl = "http://127.0.0.1:5500/Views/level1.html";
    window.location = newUrl;
}

function backtoTitle() {
    let newUrl = "http://127.0.0.1:5500/Views/titleScreen.html";
    window.location = newUrl;
}

function lose() {
    console.log("You lose :(");
    setTimeout(() => {
        if (!gameOver) {
            mConstraint.mouse.collisionFilter = 2;
            let menu = new staticBox(width/2, height/2, width*.25, 3*height/4, 1);
            retryButton = new staticBox(width*.55, 3*height/4, width*.05, height*.1);
            retryButton.setImage("../Images/retry.png");
            backButton = new staticBox(width*.45, 3*height/4, width*.05, height*.1);
            backButton.setImage("../Images/menu.png");
            textBox = new staticBox(width/2, height*.35, width*.23, height/4);
            textBox.setImage("../Images/lose_text.png");
            clearInterval(checkInterval);
        }
        gameOver = true;
    }, 3000);
}

setup();
Render.run(render);
Runner.run(runner, engine);
let checkInterval = setInterval(checkCollisions, 1);