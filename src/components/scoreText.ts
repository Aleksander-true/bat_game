export default function scoreText(context: CanvasRenderingContext2D, score:number, targetRemains:number): void {
  context.font = '50px serif';
  context.fillStyle = 'yellow';
  context.fillText(`Мух съедено: ${score}`, 20, 60);
  context.fillText(`Мух осталось: ${targetRemains}`, 20, 120);
}
