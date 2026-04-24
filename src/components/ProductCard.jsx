import { motion } from 'framer-motion';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index }) {
  const { addItem, generateSingleProductMessage } = useCart();

  const whatsappUrl = `https://wa.me/201092951265?text=${generateSingleProductMessage(product.name)}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
      }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.1)' }}
    >
      {/* Badge */}
      {product.badge && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.05 }}
          className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-gray-900"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #F5E6A3)' }}
        >
          {product.badge}
        </motion.div>
      )}

      {/* Image */}
      <div className="relative h-80 overflow-hidden bg-gray-50 dark:bg-gray-900/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full text-white"
            style={{ backgroundColor: '#25D366' }}
          >
            <FaWhatsapp className="w-5 h-5" />
          </motion.a>
          <motion.button
            onClick={() => addItem(product)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full text-gray-900"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <FiShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: `linear-gradient(to top, var(--color-card), transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-lg font-bold line-clamp-1"
            style={{ color: 'var(--color-text)' }}
          >
            {product.name}
          </h3>
        </div>

        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div>
            <span className="text-xl font-black text-[#D4AF37]">{product.price}</span>
            <span className="text-sm mr-1" style={{ color: 'var(--color-text-muted)' }}>ج.م</span>
          </div>
          <motion.button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-gray-900 transition-all"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #E8CF6D)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>أضف للسلة</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
