export function Basin2023Diagram() {
  return <figure className="geometry-visual basin-2023">
    <svg viewBox="0 0 540 350" role="img" aria-labelledby="basin-2023-title basin-2023-desc">
      <title id="basin-2023-title">Conical basin cut from a larger cone</title>
      <desc id="basin-2023-desc">The original cone has a top radius of 15 centimetres. The basin is a frustum with top radius 15 centimetres, bottom radius 12 centimetres and slant height 10 centimetres. The removed smaller cone extends from the basin's bottom edge to vertex B.</desc>
      <rect width="540" height="350" fill="white" />
      <path d="M 77 66 L 183 181 L 246 297 L 309 181 L 415 66" fill="none" stroke="#8b988b" strokeWidth="1.6" strokeDasharray="6 5" />
      <path d="M 77 66 L 183 181 Q 246 208 309 181 L 415 66" fill="#e8f2e9" stroke="#263c34" strokeWidth="2" />
      <ellipse cx="246" cy="66" rx="169" ry="31" fill="#f7fbf7" stroke="#263c34" strokeWidth="2" />
      <path d="M 183 181 A 63 20 0 0 1 309 181" fill="none" stroke="#263c34" strokeWidth="1.5" />
      <path d="M 183 181 A 63 20 0 0 0 309 181" fill="none" stroke="#8b988b" strokeWidth="1.3" strokeDasharray="4 4" />
      <line x1="246" y1="66" x2="415" y2="66" stroke="#8b988b" strokeWidth="1.5" />
      <line x1="246" y1="181" x2="309" y2="181" stroke="#8b988b" strokeWidth="1.5" />
      <line x1="246" y1="66" x2="246" y2="297" stroke="#8b988b" strokeWidth="1.3" strokeDasharray="4 4" />
      <text x="236" y="57">A</text><text x="425" y="66">C</text><text x="232" y="176">D</text><text x="318" y="186">E</text><text x="235" y="316">B</text>
      <text x="312" y="55">15 cm</text><text x="261" y="171">12 cm</text><text x="382" y="140">10 cm</text>
      <text x="39" y="333">Original cone and removed tip shown with dashed lines</text>
    </svg>
    <figcaption>The basin has an open top and a circular base. The original cone has radius 15 cm; the base radius is 12 cm, and the basin's slant height CE is 10 cm. Sketch not to scale.</figcaption>
  </figure>;
}
