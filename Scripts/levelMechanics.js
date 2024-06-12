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

    boundaries[0] = new staticBox(width+25, height/2, 50, height);
    boundaries[1] = new staticBox(width/2, -25, width, 50);
    boundaries[2] = new staticBox(-25, height/2, 50, height);
    boundaries[3] = new staticBox(width/2, height+25, width, 50);

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

function fly() {
    console.log(bird.body.position.x);
    console.log(slingshot.sling.pointA.x);
    let xDist = slingshot.sling.pointA.x - bird.body.position.x;
    let yDist = slingshot.sling.pointA.y - bird.body.position.y;
    console.log("xDist: " + xDist);
    console.log("yDist: " + yDist);
    let forceToAdd = {x: 0.2*xDist, y: 0.2*yDist};
    Matter.Body.setVelocity(bird.body, forceToAdd);
    Composite.remove(engine.world, slingshot.sling);
    if (--numOfShots > 0) {
        setTimeout(() => {
            let nextBird = new Bird(width*.12, height*.85, 15);
            slingshot = new Slingshot(width*.12, height*.85, nextBird.body);
            bird = nextBird;
        }, 1000);
    }  
}

onmouseup = (event) => {
    for (let i = 0; i < bodies.length; i++) {
        if (bodies[i] == bird.body & mConstraint.mouse.collisionFilter != 2) {
            bird.body.collisionFilter.category = 0b10;
            shotBirds[index++] = bird;
            fly();     
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


function checkCollisions() {
    for (let i = 0; i < shotBirds.length; i++) {
        for (let j = 0; j < pigs.length; j++) {
            if (Collision.collides(pigs[j].body, shotBirds[i].body) != null && gameOver == false) {
                console.log("we made it here");
                pigs[j].die();
                --numOfPigs;
            }
        }
    }
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < pigs.length; j++) {
            if (Collision.collides(boxes[i].body, pigs[j].body) != null && boxes[i].body.speed > 1.00) {
                setTimeout(() => {
                    pigs[j].die();
                }, 200);
                --numOfPigs;
                console.log(numOfPigs);
            }
        }
    }
    let someAlive = false;
    for (let i = 0; i < pigs.length; i++) {
        someAlive = someAlive || pigs[i].isAlive;
    }
    if (!someAlive) {
        win();
    } else if (numOfShots <= 0) {
        console.log("hi")
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
    let strOfCurrLevelPlusOne = String(currLevel+1);
    console.log(strOfCurrLevelPlusOne);
    let newUrl = "http://127.0.0.1:5500/Views/level" + strOfCurrLevelPlusOne + ".html";
    window.location = newUrl;
}

function reloadLevel() {
    let strOfCurrLevel = String(currLevel+0);
    console.log(strOfCurrLevel);
    let newUrl = "http://127.0.0.1:5500/Views/level" + strOfCurrLevel + ".html";
    window.location = newUrl;
}

function backtoTitle() {
    let newUrl = "http://127.0.0.1:5500/Views/titleScreen.html";
    window.location = newUrl;
}

function lose() {
    setTimeout(() => {
        console.log("You lose :(");
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
spawnBoxes();
spawnPigs();
Render.run(render);
Runner.run(runner, engine);
let checkInterval = setInterval(checkCollisions, 1);