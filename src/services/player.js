class Player {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
        this.params = {
            x: 20,
            y: 120,
            width: 20,
            height: 50,
            speed: 10,
            acc: 0,
        }

        this.draw();
    }

    draw() {
        const { x, y, width, height } = this.params;
        this.ctx.fillRect(x, y, width, height);
    }

    jump(callback) {
        const p = this.params;
        p.acc = p.speed;
        const move = setInterval(() => {
            this.ctx.clearRect(p.x, p.y, p.width, p.height);
            p.y -= p.acc;
            p.acc -= this.options.gravity;
            this.draw();
            if (p.y === 120) {
                callback();
                clearInterval(move);
            }
        }, 25);

    }
}

export default Player;
