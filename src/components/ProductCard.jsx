import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { urlFor } from '../sanityClient';

export default function ProductCard({ product, index }) {
  const { addItem, generateSingleProductMessage } = useCart();

  const whatsappUrl = `https://wa.me/201092951265?text=${generateSingleProductMessage(product.name)}`;

  // Handle Sanity image or static path
  const imageUrl = product.image && typeof product.image === 'object' 
    ? urlFor(product.image).url() 
    : product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative flex flex-col h-full rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] shadow-md hover:shadow-xl transition-all duration-300 group"
    >
      {/* Badge - Fixed & Visible */}
      {product.badge && (
        <div className="absolute top-4 right-4 z-30 px-3 py-1.5 rounded-full text-[10px] font-black text-gray-900 bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] shadow-xl border border-black/5 animate-pulse-slow">
          {product.badge}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-white dark:bg-gray-900/50 flex items-center justify-center p-6">
        <img
          src={imageUrl}
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform shadow-lg"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>
          <button
            onClick={() => addItem(product)}
            className="p-3 rounded-full bg-[#D4AF37] text-gray-900 hover:scale-110 transition-transform shadow-lg"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-[var(--color-text)] mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-[#D4AF37]">{product.price}</span>
            <span className="text-xs font-bold text-[#D4AF37]/80">جنية مصري</span>
          </div>
          
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-gradient-to-r from-[#D4AF37] to-[#E8CF6D] hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>طلب الآن</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
