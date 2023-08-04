export default function winText(context: CanvasRenderingContext2D):void {
  const { width } = context.canvas;
  const { height } = context.canvas;
  context.font = '120px serif';
  context.fillStyle = 'yellow';
  context.fillRect(0, (height / 2) - 120, width, 200);
  context.fillStyle = 'black';
  context.fillText('ВЫ ВЫГРАЛИ!', 600, height / 2 + 30);
}
