export default function timeText(
  context: CanvasRenderingContext2D,
  timeLimit: number,
  startTime: number,
): number {
  const currentTime = Date.now();
  const { width } = context.canvas;
  const secondsToEnd = timeLimit - Math.trunc((currentTime - startTime + 1) / 1000);
  context.font = '72px serif';
  context.fillStyle = 'yellow';
  context.fillText(`${secondsToEnd}`, width - 100, 80);
  return secondsToEnd;
}
