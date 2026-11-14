export interface GraphPoint { x: number; y: number }

export function isInversePath(points: GraphPoint[]) {
  if (points.length !== 3) return false;
  const expected: GraphPoint[] = [{ x: 0, y: 0 }, { x: 1, y: 3 }, { x: 4, y: 4 }];
  const matches = (path: GraphPoint[]) => path.every((point, index) => point.x === expected[index].x && point.y === expected[index].y);
  return matches(points) || matches([...points].reverse());
}
