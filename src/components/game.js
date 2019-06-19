import React from 'react';
import Player from '../services/player';
import Ground from '../services/ground';
import Obstacles from '../services/obstacles';
import Pteros from '../services/pteros';

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
            gravity: .85,
            attempKeydown: false,
            groundY: 225,
            groundSpeedX: 1.4,
            groundSpeedXDefault: 1.4,
            timestamp: 3,
            width: 900,
            toWaitAction: false,
            lastAction: null,
            ctx: {},
            player: {},
        }
    }

    componentDidMount() {
        this.ctx = this.canvas.game.current.getContext("2d");
        this.ground = new Ground(this.ctx, this.options);

        this.options.ctx.obstacles = this.canvas.obstacles.current.getContext("2d", { alpha: true });
        this.obstacles = new Obstacles(this.options.ctx.obstacles, this.options);
        this.pteros = new Pteros(this.options.ctx.obstacles, this.options);

        this.options.ctx.player = this.canvas.player.current.getContext("2d", { alpha: true });
        this.player = new Player(this.options.ctx.player, this.options);

        this.objectsMoving = ["obstacles", "pteros"];

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
        }, 125);
    }

    moveGround() {
        const move = () => setTimeout(() => {
            if (!this.player.params.duck) this.player.draw();
            else this.player.draw(this.player.params.dinoIMG);
            this.objectsMoving.forEach(el => {
                this[el].move(this.options.groundSpeedX);
            });

            if (!this.options.stopGame) move();
            this.options.groundSpeedX += .00015
        }, this.options.timestamp);

        move();
    }

    handleKeys(key) {
        this.options.player.timebetween = 0;
        this.options.player.higherjump = false;
        document.onkeydown = async (e) => {
            e = e || window.event;
            let event = key ? key : (e.which || e.keyCode);

            if (this.options.attempKeydown && event !== this.options.lastAction) {
                if (this.options.lastAction !== null) {
                    event = this.options.lastAction;
                } else {
                    return;
                }
            }

            this.count = setInterval(() => {
                this.options.player.timebetween++;
                if (this.options.player.timebetween >= 5) this.options.player.higherjump = true;
            }, .1);

            switch (event) {
                case 37: // left
                    break;

                case 38: // up
                    if (this.options.stopGame) this.init();
                    this.options.attempKeydown = true;
                    setTimeout(async () => {
                        clearInterval(this.count);
                        this.handleActions({
                            action: this.player.jump,
                            ctx: this.player,
                            event: event,
                            press: false,
                            wait: true,
                        }, this.options.player.higherjump);
                    }, 10);
                    break;

                case 39: // right
                    break;

                case 40: // down
                    this.handleActions({
                        action: this.player.duck,
                        ctx: this.player,
                        event: event,
                        press: true,
                        wait: false,
                    });
                    break;

                default: return; // exit this handler for other keys
            }
        }

        document.onkeyup = () => {
            //reset interval
            if (this.count) clearInterval(this.count);

            //reset player after duck
            if (this.player.params.duck) {
                this.player.params.duck = false;
                this.player.params.timestempMin = 28;
                this.player.normalDraw();
            }

            //attemp until keyup
            if (!this.options.toWaitAction) this.options.attempKeydown = false;
            this.options.lastAction = null;
        }
    }

    async handleActions(options, ...props) {
        const { action, ctx, event, press, wait } = options;

        //no attemp actions pressing a keydown
        if (press) this.options.lastAction = event;
        else this.options.lastAction = null;

        //attemp other action at same time
        this.options.attempKeydown = true;
        this.options.toWaitAction = wait;

        //do the action
        await action.bind(ctx)(props);

        //player options reset
        this.options.player.higherjump = false;
        this.options.player.timebetween = 0;

        //attemp until action ends
        if (this.options.toWaitAction) {
            this.options.attempKeydown = false;
        }
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
