export function SurveyVenn() {
  return <figure className="survey-venn">
    <svg viewBox="0 0 600 350" role="img" aria-labelledby="survey-venn-title survey-venn-desc">
      <title id="survey-venn-title">Survey of 240 people who visited countries A, B, and C</title>
      <desc id="survey-venn-desc">A only: 23. B only: 56. C only: 41. A and B only: 18. A and C only: 13. B and C only: 16. All three: 6. None: 67.</desc>
      <rect x="20" y="20" width="560" height="310" />
      <ellipse cx="215" cy="145" rx="155" ry="85" />
      <ellipse cx="385" cy="145" rx="155" ry="85" />
      <ellipse cx="300" cy="225" rx="165" ry="85" />
      <text className="set-label" x="83" y="75">A</text><text className="set-label" x="500" y="75">B</text><text className="set-label" x="455" y="285">C</text>
      <text x="135" y="133">23</text><text x="300" y="92">18</text><text x="470" y="133">56</text>
      <text x="224" y="194">13</text><text x="300" y="176">6</text><text x="376" y="194">16</text>
      <text x="300" y="270">41</text><text x="70" y="293">67</text><text className="set-label" x="520" y="43">U = 240</text>
    </svg>
    <figcaption>Region counts: A only 23; B only 56; C only 41; A and B only 18; A and C only 13; B and C only 16; all three 6; none 67.</figcaption>
  </figure>;
}
