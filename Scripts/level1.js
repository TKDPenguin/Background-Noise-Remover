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

function setup() {
    canvas = document.querySelector('canvas');
    width = window.innerWidth;
    height = window.innerHeight * .95;
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

    pig = new Pig(.75*width+75, height-50, 25);

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
        if (bodies[i] == bird.body) {
            setTimeout(() => {
                slingshot.fly();
                bird.body.collisionFilter.category = 0b10;
                shotBirds[index++] = bird;
            }, 10);
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
    console.log(bodies);
}

// onkeydown = (event) => {
//     if (event.key == ' ') {
//         bird = new Bird(width*.1, height*.82, 15);
//         slingshot.attach(bird.body);
//     }
// }

function checkCollisions() {
    for (let i = 0; i < shotBirds.length; i++) {
        if (Collision.collides(pig.body, shotBirds[i].body) != null) {
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
    bird.body.collisionFilter = 1;
    clearInterval(checkInterval);
}

function lose() {
    console.log("You lose :(");
    clearInterval(checkInterval);
}

setup();
Render.run(render);
Runner.run(runner, engine);
let checkInterval = setInterval(checkCollisions, 1);