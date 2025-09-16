import { easeOut } from "framer-motion";

const DEFAULT_EASE = easeOut;
const DEFAULT_STAGGER = 0.16;
const DEFAULT_BOUNCE = 0.5;
const DEFAULT_DELAY = 0;
const DEFAULT_DURATION = 0.8;

export const animSet = {
  slideUp: ({
    y = 100,
    width = "50%",
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    bounce = DEFAULT_BOUNCE,
  }) => ({
    hidden: { opacity: 0, y, width },
    visible: {
      opacity: 1,
      y: 0,
      width: "100%",
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
  slideDown: ({
    y = -100,
    width = "50%",
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    bounce = DEFAULT_BOUNCE,
  }) => ({
    hidden: { opacity: 0, y, width },
    visible: {
      opacity: 1,
      y: 0,
      width: "auto",
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
  slideLeft: ({
    x = 100,
    width = "50%",
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    bounce = DEFAULT_BOUNCE,
  }) => ({
    hidden: { opacity: 0, x, width },
    visible: {
      opacity: 1,
      x: 0,
      width: "auto",
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
  slideRight: ({
    x = -100,
    width = "50%",
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    bounce = DEFAULT_BOUNCE,
  }) => ({
    hidden: { opacity: 0, x, width },
    visible: {
      opacity: 1,
      x: 0,
      width: "auto",
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
  fade: ({
    durationIn = DEFAULT_DURATION,
    durationOut = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
  }) => ({
    out: {
      opacity: 0,
      display: "none",
      transition: {
        duration: durationOut,
        delay,
        ease: DEFAULT_EASE,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
    in: {
      opacity: 1,
      display: "block",
      transition: {
        duration: durationIn,
        delay,
        ease: DEFAULT_EASE,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
  scaleIn: ({
    scale = 0,
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    bounce = DEFAULT_BOUNCE,
  }) => ({
    hidden: { opacity: 0, scale },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
  scaleX: ({
    scaleX = 0,
    scaleXDes = 1,
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    bounce = DEFAULT_BOUNCE,
  }) => ({
    hidden: { scaleX },
    visible: {
      scaleX: scaleXDes,
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
  rotate: ({
    rotate = 180,
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    bounce = DEFAULT_BOUNCE,
  }) => ({
    hidden: { opacity: 0, rotate },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
  expand: ({
    height = 0,
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    bounce = DEFAULT_BOUNCE,
  }) => ({
    expanded: {
      height: "fit-content",
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
    collapsed: {
      height,
      transition: {
        duration,
        ease: DEFAULT_EASE,
        bounce,
        delay,
        when: "beforeChildren",
        staggerChildren: DEFAULT_STAGGER,
      },
    },
  }),
} as const;
