import { motion } from 'framer-motion';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--color-hero-gradient-1) 0%, var(--color-hero-gradient-2) 50%, var(--color-hero-gradient-1) 100%)`,
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gold circles */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        {/* Diamond pattern */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 rotate-45 opacity-10"
          style={{ backgroundColor: '#D4AF37' }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-3 h-3 rotate-45 opacity-10"
          style={{ backgroundColor: '#D4AF37' }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 rotate-45 opacity-10"
          style={{ backgroundColor: '#D4AF37' }}
          animate={{ y: [0, -25, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#D4AF37',
              }}
            >
              <FiStar className="w-4 h-4" />
              <span>الجودة والفخامة في كل تفصيلة</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span style={{ color: 'var(--color-text)' }}>اكتشف عالم </span>
              <span className="gold-shimmer">الفخامة</span>
              <br />
              <span style={{ color: 'var(--color-text)' }}>مع </span>
              <span className="gold-gradient-text">كنوز</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl leading-relaxed max-w-lg"
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              متجرك المتخصص في إكسسوارات المكاتب والمنتجات المعدنية عالية الجودة. 
              نجمع بين دقة الصناعة وجودة الخامات لتوفير أفضل الحلول لمشاريعك.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <motion.a
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-gray-900 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F5E6A3, #D4AF37)',
                  backgroundSize: '200% 200%',
                }}
                whileHover={{ scale: 1.03, backgroundPosition: '100% 100%' }}
                whileTap={{ scale: 0.98 }}
              >
                <span>تصفح المنتجات</span>
                <FiArrowLeft className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://wa.me/201092951265"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all"
                style={{
                  border: '2px solid #D4AF37',
                  color: '#D4AF37',
                }}
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>تواصل معنا</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { value: '+500', label: 'عميل سعيد' },
                { value: '+200', label: 'مشروع مكتمل' },
                { value: '5', label: 'سنوات خبرة' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-[#D4AF37]">{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual Element */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-[400px] h-[400px]">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '2px dashed rgba(212, 175, 55, 0.2)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              {/* Middle ring */}
              <motion.div
                className="absolute inset-8 rounded-full"
                style={{ border: '1px solid rgba(212, 175, 55, 0.15)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner glow */}
              <div
                className="absolute inset-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                }}
              >
                <motion.div
                  className="text-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <svg viewBox="0 0 120 120" className="w-48 h-48" fill="none">
                    {/* Diamond shape */}
                    <motion.path
                      d="M60 10 L110 60 L60 110 L10 60 Z"
                      stroke="#D4AF37"
                      strokeWidth="1.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path
                      d="M60 25 L95 60 L60 95 L25 60 Z"
                      fill="rgba(212, 175, 55, 0.1)"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    />
                    <text x="60" y="55" textAnchor="middle" fill="#D4AF37" fontSize="20" fontWeight="bold" fontFamily="Tajawal">
                      كنوز
                    </text>
                    <text x="60" y="72" textAnchor="middle" fill="#D4AF37" fontSize="8" fontFamily="Tajawal" opacity="0.7">
                      KNOOZ
                    </text>
                  </svg>
                </motion.div>
              </div>
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rotate-45"
                  style={{
                    backgroundColor: '#D4AF37',
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    opacity: 0.2,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: `linear-gradient(to top, var(--color-bg), transparent)` }}
      />
    </section>
  );
}
