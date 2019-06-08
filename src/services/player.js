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
            artificialGravity: this.options.gravity,
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
            this.params.artificialGravity = this.options.gravity - .2;
        } else {
            this.params.speed = 13;
            this.params.artificialGravity = this.options.gravity;
        }

        return new Promise((resolve, reject) => {
            const p = this.params;
            p.acc = p.speed;
            const move = setInterval(() => {
                this.ctx.clearRect(p.x, p.y, p.width, p.height);
                p.y -= Math.round(p.acc);
                p.acc -= p.artificialGravity;
                this.draw();

                if (p.y === this.params.yDefault) {
                    clearInterval(move);
                    resolve();
                }
            }, 25);
        })
    }
}

export default Player;
