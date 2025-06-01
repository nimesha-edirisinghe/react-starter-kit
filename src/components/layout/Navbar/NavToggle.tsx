import { motion } from 'framer-motion';

export const NavToggle = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="md:hidden p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors"
    onClick={onClick}
  >
    <div className="w-6 h-6 flex flex-col justify-center gap-1">
      <div className="w-full h-0.5 bg-slate-700 rounded"></div>
      <div className="w-full h-0.5 bg-slate-700 rounded"></div>
      <div className="w-full h-0.5 bg-slate-700 rounded"></div>
    </div>
  </motion.button>
);
