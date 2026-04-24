import { motion } from 'framer-motion';

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { container: 'h-8', text: 'text-xl', diamond: 'w-8 h-8' },
    md: { container: 'h-10', text: 'text-2xl', diamond: 'w-10 h-10' },
    lg: { container: 'h-14', text: 'text-4xl', diamond: 'w-14 h-14' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer select-none"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Logo Icon - Geometric Diamond */}
      <div className={`relative ${s.diamond}`}>
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer diamond */}
          <motion.path
            d="M30 2 L58 30 L30 58 L2 30 Z"
            stroke="#D4AF37"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Inner diamond */}
          <motion.path
            d="M30 12 L48 30 L30 48 L12 30 Z"
            fill="url(#goldGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformOrigin: 'center' }}
          />
          {/* Center K letter stylized */}
          <motion.text
            x="30"
            y="35"
            textAnchor="middle"
            fill="#0F0F1A"
            fontSize="18"
            fontWeight="bold"
            fontFamily="Tajawal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ك
          </motion.text>
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F5E6A3" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Name */}
      <div className="flex flex-col leading-none">
        <motion.span
          className={`${s.text} font-black gold-gradient-text tracking-wide`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          كنوز
        </motion.span>
        <motion.span
          className="text-[10px] tracking-[0.3em] font-light"
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          KNOOZ
        </motion.span>
      </div>
    </motion.div>
  );
}
