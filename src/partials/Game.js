import { SVG_NS,KEYS, SCORE } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';


export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.radius = 8;
		this.gameElement = document.getElementById(element);

		this.board = new Board(this.width, this.height);
		this.player1Score= new Score(this.width/2 - SCORE.distance, SCORE.topDistance, SCORE.size);
		this.player2Score = new Score(this.width/2 + SCORE.distance,SCORE.topDistance, SCORE.size);

		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.padding ='10'

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.padding,
			(this.height-this.paddleHeight)/2,
			KEYS.a,
			KEYS.z
		);
		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width-this.paddleWidth-this.padding),
			(this.height-this.paddleHeight)/2,
			KEYS.up,
			KEYS.down
		);

		this.ball = new Ball(
			this.radius,
			this.width,
			this.height,
			this.direction
		);

		this.text = new Text(
			this.x,
			this.y,
		)
 document.addEventListener('keydown', event => {
    if(event.key === KEYS.spaceBar) {
      this.pause = !this.pause;
    }
  })
	}

	render() {

	if (this.pause) {
    return;
  }
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS,'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.player1Score.render(svg, this.player1.score);
		this.player2Score.render(svg, this.player2.score);
		this.ball.render(svg,this.player1, this.player2);
		this.player1.render(svg);
		this.player2.render(svg);

	}

}