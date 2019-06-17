import DinoStatic from '../assets/img/dino.png';
import DinoStepOne from '../assets/img/dino_1.png';
import DinoStepTwo from '../assets/img/dino_2.png';

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
            timestempMin: 33,
            dinoStep: 0,
            timeStemp: 0,
            dinoIMG: DinoStatic,
        }

        this.params.y = this.options.groundY - this.params.height + 15;
        this.params.yDefault = this.params.y;

        this.draw();
    }

    draw(staticImage) {
        const { x, y, width, height } = this.params;

        if (this.params.timeStemp >= this.params.timestempMin) {
            if (this.params.timestempMin > 10) this.params.timestempMin -= this.options.groundSpeedX/30;
            switch(this.params.dinoStep % 2) {
                case 0:
                    this.params.dinoIMG = DinoStepOne;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;
                    case 1:
                    this.params.dinoIMG = DinoStepTwo;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;

                default:
                    this.params.dinoIMG = DinoStatic;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;
            }
        } else {
            this.params.timeStemp++;
        }

        if (staticImage) this.params.dinoIMG = DinoStatic;

        let playerSprite = new Image(width, height);
        playerSprite.src = this.params.dinoIMG;

        this.ctx.clearRect(x, y, width, height+5);
        this.ctx.drawImage(playerSprite, x, y, width, height);
    }

    jump(higherJump) {
        if (higherJump[0]) {
            this.params.speed = 13; //higher jump
        } else {
            this.params.speed = 11.5;
        }

        return new Promise((resolve, reject) => {
            const p = this.params;
            p.acc = p.speed;
            const move = setInterval(() => {
                this.ctx.clearRect(p.x, p.y-1, p.width, p.height+1);
                p.y -= p.acc;
                p.acc -= this.options.gravity;
                this.draw(true);
                if (Math.round(p.y) >= this.params.yDefault) {
                    p.y = this.params.yDefault;
                    clearInterval(move);
                    resolve();
                }
            }, 20);
        })
    }
}

export default Player;
