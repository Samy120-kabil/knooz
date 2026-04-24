import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    items, isOpen, totalItems, totalPrice,
    updateQuantity, removeItem, clearCart,
    closeCart, generateWhatsAppMessage
  } = useCart();

  const whatsappUrl = `https://wa.me/201092951265?text=${generateWhatsAppMessage()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: 'var(--color-overlay)' }}
            onClick={closeCart}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[70] flex flex-col"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderLeft: '1px solid var(--color-border)',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-6"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                  سلة المشتريات
                </h2>
                {totalItems > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4AF37] text-gray-900">
                    {totalItems}
                  </span>
                )}
              </div>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <FiX className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-lg font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      السلة فارغة
                    </p>
                    <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
                      أضف بعض المنتجات لتبدأ التسوق
                    </p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, scale: 0.8 }}
                      className="flex gap-4 p-4 rounded-xl"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm truncate" style={{ color: 'var(--color-text)' }}>
                          {item.name}
                        </h3>
                        <p className="text-sm font-bold text-[#D4AF37] mt-1">
                          {item.price * item.quantity} ج.م
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-md"
                            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                          >
                            <FiMinus className="w-3.5 h-3.5" style={{ color: 'var(--color-text)' }} />
                          </motion.button>
                          <span className="text-sm font-bold w-6 text-center" style={{ color: 'var(--color-text)' }}>
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md"
                            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                          >
                            <FiPlus className="w-3.5 h-3.5" style={{ color: 'var(--color-text)' }} />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => removeItem(item.id)}
                            className="p-1 rounded-md mr-auto text-red-500 hover:bg-red-500/10"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-6 space-y-4"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                    الإجمالي
                  </span>
                  <span className="text-2xl font-black text-[#D4AF37]">
                    {totalPrice} ج.م
                  </span>
                </div>

                {/* WhatsApp Order */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-white transition-all"
                  style={{ backgroundColor: '#25D366' }}
                  whileHover={{ scale: 1.02, boxShadow: '0 5px 20px rgba(37, 211, 102, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span>اطلب عبر واتساب</span>
                </motion.a>

                {/* Clear */}
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm transition-colors hover:text-red-500"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  مسح السلة
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
