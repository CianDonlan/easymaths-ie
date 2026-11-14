export function WebStageTable() {
  return <div className="web-table-wrap"><table className="web-stage-table"><caption>First three stages of the silk model, in centimetres</caption><thead><tr><th scope="col">Stage</th><th scope="col">1</th><th scope="col">2</th><th scope="col">3</th></tr></thead><tbody><tr><th scope="row">S(n), total silk</th><td>15.8</td><td>37.8</td><td>66</td></tr><tr><th scope="row">A(n), extra silk</th><td>15.8</td><td>?</td><td>?</td></tr></tbody></table></div>;
}

export function WebOrbitals() {
  return <div className="web-orbitals" aria-label="Schematic of the first three orbitals of the web">
    <svg viewBox="0 0 400 170" role="img" aria-labelledby="orbitals-title orbitals-desc">
      <title id="orbitals-title">Three successive orbitals</title>
      <desc id="orbitals-desc">Three line segments O1, O2, and O3 in order. The drawing is schematic and does not set their lengths to scale.</desc>
      <line x1="95" y1="35" x2="255" y2="35" /><line x1="95" y1="85" x2="270" y2="85" /><line x1="95" y1="135" x2="285" y2="135" />
      <text x="20" y="41">O₁</text><text x="20" y="91">O₂</text><text x="20" y="141">O₃</text>
      <text x="295" y="41">0.5 cm</text><text x="295" y="91">0.53 cm</text><text x="295" y="141">?</text>
    </svg>
    <p>Successive orbital lengths form a geometric sequence. The drawing is schematic.</p>
  </div>;
}
