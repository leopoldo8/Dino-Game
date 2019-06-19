import dinoIMGone from '../assets/img/pterodactyl_1.png';
import dinoIMGtwo from '../assets/img/pterodactyl_2.png';

class Pterodactyl {
    constructor(ctx, option) {
        this.ctx = ctx;
        this.options = option;
        this.params = {
            x: this.options.x,
            y: this.options.y,
            width: 42,
            height: 30,
            groundX: 0,
            dinoIMG: dinoIMGone,
            timestempMin: 33,
            timeStemp: 0,
            dinoStep: 0,
        }

        this.draw();
    }

    draw() {
        if (this.params.timeStemp >= this.params.timestempMin) {
            switch(this.params.dinoStep % 2) {
                case 0:
                    this.params.dinoIMG = dinoIMGone;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;
                case 1:
                    this.params.dinoIMG = dinoIMGtwo;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;

                default:
                    this.params.dinoIMG = dinoIMGone;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;
            }
        } else {
            this.params.timeStemp++;
        }

        const { x, y, width, height, dinoIMG } = this.params;
        let sprite = new Image();
        sprite.src = dinoIMG;

        this.ctx.drawImage(sprite, x, y, width, height);
    }

    move(newGroundXValue) {
        const p = this.params;
        this.ctx.clearRect(p.x, p.y, p.width+5, p.height);
        this.params.groundX = newGroundXValue;
        this.params.x -= this.params.groundX;
        this.draw();
    }

    delete() {
        const { x, y, width, height } = this.params;
        this.ctx.clearRect(x, y, width+5, height);
    }
}

export default Pterodactyl;
