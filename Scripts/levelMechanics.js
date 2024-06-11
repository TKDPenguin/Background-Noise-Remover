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