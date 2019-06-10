import DinoIMG from '../assets/img/dino.png';

class Player {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
        this.params = {
            x: 50,
            y: 0,
            yDefault: 0,
            width: 45,
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

        let playerSprite = new Image(width, height);
        playerSprite.src = DinoIMG;

        this.ctx.drawImage(playerSprite, x, y, width, height);
    }

    jump(higherJump) {
        if (higherJump[0]) {
            this.params.speed = 11; //higher jump
        } else {
            this.params.speed = 9;
        }

        return new Promise((resolve, reject) => {
            const p = this.params;
            p.acc = p.speed;
            const move = setInterval(() => {
                this.ctx.clearRect(p.x, p.y-1, p.width, p.height+1);
                p.y -= p.acc;
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
