import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HeroTitle } from '~/features/home/components/HeroTitle';
import { TechBadges } from '~/features/home/components/TechBadges';

export const Route = createFileRoute('/')({
  component: Home
});

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-background select-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <HeroTitle />
          <TechBadges />
        </div>
      </motion.div>
    </div>
  );
}
