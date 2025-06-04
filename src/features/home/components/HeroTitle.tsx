import { motion } from 'framer-motion';

export const HeroTitle = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent leading-tight drop-shadow-md">
        Welcome to
        <br />
        <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-sm">
          React Starter Kit
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Build modern web applications with the power of React, TypeScript, and cutting-edge tools.
      </p>
    </motion.div>
  );
};
