const {Engine, Bodies, Mouse, MouseConstraint, Composite, Render, Runner, Constraint} = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let render;
let runner;
let constraint;
let slingshot;

function setup() {
    var canvas = document.querySelector('canvas');
    var width = canvas.width;
    var height = canvas.height;
    engine = Engine.create();
    world = engine.world;
    ground = new staticBox(width/2, height-10, width, 20);
    for (let i = 0; i < 3; i++) {
        boxes[i] = new Box(450, 300-i*75, 50, 75);
    }
    bird = new Bird(150, 300, 15);

    slingshot = new Slingshot(150, 300, bird.body);

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
    }, 10);
}

onkeydown = (event) => {
    if (event.key == ' ') {
        bird = new Bird(150, 300, 15);
        slingshot.attach(bird.body);
    }
}

setup();
Render.run(render);
Runner.run(runner, engine);