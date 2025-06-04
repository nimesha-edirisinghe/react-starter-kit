import { motion } from 'framer-motion';
import { Badge } from '~/components/ui/badge';

export const TechBadges = () => {
  const stack = [
    'React',
    'TypeScript',
    'TanStack Query',
    'TanStack Router',
    'Tailwind CSS',
    'Shadcn UI',
    'Axios',
    'Zustand',
    'MSW'
  ];

  return (
    <motion.div className="flex flex-wrap justify-center gap-3 mt-8">
      {stack.map((tech, index) => (
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
  );
};
