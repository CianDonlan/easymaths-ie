export function CongruentTrianglesDiagram() {
  return <figure className="geometry-visual">
    <svg viewBox="0 0 480 300" role="img" aria-labelledby="triangles-title triangles-desc">
      <title id="triangles-title">Triangles ACD and BCE</title>
      <desc id="triangles-desc">A, C and B lie on a straight line, with C the midpoint of AB. D, C and E lie on another straight line. AD is parallel to EB. The two triangles meet at C.</desc>
      <line x1="40" y1="160" x2="440" y2="160" />
      <line x1="100" y1="70" x2="380" y2="250" />
      <line x1="40" y1="160" x2="100" y2="70" />
      <line x1="440" y1="160" x2="380" y2="250" />
      <text x="23" y="171">A</text><text x="229" y="180">C</text><text x="443" y="171">B</text>
      <text x="87" y="56">D</text><text x="379" y="272">E</text>
    </svg>
    <figcaption>Given: C is the midpoint of AB; AD is parallel to EB; D, C and E are collinear.</figcaption>
  </figure>;
}

export function EnlargementDiagram({ shaded = false }: { shaded?: boolean }) {
  return <figure className="geometry-visual enlargement-visual">
    <svg viewBox="0 0 560 290" role="img" aria-labelledby="enlargement-title enlargement-desc">
      <title id="enlargement-title">Parallelogram enlargement from centre X</title>
      <desc id="enlargement-desc">X, P, P prime, Q and Q prime lie on one horizontal line. PQRS is enlarged by scale factor 1.5 about X to P prime Q prime R prime S prime. {shaded ? "The region P prime Q R Y is shaded, where Y is the intersection of S R and P prime S prime." : ""}</desc>
      {shaded && <polygon className="geometry-shaded" points="215,240 355,240 300,130 160,130" />}
      <polyline className="geometry-guide" points="35,240 132.5,75" />
      <polyline className="geometry-guide" points="35,240 432.5,75" />
      <polyline className="geometry-original" points="155,240 355,240 300,130 100,130 155,240" />
      <polyline className="geometry-enlarged" points="215,240 515,240 432.5,75 132.5,75 215,240" />
      <circle cx="35" cy="240" r="4" />
      <text x="25" y="263">X</text><text x="148" y="263">P</text><text x="209" y="263">P′</text>
      <text x="348" y="263">Q</text><text x="506" y="263">Q′</text>
      <text x="87" y="122">S</text><text x="119" y="64">S′</text>
      <text x="298" y="122">R</text><text x="429" y="65">R′</text>
      {shaded && <text x="156" y="119">Y</text>}
    </svg>
    <figcaption>{shaded ? "Shaded region P′QRY. The diagram is schematic; use the given lengths and areas." : "P′Q′R′S′ is the enlargement of PQRS about X. The diagram is schematic."}</figcaption>
  </figure>;
}
