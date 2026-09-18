import type { HTMLAttributes } from "react";

// React's current JSX types omit native MathML tags used by the challenge.
type MathMLProps = HTMLAttributes<MathMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      math: MathMLProps;
      mi: MathMLProps;
      mn: MathMLProps;
      mo: MathMLProps;
      mrow: MathMLProps;
      mfrac: MathMLProps;
      msup: MathMLProps;
    }
  }
}
