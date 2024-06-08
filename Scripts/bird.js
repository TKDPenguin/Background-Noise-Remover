class Bird {
    constructor(x, y, r) {
        this.body = Matter.Bodies.circle(x, y, r);
        Matter.Composite.add(world, this.body);
        this.r = r;
        console.log(this.body);
    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(255);
        rectMode(CENTER);
        circle(0, 0, this.r*2);
        pop();
    }
}