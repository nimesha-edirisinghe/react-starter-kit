import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Badge } from '~/components/ui/badge';

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

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

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-rose-100 via-sky-100 to-lime-100 select-none">
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent leading-tight drop-shadow-md">
              Welcome to
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-sm">
                React Starter Kit
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Build modern web applications with the power of React, TypeScript, and cutting-edge
              tools.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              'React',
              'TypeScript',
              'TanStack Query',
              'TanStack Router',
              'Tailwind CSS',
              'Shadcn UI',
              'Axios',
              'Zustand',
              'MSW'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-white/80 text-slate-800 border border-slate-200 hover:bg-white transition-colors shadow-sm"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
