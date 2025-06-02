import { motion } from 'framer-motion';
import { NavLink } from './NavLink';

export const NavLinks = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="hidden md:flex items-center gap-2"
  >
    <NavLink to="/" label="Home" exact />
    <NavLink to="/todo" label="Todos" />
    <NavLink to="/posts" label="Posts" />
    <NavLink to="/users" label="Users" />
    <NavLink to="/route-a" label="Pathless Layout" />
    <NavLink to="/deferred" label="Deferred" />
    <NavLink to="/this-route-does-not-exist" label="Broken Route" />
  </motion.div>
);
