import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

  // Easings personalizados — la firma de movimiento de Juan Camilo
  CustomEase.create("jc.smooth", "0.45, 0.05, 0.55, 0.95");
  CustomEase.create("jc.snappy", "0.25, 0.46, 0.45, 0.94");
  CustomEase.create("jc.dramatic", "0.76, 0, 0.24, 1");
}

export * from "gsap";
export { ScrollTrigger, CustomEase, SplitText };

