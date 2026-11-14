export function AdventureCourseDiagram() {
  const x = (value: number) => 50 + value * 13;
  const y = (value: number) => 330 - value * 13;
  return <figure className="geometry-visual paper2024-p2-course">
    <svg viewBox="0 0 560 375" role="img" aria-labelledby="course-title course-desc">
      <title id="course-title">Adventure race stream and road on coordinate axes</title>
      <desc id="course-desc">The stream is the lower right arc of a circle centred at C, coordinates one comma seventeen, with radius twelve. Petro is at P, coordinates ten comma six, outside the circle. A road starts at F, coordinates nine comma zero, and rises to the right along x minus three y equals nine. Each unit represents one hundred metres.</desc>
      <rect width="560" height="375" fill="white" />
      <line x1="50" y1="330" x2="525" y2="330" />
      <line x1="50" y1="330" x2="50" y2="27" />
      <path className="stream-arc" d={`M ${x(13)} ${y(17)} A 156 156 0 0 1 ${x(1)} ${y(5)}`} />
      <line className="road-line" x1={x(9)} y1={y(0)} x2={x(33)} y2={y(8)} />
      <circle cx={x(1)} cy={y(17)} r="4" />
      <circle cx={x(10)} cy={y(6)} r="4" />
      <circle cx={x(9)} cy={y(0)} r="4" />
      <text x={x(1) + 10} y={y(17) - 9}>C(1, 17)</text>
      <text x={x(10) + 10} y={y(6) - 9}>P(10, 6)</text>
      <text x={x(9) - 13} y="354">F(9, 0)</text>
      <text x="224" y="72">Stream, s</text>
      <text x="424" y="207">Road, w</text>
      <text x="528" y="330">x</text><text x="57" y="28">y</text>
    </svg>
    <figcaption>Each coordinate unit represents 100 metres. The road is the segment x − 3y = 9 for 0 ≤ y ≤ 8; the stream follows a circle of centre C(1, 17) and radius 12.</figcaption>
  </figure>;
}
