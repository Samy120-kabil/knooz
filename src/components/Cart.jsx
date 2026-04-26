import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingCart, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { urlFor } from '../sanityClient';

export default function Cart() {
  const {
    items, isOpen, totalItems, totalPrice,
    updateQuantity, removeItem, clearCart,
    closeCart, generateWhatsAppMessage
  } = useCart();

  // The context already encodes the message, so we just append it
  const whatsappUrl = `https://wa.me/201092951265?text=${generateWhatsAppMessage()}`;

  const getItemImage = (item) => {
    if (item.image && typeof item.image === 'object') {
      return urlFor(item.image).width(100).url();
    }
    return item.image;
  };

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
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <FiShoppingCart className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-xl font-bold text-[var(--color-text)]">سلة المشتريات</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37] text-gray-900">
                  {totalItems}
                </span>
              </div>
              <button onClick={closeCart} className="p-2 rounded-xl hover:bg-[var(--color-bg)] transition-colors">
                <FiX className="w-6 h-6 text-[var(--color-text)]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-20">
                    <FiShoppingCart className="w-16 h-16 mb-4" />
                    <p className="text-lg font-bold">السلة فارغة حالياً</p>
                    <p className="text-sm">ابدأ بإضافة بعض المنتجات المميزة</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item._id || item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-4 p-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]"
                    >
                      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-white flex items-center justify-center p-2">
                        <img
                          src={getItemImage(item)}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-[var(--color-text)] line-clamp-1">{item.name}</h3>
                          <p className="text-xs font-bold text-[#D4AF37] mt-1">
                            {item.price} ج.م
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-[var(--color-surface)] rounded-lg p-1 border border-[var(--color-border)]">
                            <button
                              onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                              className="p-1 hover:text-[#D4AF37] transition-colors"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                              className="p-1 hover:text-[#D4AF37] transition-colors"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item._id || item.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-bg)] space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[var(--color-text-secondary)]">الإجمالي</span>
                  <span className="text-2xl font-black text-[#D4AF37]">{totalPrice} ج.م</span>
                </div>

                {/* Order via WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white bg-[#25D366] hover:opacity-90 shadow-lg shadow-[#25D366]/20 transition-all"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span>اطلب عبر واتساب</span>
                </a>

                {/* Order via Email */}
                <a
                  href={`mailto:ebrahimwa63@gmail.com?subject=طلب جديد من موقع كنوز&body=${generateWhatsAppMessage()}`}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white bg-[#0F0F1A] border border-[#D4AF37]/30 hover:bg-[#1a1a2e] transition-all"
                >
                  <FiMail className="w-6 h-6 text-[#D4AF37]" />
                  <span>إتمام الطلب عبر الإيميل</span>
                </a>

                <button
                  onClick={clearCart}
                  className="w-full text-[10px] font-bold text-[var(--color-text-muted)] hover:text-red-500 transition-colors pt-2"
                >
                  مسح محتويات السلة
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
