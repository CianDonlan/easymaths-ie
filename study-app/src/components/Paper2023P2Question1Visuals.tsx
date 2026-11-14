const prizes = [0, 9, 6, 0, 6, 9, 6, 0, 6, 9, 0, 6] as const;

export function Spinner2023Diagram() {
  const centre = 150;
  const radius = 116;
  const point = (degrees: number, distance: number) => {
    const radians = (degrees - 90) * Math.PI / 180;
    return [centre + Math.cos(radians) * distance, centre + Math.sin(radians) * distance];
  };
  return <figure className="geometry-visual spinner-2023">
    <svg viewBox="0 0 300 300" role="img" aria-labelledby="spinner-2023-title spinner-2023-desc">
      <title id="spinner-2023-title">Twelve-sector prize spinner</title>
      <desc id="spinner-2023-desc">Five equal sectors show six euro, three show nine euro, and four show zero euro.</desc>
      {prizes.map((prize, index) => {
        const start = point(index * 30, radius);
        const end = point((index + 1) * 30, radius);
        const label = point(index * 30 + 15, 78);
        return <g key={index}>
          <path d={`M ${centre} ${centre} L ${start[0]} ${start[1]} A ${radius} ${radius} 0 0 1 ${end[0]} ${end[1]} Z`}
            fill={prize === 0 ? "#f5f3ec" : prize === 6 ? "#e3f0e8" : "#f8eed1"} stroke="#9ead9f" strokeWidth="1" />
          <text x={label[0]} y={label[1] + 5} textAnchor="middle">€{prize}</text>
        </g>;
      })}
      <circle cx={centre} cy={centre} r="5" fill="#263c34" />
    </svg>
    <figcaption>Each of the 12 sectors is equally likely: five show €6, three show €9, and four show €0. Each spin is a new play.</figcaption>
  </figure>;
}
