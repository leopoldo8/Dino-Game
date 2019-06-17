class Ground {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;

        this.params = {
            x: 0,
            y: this.options.groundY,
            width: 900,
            height: 1,
            color: "#535353",
        }

        this.draw();
    }

    draw() {
        const { x, y, width, height, color } = this.params;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
}

export default Ground;
