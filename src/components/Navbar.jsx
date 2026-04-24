import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';

const navLinks = [
  { id: 'home', label: 'الرئيسية', href: '#home' },
  { id: 'products', label: 'المنتجات', href: '#products' },
  { id: 'about', label: 'من نحن', href: '#about' },
  { id: 'testimonials', label: 'آراء العملاء', href: '#testimonials' },
  { id: 'contact', label: 'تواصل معنا', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div
        className="hidden md:block w-full py-2 px-6 text-sm"
        style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="mailto:ebrahimwa63@gmail.com"
              className="flex items-center gap-2 transition-colors hover:text-[#D4AF37]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <FiMail className="w-4 h-4" />
              <span>ebrahimwa63@gmail.com</span>
            </a>
            <a
              href="tel:01092951265"
              className="flex items-center gap-2 transition-colors hover:text-[#D4AF37]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <FiPhone className="w-4 h-4" />
              <span>01092951265</span>
            </a>
          </div>
          <span style={{ color: 'var(--color-text-muted)' }}>مرحباً بكم في كنوز ✨</span>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg' : ''
        }`}
        style={{
          backgroundColor: isScrolled ? undefined : 'var(--color-bg)',
          borderBottom: isScrolled ? undefined : '1px solid var(--color-border)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-[#D4AF37]"
                  style={{ color: 'var(--color-text-secondary)' }}
                  id={`nav-${link.id}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Cart Button */}
              <motion.button
                onClick={openCart}
                className="relative p-2.5 rounded-xl transition-colors"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="cart-button"
              >
                <FiShoppingCart className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#D4AF37] text-[10px] text-gray-900 font-bold flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl transition-colors"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                id="mobile-menu-button"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
                ) : (
                  <FiMenu className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block px-4 py-3 rounded-lg text-base font-medium transition-colors hover:text-[#D4AF37]"
                    style={{ color: 'var(--color-text)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-3 mt-3 flex items-center gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <a href="tel:01092951265" className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <FiPhone className="w-4 h-4 text-[#D4AF37]" />
                    01092951265
                  </a>
                  <a href="mailto:ebrahimwa63@gmail.com" className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <FiMail className="w-4 h-4 text-[#D4AF37]" />
                    البريد
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
