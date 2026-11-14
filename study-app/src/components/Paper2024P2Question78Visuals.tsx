export function HotelNormalCurve() {
  const curve = Array.from({ length: 121 }, (_, index) => {
    const z = -3 + index / 20;
    return `${285 + z * 76},${178 - 127 * Math.exp(-z * z / 2)}`;
  }).join(" ");
  return <figure className="geometry-visual paper2024-p2-q78">
    <svg viewBox="0 0 570 235" role="img" aria-labelledby="hotel-normal-title hotel-normal-desc">
      <title id="hotel-normal-title">Normal distribution of hotel guest ages</title>
      <desc id="hotel-normal-desc">A bell curve has mean age 48.2 years. A marker for 50 years lies just right of the mean; the upper ten percent begins farther to the right at an unknown age A.</desc>
      <rect width="570" height="235" fill="white" />
      <line x1="35" y1="178" x2="540" y2="178" />
      <polyline className="geometry-original" points={curve} />
      <line className="geometry-guide" x1="285" y1="48" x2="285" y2="179" />
      <line className="geometry-guide" x1="298" y1="50" x2="298" y2="179" />
      <line className="geometry-guide" x1="382" y1="110" x2="382" y2="179" />
      <text x="251" y="206">μ = 48.2</text><text x="294" y="226">50</text><text x="377" y="206">A</text>
      <text x="397" y="153">upper 10%</text>
    </svg>
    <figcaption>For part (i), find the area left of age 50. For part (ii), find the age A with 10% to its right. Positions are schematic.</figcaption>
  </figure>;
}

export function HotelBookingTree() {
  return <figure className="geometry-visual paper2024-p2-q78 booking-tree-2024">
    <svg viewBox="0 0 640 300" role="img" aria-labelledby="booking-title booking-desc">
      <title id="booking-title">Hotel booking system probability tree</title>
      <desc id="booking-desc">A visitor sees the old system with probability 0.45 or the new system with probability 0.55. An old-system visitor books with probability one third. A new-system visitor books with probability two fifths.</desc>
      <rect width="640" height="300" fill="white" />
      <line x1="40" y1="145" x2="215" y2="67" /><line x1="40" y1="145" x2="215" y2="228" />
      <line x1="285" y1="67" x2="460" y2="30" /><line x1="285" y1="67" x2="460" y2="105" />
      <line x1="285" y1="228" x2="460" y2="190" /><line x1="285" y1="228" x2="460" y2="267" />
      <text x="105" y="92">0.45</text><text x="100" y="225">0.55</text>
      <text x="216" y="72">Old</text><text x="216" y="234">New</text>
      <text x="365" y="32">1/3</text><text x="365" y="100">2/3</text>
      <text x="365" y="185">2/5</text><text x="365" y="265">3/5</text>
      <text x="470" y="35">Booked</text><text x="470" y="111">Did not book</text>
      <text x="470" y="195">Booked</text><text x="470" y="273">Did not book</text>
    </svg>
    <figcaption>Follow the two “Booked” paths, then condition on the person having booked.</figcaption>
  </figure>;
}

export function OpenCylinderNetDiagram() {
  return <figure className="geometry-visual paper2024-p2-q78">
    <svg viewBox="0 0 530 245" role="img" aria-labelledby="cylinder-net-title cylinder-net-desc">
      <title id="cylinder-net-title">Open cylinder unrolled to a rectangle</title>
      <desc id="cylinder-net-desc">A cylinder with height 15 centimetres and radius 5 centimetres has only its curved side. Unrolling that side makes a rectangle whose sides are the height and the circular circumference.</desc>
      <rect width="530" height="245" fill="white" />
      <path d="M65 60 L65 177 M155 60 L155 177" fill="none" stroke="#1d2b27" strokeWidth="2" />
      <ellipse cx="110" cy="60" rx="45" ry="13" fill="#e7f1e9" stroke="#1d2b27" strokeWidth="2" />
      <path d="M65 177 C65 193 155 193 155 177" fill="none" stroke="#1d2b27" strokeWidth="2" />
      <line x1="95" y1="60" x2="140" y2="60" /><text x="106" y="48">r = 5</text>
      <text x="18" y="121">15 cm</text>
      <text x="219" y="128">→</text>
      <rect x="295" y="59" width="195" height="122" fill="#e7f1e9" stroke="#1d2b27" strokeWidth="2" />
      <text x="389" y="207">?</text><text x="430" y="125">15 cm</text>
    </svg>
    <figcaption>Only the curved surface is unrolled. One rectangle dimension is 15 cm; find the other from the base circumference.</figcaption>
  </figure>;
}

export function CylinderInSphereDiagram() {
  return <figure className="geometry-visual paper2024-p2-q78">
    <svg viewBox="0 0 480 315" role="img" aria-labelledby="sphere-cylinder-title sphere-cylinder-desc">
      <title id="sphere-cylinder-title">Central cross-section of a cylinder inside a sphere</title>
      <desc id="sphere-cylinder-desc">A rectangle representing the cylinder fits inside a circle representing the sphere. The cylinder height is 22 centimetres and diameter is 12 centimetres. The rectangle corners touch the circle.</desc>
      <rect width="480" height="315" fill="white" />
      <circle cx="240" cy="158" r="111" fill="#f8fbf7" stroke="#1d2b27" strokeWidth="2" />
      <rect x="185" y="62" width="110" height="192" fill="#e7f1e9" stroke="#1d2b27" strokeWidth="2" />
      <ellipse cx="240" cy="62" rx="55" ry="12" fill="#e7f1e9" stroke="#1d2b27" strokeWidth="1.5" />
      <ellipse cx="240" cy="254" rx="55" ry="12" fill="none" stroke="#1d2b27" strokeWidth="1.5" />
      <circle cx="240" cy="158" r="3" /><text x="119" y="165">22 cm</text>
      <line x1="185" y1="282" x2="295" y2="282" /><text x="208" y="303">12 cm</text>
    </svg>
    <figcaption>The sphere radius joins the centre to a cylinder edge. Use half the cylinder's height and half its diameter as the right-triangle legs.</figcaption>
  </figure>;
}

export function DoubleConeSphereDiagram() {
  return <figure className="geometry-visual paper2024-p2-q78">
    <svg viewBox="0 0 480 330" role="img" aria-labelledby="double-cone-title double-cone-desc">
      <title id="double-cone-title">Two cones in a sphere, shown in vertical cross-section</title>
      <desc id="double-cone-desc">A circle represents the sphere. C is at the top and D at the bottom of its vertical diameter. A and B are the left and right endpoints of the cones' common horizontal base. E is the intersection of AB and CD. The top cone is triangle ABC and the lower cone is triangle ADB.</desc>
      <rect width="480" height="330" fill="white" />
      <circle cx="240" cy="162" r="125" fill="#f8fbf7" stroke="#1d2b27" strokeWidth="2" />
      <path d="M240 37 L117 185 L363 185 Z M240 287 L117 185 L363 185 Z" fill="#e7f1e9" stroke="#1d2b27" strokeWidth="2" />
      <line className="geometry-guide" x1="240" y1="37" x2="240" y2="287" />
      <circle cx="240" cy="185" r="3" />
      <text x="229" y="27">C</text><text x="228" y="315">D</text>
      <text x="94" y="192">A</text><text x="369" y="192">B</text><text x="246" y="179">E</text>
      <text x="295" y="86">s</text>
    </svg>
    <figcaption>CD is the symmetry axis and a diameter of sphere cross-section s. The common base AB meets CD at E; EB = r and EC = h for the top cone.</figcaption>
  </figure>;
}
