import type { Variants, Transition } from "framer-motion";

// ✅ 1. Animación de transición de página tipo "slide"
export const transitionVariantsPage: Variants = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    x: "0%",
    width: "0%",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

// ✅ 2. Transición personalizada para sección About
export const motionTransitionsAbout: Variants = {
  initial: {
    opacity: 0,
    bottom: "5rem",
    transform: "translateY(200px)",
  },
  animate: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: {
      duration: 2.3,
      type: "tween" as const,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
};

// ✅ 3. Función fadeIn reutilizable con posición
export const fadeIn = (position: "bottom" | "right"): Variants => {
  const sharedTransition: Transition = {
    type: "tween" as const,
    duration: 1.4,
    delay: 0.5,
    ease: [0.25, 0.25, 0.25, 0.75],
  };

  return {
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: sharedTransition,
    },
    hidden: {
      y: position === "bottom" ? -80 : 0,
      x: position === "right" ? 80 : 0,
      opacity: 0,
      transition: {
        ...sharedTransition,
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 0.25],
      },
    },
  };
};
