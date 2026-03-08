import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Moon, Sun, User, LogOut } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-zinc-950/80 dark:bg-zinc-950/80 light:bg-white/80 border-b border-zinc-800/50 dark:border-zinc-800/50 light:border-zinc-200/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                  <Film className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CastPro
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-6">
            {!isLanding && (
              <>
                <Link to="/actor">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      location.pathname.includes('actor')
                        ? 'bg-purple-600 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Actor
                  </motion.button>
                </Link>
                <Link to="/director">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      location.pathname.includes('director')
                        ? 'bg-pink-600 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Director
                  </motion.button>
                </Link>
                <Link to="/admin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      location.pathname.includes('admin')
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Admin
                  </motion.button>
                </Link>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-800/50 dark:bg-zinc-800/50 light:bg-zinc-200/50 text-zinc-400 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {!isLanding && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
