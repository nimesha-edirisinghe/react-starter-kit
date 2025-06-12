import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const NavLogo = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
  >
    <Link to="/" className="text-2xl font-bold text-primary transition-all duration-300">
      React Kit
    </Link>
  </motion.div>
);
