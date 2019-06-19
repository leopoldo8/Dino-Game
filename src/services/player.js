import DinoStatic from '../assets/img/dino.png';
import DinoStepOne from '../assets/img/dino_1.png';
import DinoStepTwo from '../assets/img/dino_2.png';
import DinoDuckStepOne from '../assets/img/duck_1.png';
import DinoDuckStepTwo from '../assets/img/duck_2.png';

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
            timestempMin: 28,
            dinoStep: 0,
            timeStemp: 0,
            dinoIMG: DinoStatic,
            duck: false,
        }

        this.initPosY();

        this.draw();
    }

    initPosY() {
        this.params.y = this.options.groundY - this.params.height + 15;
        this.params.yDefault = this.params.y;
    }

    clear() {
        const { x, y, width, height } = this.params;
        this.ctx.clearRect(x, y, width, height + 10);
    }

    draw(staticImage, clear) {
        if (this.params.duck) this.duckDraw(staticImage);

        this.clear();
        const { x, y, width, height } = this.params;

        if (this.params.timestempMin > 18) this.params.timestempMin -= this.options.groundSpeedX / 30;

        if (staticImage) {
            this.params.dinoIMG = staticImage;
            this.params.timeStemp++;
            if (clear) this.params.timeStemp = 0;
        } else if (this.params.timeStemp >= this.params.timestempMin) {
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

        const playerSprite = new Image(width, height);
        playerSprite.src = this.params.dinoIMG;

        this.ctx.drawImage(playerSprite, x, y, width, height);
    }

    jump(higherJump) {
        if (this.params.duck) return;

        if (higherJump[0]) {
            this.params.speed = 14; //higher jump
        } else {
            this.params.speed = 12;
        }

        return new Promise((resolve, reject) => {
            const p = this.params;
            p.acc = p.speed;
            const move = setInterval(() => {
                this.ctx.clearRect(p.x, p.y-1, p.width, p.height+1);
                p.y -= p.acc;
                p.acc -= this.options.gravity;
                this.draw(DinoStatic, true);
                if (Math.round(p.y) >= this.params.yDefault) {
                    p.y = this.params.yDefault;
                    clearInterval(move);
                    resolve();
                }
            }, 20);
        })
    }

    duck() {
        let moveDucked = () => {
            switch (this.params.dinoStep % 2) {
                case 0:
                    this.params.dinoIMG = DinoDuckStepOne;
                    break;
                case 1:
                    this.params.dinoIMG = DinoDuckStepTwo;
                    break;

                default:
                    this.params.dinoIMG = DinoStatic;
                    break;
            }

            this.params.timeStemp = 0;
            this.params.dinoStep++;
        }

        if (!this.params.duck) {
            this.params.duck = true;
            moveDucked();
        }

        if (this.params.timeStemp >= this.params.timestempMin + 5) {
            moveDucked();
        }
    }

    normalDraw() {
        this.clear();

        this.params.width = 45;
        this.params.height = 50;
        this.params.dinoIMG = DinoStatic;
        this.initPosY();
    }

    duckDraw(staticImage) {
        this.clear();

        this.params.width = 60;
        this.params.height = 30;
        this.initPosY();

        if (!staticImage) return this.duck();
    }
}

export default Player;
