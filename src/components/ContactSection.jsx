import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';

const contactInfo = [
  {
    icon: FaWhatsapp,
    label: 'واتساب',
    value: '01092951265',
    href: 'https://wa.me/201092951265',
    color: '#25D366',
  },
  {
    icon: FiPhone,
    label: 'هاتف',
    value: '01092951265',
    href: 'tel:01092951265',
    color: '#D4AF37',
  },
  {
    icon: FiMail,
    label: 'البريد الإلكتروني',
    value: 'ebrahimwa63@gmail.com',
    href: 'mailto:ebrahimwa63@gmail.com',
    color: '#D4AF37',
  },
  {
    icon: FiClock,
    label: 'ساعات العمل',
    value: 'يومياً من 9 ص - 9 م',
    href: null,
    color: '#D4AF37',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium tracking-wider mb-3 block" style={{ color: '#D4AF37' }}>
            نحن هنا لمساعدتك
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-text)' }}>
            تواصل <span className="gold-gradient-text">معنا</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to left, #D4AF37, transparent)' }} />
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.1)' }}
              className="group"
            >
              {info.href ? (
                <a
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block p-8 rounded-2xl transition-all text-center h-full"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${info.color}15` }}
                  >
                    <info.icon className="w-8 h-8" style={{ color: info.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>{info.label}</h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{info.value}</p>
                </a>
              ) : (
                <div
                  className="p-8 rounded-2xl text-center h-full"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${info.color}15` }}
                  >
                    <info.icon className="w-8 h-8" style={{ color: info.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>{info.label}</h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{info.value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social Media */}
        <motion.div
          className="flex justify-center gap-8 mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/knooz', color: '#1877F2' },
            { icon: FaInstagram, label: 'Instagram', href: '#', color: '#E4405F' },
            { icon: FiMail, label: 'Email', href: 'mailto:ebrahimwa63@gmail.com', color: '#D4AF37' },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-5 rounded-2xl transition-all"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                boxShadow: 'var(--shadow-sm)',
              }}
              whileHover={{
                scale: 1.15,
                backgroundColor: `${social.color}15`,
                color: social.color,
                borderColor: social.color,
                boxShadow: `0 10px 20px -5px ${social.color}20`,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon className="w-7 h-7" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
