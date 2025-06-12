import { motion } from 'framer-motion';
import { NavLink } from './NavLink';
import { MultiNavLink } from './MultiNavLink';

export const NavLinks = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="hidden md:flex items-center gap-2"
  >
    <NavLink to="/" label="Home" exact />
    <NavLink to="/todo" label="Todos" />
    <NavLink to="/posts" label="Posts" />
    <NavLink to="/users" label="Users" />
    <MultiNavLink to="/route-a" label="Pathless Layout" matchPaths={['/route-a', '/route-b']} />
    <NavLink to="/deferred" label="Deferred" />
    <NavLink to="/this-route-does-not-exist" label="Broken Route" />
  </motion.div>
);
