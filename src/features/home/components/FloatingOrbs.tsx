import { motion } from 'framer-motion';

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const FloatingOrbs = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_70%)] mix-blend-lighten pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.25),transparent_70%)] mix-blend-lighten pointer-events-none" />
    <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />

    <motion.div
      variants={floatingVariants}
      initial="initial"
      animate="animate"
      className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full opacity-60 blur-md"
    />
    <motion.div
      variants={floatingVariants}
      initial="initial"
      animate="animate"
      style={{ animationDelay: '1s' }}
      className="absolute top-32 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-40 blur-lg"
    />
    <motion.div
      variants={floatingVariants}
      initial="initial"
      animate="animate"
      style={{ animationDelay: '2s' }}
      className="absolute bottom-32 left-20 w-3 h-3 bg-purple-400 rounded-full opacity-50 blur-md"
    />
  </>
);
