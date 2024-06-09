class Pig {
    constructor(x, y, r) {
        this.body = Matter.Bodies.circle(x, y, r);
        this.body.render.fillStyle = 'green';
        Matter.Composite.add(world, this.body);
        this.r = r;
    }

    die() {
        Matter.Composite.remove(world, this.body);
    }
}