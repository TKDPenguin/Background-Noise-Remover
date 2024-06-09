class Bird {
    constructor(x, y, r) {
        this.body = Matter.Bodies.circle(x, y, r, {collisionFilter: {category: 0b1}, friction: 0.8, restitution: 0.5});
        Matter.Composite.add(world, this.body);
        this.r = r;
    }
}