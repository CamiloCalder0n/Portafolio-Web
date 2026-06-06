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

  // Movimiento editorial-suave (pivot a lukebaffait): salidas largas y calmadas.
  CustomEase.create("jc.soft", "0.16, 1, 0.3, 1"); // expo-out: reveals/parallax
  CustomEase.create("jc.editorial", "0.22, 1, 0.36, 1"); // entradas suaves de UI
  CustomEase.create("jc.curtain", "0.7, 0, 0.2, 1"); // transiciones de cortina
  // Tipo Apple: ease-in-out de pico de velocidad bajo (arranque y frenado muy
  // suaves), para transiciones grandes que no deben sentirse bruscas.
  CustomEase.create("jc.apple", "0.62, 0, 0.2, 1");
}

export * from "gsap";
export { ScrollTrigger, CustomEase, SplitText };

