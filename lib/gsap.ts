import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip, SplitText, MorphSVGPlugin);

export { gsap, ScrollTrigger, ScrollSmoother, Flip, SplitText, MorphSVGPlugin };
