class Bird {
    constructor(x, y, r) {
        this.body = Matter.Bodies.circle(x, y, r);
        Matter.Composite.add(world, this.body);
        this.r = r;
    }
}