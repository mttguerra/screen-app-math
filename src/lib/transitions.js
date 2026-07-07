export const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
  }),
}

export const slideTransition = {
  type: 'tween',
  ease: [0.32, 0.72, 0, 1],
  duration: 0.32,
}
