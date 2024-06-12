class Slingshot {
    constructor(xPos, yPos, body) {
        this.sling = Matter.Constraint.create({
            pointA: {
                x: xPos,
                y: yPos
            },
            bodyB: body,
            stiffness: 0.05,
            length: 30,
            render: {
                strokeStyle: 'black',
                type: "line"
            },
            damping: .7
        });
        Matter.Composite.add(world, this.sling);
    }

    attach(body) {
        this.sling.render.visible = true;
        this.sling.bodyB = body;
    }
}