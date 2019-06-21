import Obstacles from '../models/obstacle';

import dinoIMGone from '../assets/img/pterodactyl_1.png';
import dinoIMGtwo from '../assets/img/pterodactyl_2.png';

class Pterodactyl extends Obstacles {
    constructor(ctx, options) {
        options.grounded = false;

        let params = {
            x: options.x,
            y: options.y,
            width: 42,
            height: 30,
            groundX: 0,
            imageSrc: dinoIMGone,
            timestempMin: 33,
            timeStemp: 0,
            dinoStep: 0,
        }

        super(ctx, options, params);
    }

    async beforeDraw() {
        await this.options.scoreAdd;
        if (this.params.timeStemp >= this.params.timestempMin) {
            switch(this.params.dinoStep % 2) {
                case 0:
                    this.params.imageSrc = dinoIMGone;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;
                case 1:
                    this.params.imageSrc = dinoIMGtwo;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;

                default:
                    this.params.imageSrc = dinoIMGone;
                    this.params.timeStemp = 0;
                    this.params.dinoStep++;
                    break;
            }

            return;
        } else {
            this.params.timeStemp++;
            return;
        }
    }
}

export default Pterodactyl;
