import { motion } from 'framer-motion';
import { categories } from '../data/products';

export default function ProductFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className="relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: activeCategory === cat.id ? '#D4AF37' : 'var(--color-surface)',
            color: activeCategory === cat.id ? '#1a1a2e' : 'var(--color-text)',
            border: `1px solid ${activeCategory === cat.id ? '#D4AF37' : 'var(--color-border)'}`,
            boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(212, 175, 55, 0.3)' : 'none',
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          id={`filter-${cat.id}`}
        >
          <span className="flex items-center gap-2">
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </span>
          {activeCategory === cat.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #E8CF6D)',
                zIndex: -1,
              }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
