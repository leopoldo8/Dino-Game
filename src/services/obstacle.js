class obstacle {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.options = options;
        this.params = {
            x: this.options.x,
            groundX: 0,
            y: 0,
            width: 25,
            height: 35,
        }

        switch(this.options.type) {
            case 1:
                this.params.height = 50;
                break;

            case 2:
                this.params.width = 75;
                break;

            case 3:
                this.params.width = 40;
                this.params.height = 50;
                break;

            case 4:
                this.params.height = 60;
                break;

            case 5:
                this.params.width = 50;
                break;

            default: break;
        }

        this.params.y = this.options.groundY - this.params.height;
        this.params.groundX = this.options.x + this.params.x;

        this.draw();
    }

    draw() {
        const {x, y, width, height} = this.params;
        this.ctx.fillRect(x, y, width, height);
    }

    move(newGroundXValue) {
        const p = this.params;
        this.ctx.clearRect(p.x, p.y, p.width+5, p.height);
        this.params.groundX = newGroundXValue;
        this.params.x -= this.params.groundX;
        this.ctx.fillRect(p.x, p.y, p.width, p.height);
    }
}

export default obstacle;
