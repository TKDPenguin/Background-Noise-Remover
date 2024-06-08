let ground;
let box;
let bird;
let world, engine;
let mConstraint;

function setup() {
    const canvas = createCanvas(600, 400);
    engine = Matter.Engine.create();
    world = engine.world;
    ground = new staticBox(width/2, height-10, width, 20);
    box = new Box(450, 300, 50, 75);
    bird = new Bird(50, 300, 25);

    const mouse = Matter.Mouse.create(canvas.elt);
    const options = {
        mouse: mouse
    }
    mConstraint = Matter.MouseConstraint.create(engine, options);
    Matter.Composite.add(world, mouse);
    Matter.Composite.add(world, mConstraint);
}

function draw() {
    background(0);
    Matter.Engine.update(engine);
    ground.show();
    box.show();
    bird.show();
}