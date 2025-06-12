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
      <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight drop-shadow-md">
        Welcome to
        <br />
        <span className="text-foreground drop-shadow-sm">React Starter Kit</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Build modern web applications with the power of React, TypeScript, and cutting-edge tools.
      </p>
    </motion.div>
  );
};
