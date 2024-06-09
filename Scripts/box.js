class Box {
    constructor(x, y, w, h) {
        this.body = Matter.Bodies.rectangle(x, y, w, h, {collisionFilter: {category: 0b10}, friction: 0.8});
        Matter.Composite.add(world, this.body);
        this.w = w;
        this.h = h;
    }
}