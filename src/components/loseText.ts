export default function loseText(context: CanvasRenderingContext2D): void {
  const { width } = context.canvas;
  const { height } = context.canvas;
  context.font = '120px serif';
  context.fillStyle = 'red';
  context.fillRect(0, (height / 2) - 120, width, 200);
  context.fillStyle = 'yellow';
  context.fillText('ВЫ ПРОИГРАЛИ!', 600, height / 2 + 30);
}
