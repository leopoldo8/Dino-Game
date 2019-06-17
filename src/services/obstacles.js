import Obstacle from './obstacle';

class obstacles {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
        this.options.x = 600;
        this.options.type = 0;
        this.obstacles = [];

        this.mount();
    }

    refreshStopGame(value) {
        this.options.StopGame = value;
    }

    mount() {
        const generateObstacles = setInterval(() => {
            if (this.obstacles.length < 10) {
                let repeat = Math.round(Math.random() * (3 - 1) + 1);
                while (repeat) {
                    this.options.x += Math.random() * (600 - 350) + 350;
                    this.options.type = Math.round(Math.random() * 5);
                    this.obstacles.push(new Obstacle(this.ctx, this.options));
                    repeat--;
                }
            }
            this.remove();
            if (this.options.StopGame) clearInterval(generateObstacles);
        }, 300);
    }

    remove() {
        this.obstacles.forEach((obstacle, i) => {
            if (obstacle.params.x <= -obstacle.params.width) {
                //out of the canvas
                this.obstacles.splice(i, 1);
                obstacle.delete();
            } else if (this.obstacles.every(elem => elem.params.x <= obstacle.params.x)) {
                //higher x
                this.options.x = obstacle.params.x;
            }
        })
    }

    move(value) {
        this.obstacles.forEach(obstacle => {
            obstacle.move(value);
        });
    }
}

export default obstacles;
