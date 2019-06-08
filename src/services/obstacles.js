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
        this.obstacles.push(new Obstacle(this.ctx, this.options));
        const generateObstacles = setInterval(() => {
            this.options.x += Math.random() * (600 - 300) + 300;
            this.options.type = Math.round(Math.random() * 5);
            this.obstacles.push(new Obstacle(this.ctx, this.options));
            if (this.options.StopGame) clearInterval(generateObstacles);
        }, 400);
    }

    move(value) {
        this.obstacles.forEach(obstacle => {
            obstacle.move(value);
        });
    } 
}

export default obstacles;
