import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  Flip,
  SplitText,
  MorphSVGPlugin,
  MotionPathPlugin
);

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  Flip,
  SplitText,
  MorphSVGPlugin,
  MotionPathPlugin,
};
