/// <reference types="vite/client" />

declare module "gsap-trial/SplitText" {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];

    constructor(
      target: string | Element | Array<string | Element>,
      vars?: {
        type?: string;
        linesClass?: string;
      }
    );

    revert(): void;
  }
}
