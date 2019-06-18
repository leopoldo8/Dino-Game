import React from 'react';
import Player from '../services/player';
import Ground from '../services/ground';
import Obstacles from '../services/obstacles';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0,
        }

        this.canvas = {
            game: React.createRef(),
            obstacles: React.createRef(),
            player: React.createRef(),
        }

        this.sprites = {
            player: React.createRef(),
        }

        this.options = {
            stopGame: true,
            gravity: .75,
            attempKeydown: false,
            groundY: 225,
            groundSpeedX: 1.4,
            groundSpeedXDefault: 1.4,
            timestamp: 3,
            width: 900,
            ctx: {},
            player: {},
        }
    }

    componentDidMount() {
        this.ctx = this.canvas.game.current.getContext("2d");
        this.ground = new Ground(this.ctx, this.options);

        this.options.ctx.obstacles = this.canvas.obstacles.current.getContext("2d", { alpha: true });
        this.obstacles = new Obstacles(this.options.ctx.obstacles, this.options);

        this.options.ctx.player = this.canvas.player.current.getContext("2d", { alpha: true });
        this.player = new Player(this.options.ctx.player, this.options);

        this.objectsMoving = ["obstacles"];

        this.handleKeys();
    }

    stop() {
        this.options.stopGame = true;
        this.obstacles.refreshStopGame(true);
    }

    init() {
        this.options.stopGame = false;
        this.moveGround();
        this.scoreAdd();
    }

    scoreAdd() {
        let a = setInterval(() => {
            this.setState({
                score: this.state.score + 1,
            });
            if (this.options.stopGame) clearInterval(a);
            // console.log(this.score);
        }, 100);
    }

    moveGround() {
        const move = () => setTimeout(() => {
            this.objectsMoving.forEach(el => {
                if (!this.player.params.duck) this.player.draw();
                else this.player.draw(this.player.params.dinoIMG);
                this[el].move(this.options.groundSpeedX);
            });

            if (!this.options.stopGame) move();
            this.options.groundSpeedX += .00022
        }, this.options.timestamp);

        move();
    }

    handleKeys() {
        this.options.player.timebetween = 0;
        this.options.player.higherjump = false;
        document.onkeydown = async (e) => {
            if (this.options.attempKeydown) return;

            this.count = setInterval(() => {
                this.options.player.timebetween++;
                if (this.options.player.timebetween >= 5) this.options.player.higherjump = true;
            }, .1);

            e = e || window.event;
            switch (e.which || e.keyCode) {
                case 37: // left
                    break;

                case 38: // up
                    if (this.options.stopGame) this.init();
                    this.options.attempKeydown = true;
                    setTimeout(async () => {
                        clearInterval(this.count);
                        this.handleActions(this.player.jump, this.player, this.options.player.higherjump);
                    }, 10);
                    break;

                case 39: // right
                    break;

                case 40: // down
                    this.handleActions(this.player.duck, this.player);
                    break;

                default: return; // exit this handler for other keys
            }
        }

        document.onkeyup = () => {
            if (this.count) clearInterval(this.count);
            if (this.player.params.duck) {
                this.player.params.duck = false;
                this.player.params.timestempMin = 33;
                this.player.normalDraw();
            }
        }
    }

    async handleActions(action, ctx, ...props) {
        this.options.attempKeydown = true;
        await action.bind(ctx)(props);

        //player options reset
        this.options.player.higherjump = false;
        this.options.player.timebetween = 0;

        this.options.attempKeydown = false;
    }

    render() {
        return (
            <div id="stage">
                <button onClick={this.stop.bind(this)}>Stop</button>
                <canvas ref={ this.canvas.game } id="game" width={ this.options.width } height="250" />
                <canvas ref={ this.canvas.obstacles } id="obstacles" width={ this.options.width } height="250" />
                <canvas ref={ this.canvas.player } id="player" width={this.options.width} height="250" />
                <p>{ this.state.score }</p>
            </div>
        )
    }


}

export default Game;
