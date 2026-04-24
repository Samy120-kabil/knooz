import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none"
      style={{
        backgroundColor: isDark ? '#2A2A40' : '#E5E7EB',
        border: `1px solid ${isDark ? '#D4AF37' : '#D1D5DB'}`,
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="تبديل الوضع"
      id="theme-toggle"
    >
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: '#D4AF37',
          boxShadow: '0 0 8px rgba(212, 175, 55, 0.4)',
        }}
        animate={{
          x: isDark ? 0 : 26,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <FiMoon className="w-3 h-3 text-gray-900" />
        ) : (
          <FiSun className="w-3 h-3 text-gray-900" />
        )}
      </motion.div>
    </motion.button>
  );
}
