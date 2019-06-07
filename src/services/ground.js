class Ground {
    constructor(ctx) {
        this.ctx = ctx;
        this.draw();
    }

    draw() {
        this.ctx.fillRect(0, 170, 900, 1);
    }
}

export default Ground;
