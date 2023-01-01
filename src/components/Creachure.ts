import InputHandler from './InputHandler';

/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class Creachure {
  height: number;
  width: number;
  x: number;
  y: number;
  image: HTMLImageElement;
  frame: number;
  speed: number;
  gameWidth: number;
  gameHeight: number;
  framesNumber: number;
  imageWidth: number;
  imageHeight: number;
  animationSpeed: number;
  gameFrame: number;

  constructor(imageId: string, gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = this.gameWidth * 0.05;
    this.height = this.gameHeight * 0.075;
    this.x = 0;
    this.y = 0;
    this.image = document.getElementById(imageId) as HTMLImageElement;
    this.frame = 0;
    this.framesNumber = 6;
    this.imageWidth = 360 / this.framesNumber;
    this.imageHeight = 44;
    this.speed = 10;
    this.animationSpeed = 0.4;
    this.gameFrame = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image, this.frame * this.imageWidth, 0,
      this.imageWidth, this.imageHeight,
      this.x, this.y, this.width, this.height,
    );
  }
}
