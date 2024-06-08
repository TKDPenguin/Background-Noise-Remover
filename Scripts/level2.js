// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var canvas = document.querySelector('canvas');
var height = canvas.height;
var width = canvas.width;

// create an engine
var engine = Engine.create(canvas);

// create a renderer
var render = Render.create({
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

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {
        fillStyle: 'purple'
    }
});
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(width/2, height-30, width, 60, { isStatic: true });

const mouse = Mouse.create(document.body);
const options = {
    mouse: mouse
}
mConstraint = MouseConstraint.create(engine, options);
Composite.add(engine.world, mConstraint);

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);