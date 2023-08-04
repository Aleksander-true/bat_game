export default function timeText(
  context: CanvasRenderingContext2D,
  timeLimit: number,
  startTime: number,
  currentTime: number,
): boolean {
  const { width } = context.canvas;
  const timeToEnd = timeLimit - Math.trunc((currentTime - startTime + 1) / 1000);
  context.font = '72px serif';
  context.fillStyle = 'yellow';
  context.fillText(`${timeToEnd}`, width - 100, 80);
  return timeToEnd <= 0;
}
