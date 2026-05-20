import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register plugins in environments with a window object (SSR safe)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export * from "gsap";
export { ScrollTrigger };
