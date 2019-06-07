import React from 'react';
import Player from '../services/player';
import Ground from '../services/ground';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.canvas = React.createRef();
        this.options = {
            gravity: 1,
            attempKeydown: false
        }
    }

    componentDidMount() {
        this.ctx = this.canvas.current.getContext("2d");
        this.player = new Player(this.ctx, this.options);
        this.ground = new Ground(this.ctx);

        this.init();
    }

    init() {
        document.onkeydown = (e) => {
            if (this.options.attempKeydown) return;
            e = e || window.event;
            switch (e.which || e.keyCode) {
                case 37: // left
                    break;

                case 38: // up
                    this.options.attempKeydown = true;
                    this.player.jump(() => this.options.attempKeydown = false);
                    break;

                case 39: // right
                    break;

                case 40: // down
                    break;

                default: return; // exit this handler for other keys
            }
        }
    }

    render() {
        return (
            <canvas ref={this.canvas} id="game" width="900" height="200" />
        )
    }


}

export default Game;
