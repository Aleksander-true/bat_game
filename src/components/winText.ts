export default function winText(context: CanvasRenderingContext2D, width:number, height:number) {
  context.font = '120px serif';
  context.fillRect(0, (height / 2) - 120, width, 200);
  context.fillStyle = 'black';
  context.fillText('ВЫ ВЫГРАЛИ!', 600, height / 2 + 30);
}
