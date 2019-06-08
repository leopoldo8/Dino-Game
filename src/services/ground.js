class Ground {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
        this.draw();
    }

    draw() {
        this.ctx.fillRect(0, this.options.groundY, 900, 1);
    }
}

export default Ground;
