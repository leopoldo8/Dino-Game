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

        this.canvas = React.createRef();

        this.sprites = {
            player: React.createRef(),
        }

        this.options = {
            stopGame: false,
            gravity: .5,
            attempKeydown: false,
            groundY: 200,
            groundSpeedX: 1.1,
            timestamp: 3,
            width: 900,
            player: {},
        }
    }

    componentDidMount() {
        this.ctx = this.canvas.current.getContext("2d");
        this.player = new Player(this.ctx, this.options);
        this.ground = new Ground(this.ctx, this.options);
        this.obstacles = new Obstacles(this.ctx, this.options);

        this.objectsMoving = ["obstacles"];

        this.handleKeys();
        this.init();
    }

    stop() {
        this.options.stopGame = true;
        this.obstacles.refreshStopGame(true);
    }

    init() {
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
                this[el].move(this.options.groundSpeedX);
                this.player.draw(); //prevent obstacles clear the player
            });

            if (!this.options.stopGame) move();
            this.options.groundSpeedX += .0001
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
                if (this.options.player.timebetween >= 25) this.options.player.higherjump = true;
            }, 1);

            e = e || window.event;
            switch (e.which || e.keyCode) {
                case 37: // left
                    break;

                case 38: // up
                    this.options.attempKeydown = true;
                    setTimeout(async () => {
                        clearInterval(this.count);
                        this.handleActions(this.player.jump, this.player, this.options.player.higherjump);
                    }, 100);
                    break;

                case 39: // right
                    break;

                case 40: // down
                    break;

                default: return; // exit this handler for other keys
            }
        }

        document.onkeyup = () => {
            if (this.count) clearInterval(this.count);
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
            <div>
                <button onClick={this.stop.bind(this)}>Stop</button>
                <canvas ref={ this.canvas } id="game" width={ this.options.width } height="250" />
                <p>{ this.state.score }</p>
            </div>
        )
    }


}

export default Game;
