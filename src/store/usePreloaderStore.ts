import { create } from "zustand";

interface PreloaderState {
  /** True cuando el preloader terminó su animación y el sitio está revelado. */
  isComplete: boolean;
  /** Marca el preloader como terminado. Lo llaman tanto el flujo normal como el skip de reduced-motion. */
  complete: () => void;
}

/**
 * Estado global del preloader. Otros componentes pueden suscribirse a `isComplete`
 * para disparar sus animaciones de entrada solo cuando el curtain reveal terminó.
 */
export const usePreloaderStore = create<PreloaderState>((set) => ({
  isComplete: false,
  complete: () => set({ isComplete: true }),
}));
