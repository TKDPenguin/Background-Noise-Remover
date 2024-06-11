class Pig {
    constructor(x, y, r) {
        this.body = Matter.Bodies.circle(x, y, r, {collisionFilter: {category: 0b10}, friction: 0.8, render: {
            sprite: {
                texture: '../Images/lambda-icon.png'
            }, fillStyle: "green"
        }});
        Matter.Composite.add(world, this.body);
        this.r = r;
    }

    die() {
        Matter.Composite.remove(world, this.body);
    }
}