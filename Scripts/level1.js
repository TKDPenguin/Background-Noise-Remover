const {Engine, Bodies, Mouse, MouseConstraint, Composite, Render, Runner, Constraint, Collision} = Matter;

const boxes = [];
const boundaries = [];
let ground, bird, pig, slingshot;
let world, engine, mConstraint, render, runner, constraint, collision;
let canvas, width, height;
let numOfShots = 3;
let numOfPigs = 1;

function setup() {
    canvas = document.querySelector('canvas');
    width = canvas.width;
    height = canvas.height;
    engine = Engine.create();
    world = engine.world;
    for (let i = 0; i < 3; i++) {
        boxes[i] = new Box(0.75*width, height-75-i*75, 50, 75);
    }
    boundaries[0] = new staticBox(width+10, height/2, 20, height);
    boundaries[1] = new staticBox(width/2, -10, width, 20);
    boundaries[2] = new staticBox(-10, height/2, 20, height);
    boundaries[3] = new staticBox(width/2, height+10, width, 20);

    pig = new Pig(.75*width-50, height-50, 25);

    bird = new Bird(width*.1, height*.85, 15);

    slingshot = new Slingshot(width*.1, height*.85, bird.body);

    const mouse = Mouse.create(canvas.elt);
    const options = {
        mouse: mouse,
        constraint: {
            render: {
                visible: false
            }
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
    setTimeout(() => {
        slingshot.fly();
    }, 8);
    if (--numOfShots > 0) {
        setTimeout(() => {
            bird = new Bird(width*.1, height*.85, 15);
            slingshot.attach(bird.body);
        }, 1000);
    }
}

// onkeydown = (event) => {
//     if (event.key == ' ') {
//         bird = new Bird(width*.1, height*.82, 15);
//         slingshot.attach(bird.body);
//     }
// }

function checkCollisions() {
    if (Collision.collides(pig.body, bird.body) != null) {
        pig.die();
        --numOfPigs;
    }
    if (numOfPigs <= 0) {
        win();
    }
    if (numOfShots <= 0) {
        lose();
    }
}

function win() {

}

function lose() {

}

setup();
Render.run(render);
Runner.run(runner, engine);
setInterval(checkCollisions, 10)