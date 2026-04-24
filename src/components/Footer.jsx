import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Gold line accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(to left, transparent, #D4AF37, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Logo size="md" />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              متجرك المتخصص في إكسسوارات المكاتب والمنتجات المعدنية عالية الجودة. الفخامة والجودة في كل تفصيلة.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-base font-bold" style={{ color: '#D4AF37' }}>
              روابط سريعة
            </h3>
            {['الرئيسية', 'المنتجات', 'من نحن', 'آراء العملاء', 'تواصل معنا'].map((link, i) => (
              <a
                key={i}
                href={`#${['home', 'products', 'about', 'testimonials', 'contact'][i]}`}
                className="block text-sm transition-colors hover:text-[#D4AF37] hover:translate-x-[-5px] duration-200"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {link}
              </a>
            ))}
          </motion.div>

          {/* Services */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-base font-bold" style={{ color: '#D4AF37' }}>
              خدماتنا
            </h3>
            {['إكسسوارات مكاتب فاخرة', 'مسامير وأدوات تثبيت', 'أرجل ومقابض مكاتب', 'كوالين ومجرى أدراج', 'خامات تجميع الأثاث'].map((service, i) => (
              <p
                key={i}
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {service}
              </p>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-base font-bold" style={{ color: '#D4AF37' }}>
              تواصل معنا
            </h3>
            <a
              href="tel:01092951265"
              className="flex items-center gap-3 text-sm transition-colors hover:text-[#D4AF37]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <FiPhone className="w-4 h-4 text-[#D4AF37]" />
              01092951265
            </a>
            <a
              href="https://wa.me/201092951265"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors hover:text-[#25D366]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
              واتساب
            </a>
            <a
              href="mailto:ebrahimwa63@gmail.com"
              className="flex items-center gap-3 text-sm transition-colors hover:text-[#D4AF37]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <FiMail className="w-4 h-4 text-[#D4AF37]" />
              ebrahimwa63@gmail.com
            </a>
            {/* Social */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: FaFacebookF, href: 'https://www.facebook.com/knooz', hoverColor: '#1877F2' },
                { icon: FaInstagram, href: '#', hoverColor: '#E4405F' },
                { icon: FaWhatsapp, href: 'https://wa.me/201092951265', hoverColor: '#25D366' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg transition-all"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}
                  whileHover={{ scale: 1.1, color: social.hoverColor, borderColor: social.hoverColor }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
          style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          <p>© {currentYear} كنوز. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صُنع بـ <span className="text-red-500">❤️</span> في مصر
          </p>
        </div>
      </div>
    </footer>
  );
}
