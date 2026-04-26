import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiPhone, FiMail, FiSearch } from 'react-icons/fi';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';

const navLinks = [
  { id: 'home', label: 'الرئيسية', href: '#home' },
  { id: 'products', label: 'المنتجات', href: '#products' },
  { id: 'about', label: 'من نحن', href: '#about' },
  { id: 'testimonials', label: 'آراء العملاء', href: '#reviews' },
  { id: 'contact', label: 'تواصل معنا', href: '#contact' },
];

export default function Navbar({ onSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        if (elem) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = elem.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar - Minimal & Clean */}
      <div className="w-full bg-[#0F0F1A] text-white py-2 px-4 md:px-8 border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] md:text-sm font-medium">
          <div className="flex items-center gap-6 md:gap-10">
            <a href="mailto:ebrahimwa63@gmail.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors group">
              <FiMail className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="opacity-80">ebrahimwa63@gmail.com</span>
            </a>
            <a href="tel:01092951265" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors group">
              <FiPhone className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="opacity-80">01092951265</span>
            </a>
          </div>
          <div className="hidden sm:block text-[#D4AF37] font-bold tracking-wide">
            شركة كنوز للتجارة ✨
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`w-full transition-all duration-300 ${
          isScrolled ? 'glass shadow-2xl py-1' : 'bg-[var(--color-bg)] py-2'
        }`}
        style={{ borderBottom: isScrolled ? 'none' : '1px solid var(--color-border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Logo - compact on all screens */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="shrink-0 scale-80 md:scale-90 transition-all hover:opacity-90 origin-right">
              <Logo size="sm" />
            </a>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xs relative group">
              <input
                type="text"
                placeholder="ابحث هنا..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs transition-all bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[#D4AF37] outline-none text-right"
                style={{ direction: 'rtl', color: 'var(--color-text)' }}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[#D4AF37] w-4 h-4 transition-colors" />
            </div>

            {/* Desktop Nav Links - Increased Spacing */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-2 py-1 text-xs font-black transition-all hover:text-[#D4AF37] group"
                  style={{ color: 'var(--color-text)' }}
                >
                  {link.label}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#D4AF37] transition-all"
              >
                <FiShoppingCart className="w-5 h-5 text-[var(--color-text)]" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-[#D4AF37] text-[10px] text-gray-900 font-bold flex items-center justify-center shadow-lg"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile-only search bar — always visible on small screens */}
          <div className="md:hidden pb-2 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[#D4AF37] outline-none text-right"
                style={{ direction: 'rtl', color: 'var(--color-text)' }}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] w-4 h-4" />
            </div>
          </div>
          </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="lg:hidden absolute top-full right-0 w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-2xl py-6 px-6"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-6 py-4 rounded-2xl text-lg font-black bg-[var(--color-bg)] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all border border-[var(--color-border)]"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
