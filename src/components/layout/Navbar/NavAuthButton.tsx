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
        variant="outline"
        className="border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 cursor-pointer"
      >
        Logout
      </Button>
    ) : (
      <Button
        onClick={() => (location.href = '/login')}
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:brightness-110 text-white font-semibold shadow-lg transition duration-300 cursor-pointer"
      >
        Login
      </Button>
    )}
  </motion.div>
);
