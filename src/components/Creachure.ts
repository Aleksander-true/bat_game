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

  constructor(imageSrc: string, gameWidth: number, gameHeight: number, framesNumber: number, animationSpeed = 0.4) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = imageSrc;
    this.frame = 0;
    this.framesNumber = framesNumber;
    this.imageWidth = this.image.width / this.framesNumber;
    this.imageHeight = this.image.height;
    this.width = this.gameWidth * 0.05;
    this.height = this.width * (this.imageHeight / this.imageWidth);
    this.speed = 10;
    this.animationSpeed = animationSpeed;
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
