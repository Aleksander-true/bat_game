/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/lines-between-class-members */
import Creachure from './Creachure';
import Player from './Player';

export default class Target extends Creachure {
  newX: number;
  newY: number;
  isCatched: boolean;

  constructor(imageId: string, gameWidth: number, gameHeight: number, framesNumber: number) {
    super(imageId, gameWidth, gameHeight, framesNumber);
    this.x = Math.random() > 0.5 ? this.gameWidth : -this.width;
    this.y = Math.random() * (this.gameHeight - this.height);
    this.newX = Math.random() * (this.gameWidth - this.width);
    this.newY = Math.random() * (this.gameHeight - this.height);
    this.speed = Math.floor(Math.random() * 50) + 25;
    this.isCatched = false;
  }

  update(player: Player) {
    const widthRange = (this.gameWidth - this.width);
    const heigthRange = (this.gameHeight - this.height);
    if (this.gameFrame % (this.speed * 4) === 0) {
      this.gameFrame = 0;
      this.newX = Math.random() * widthRange;
      this.newY = Math.random() * heigthRange;
    }
    const factor = 1000;
    const dx = (this.x - player.x);
    const dy = (this.y - player.y);
    const sqrtDistance = dx ** 2 + dy ** 2;
    let avoidX = (factor * dx) / sqrtDistance;
    avoidX = Math.abs(avoidX) > factor / this.speed ? (factor * Math.sign(avoidX)) / this.speed : avoidX;
    let avoidY = (factor * dy) / sqrtDistance;
    avoidY = Math.abs(avoidY) > factor / this.speed ? (factor * Math.sign(avoidY)) / this.speed : avoidY;

    this.x += avoidX - (this.x - this.newX) / this.speed;
    this.y += avoidY - (this.y - this.newY) / this.speed;

    this.frame = Math.floor(this.gameFrame * this.animationSpeed) % this.framesNumber;
    this.gameFrame++;
  }
}
