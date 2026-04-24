import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/201092951265"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 p-4 rounded-full text-white shadow-lg whatsapp-pulse"
      style={{
        backgroundColor: '#25D366',
        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 1 }}
      id="whatsapp-float"
      aria-label="تواصل عبر واتساب"
    >
      <FaWhatsapp className="w-7 h-7" />
    </motion.a>
  );
}
