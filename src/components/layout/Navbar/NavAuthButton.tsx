import { motion } from 'framer-motion';
import { Button } from '~/components/ui/button';

type Props = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

export const NavAuthButton = ({ isAuthenticated, onLogout }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
    className="ml-auto"
  >
    {isAuthenticated ? (
      <Button
        onClick={onLogout}
        variant="link"
        className=" transition-all duration-300 cursor-pointer"
      >
        Logout
      </Button>
    ) : (
      <Button
        onClick={() => (location.href = '/login')}
        className="transition duration-300 cursor-pointer"
        variant="link"
      >
        Login
      </Button>
    )}
  </motion.div>
);
