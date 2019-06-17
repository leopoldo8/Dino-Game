import obstacleOne from '../assets/img/obstacle_1.png';
import obstacleTwo from '../assets/img/obstacle_2.png';
import obstacleThree from '../assets/img/obstacle_3.png';
import obstacleFour from '../assets/img/obstacle_4.png';
import obstacleFive from '../assets/img/obstacle_5.png';

class obstacle {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
        this.params = {
            x: this.options.x,
            inheritX: this.options.x,
            groundX: 0,
            y: 0,
            width: 30,
            height: 50,
            imageSrc: obstacleOne
        }

        switch(this.options.type) {
            case 1:
                this.params.height = 60;
                break;

            case 2:
                this.params.width = 75;
                this.params.imageSrc = obstacleTwo;
                break;

            case 3:
                this.params.width = 50;
                this.params.height = 60;
                this.params.imageSrc = obstacleThree;
                break;

            case 4:
                this.params.height = 70;
                this.params.imageSrc = obstacleFour;
                break;

            case 5:
                this.params.width = 60;
                this.params.imageSrc = obstacleFive;
                break;

            default: break;
        }

        this.params.y = this.options.groundY - this.params.height + 15;
        this.params.groundX = this.options.x + this.params.x;

        this.draw();
    }

    draw() {
        const { imageSrc, x, y, width, height } = this.params;

        let obstacleImage = new Image(width, height);
        obstacleImage.src = imageSrc;

        this.ctx.drawImage(obstacleImage, x, y, width, height);
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

export default obstacle;
