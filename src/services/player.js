class Player {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
        this.params = {
            x: 50,
            y: 0,
            yDefault: 0,
            width: 30,
            height: 50,
            speed: 13,
            acc: 0,
        }

        this.params.y = this.options.groundY - this.params.height;
        this.params.yDefault = this.params.y;

        this.draw();
    }

    draw() {
        const { x, y, width, height } = this.params;
        this.ctx.fillRect(x, y, width, height);
    }

    jump(higherJump) {
        if (higherJump[0]) {
            this.params.speed = 14; //higher jump
        } else {
            this.params.speed = 13;
        }

        return new Promise((resolve, reject) => {
            const p = this.params;
            p.acc = p.speed;
            const move = setInterval(() => {
                this.ctx.clearRect(p.x, p.y, p.width, p.height);
                p.y -= Math.round(p.acc);
                p.acc -= this.options.gravity;
                this.draw();

                if (p.y === this.params.yDefault) {
                    clearInterval(move);
                    resolve();
                }
            }, 20);
        })
    }
}

export default Player;
