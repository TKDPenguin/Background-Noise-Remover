class staticBox {
    constructor(x, y, w, h, chamfer=0) {
        this.body = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true, collisionFilter: {category: 0b10}, chamfer: chamfer});
        Matter.Composite.add(world, this.body);
        this.w = w;
        this.h = h;
    }

    setImage(image) {
        this.body.render.sprite.texture = image;
    }
}