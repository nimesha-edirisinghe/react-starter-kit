import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from './NavLink';

export const MobileNavMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md md:hidden flex flex-col p-6 pt-24"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 hover:text-slate-800 text-xl"
          aria-label="Close menu"
        >
          ✕
        </button>
        <div className="flex flex-col gap-4 text-lg text-slate-800">
          <NavLink to="/" label="Home" exact onClick={onClose} />
          <NavLink to="/todo" label="Todos" onClick={onClose} />
          <NavLink to="/posts" label="Posts" onClick={onClose} />
          <NavLink to="/users" label="Users" onClick={onClose} />
          <NavLink to="/route-a" label="Pathless Layout" onClick={onClose} />
          <NavLink to="/deferred" label="Deferred" onClick={onClose} />
          <NavLink to="/this-route-does-not-exist" label="Broken Route" onClick={onClose} />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
