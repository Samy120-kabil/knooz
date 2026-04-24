import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductFilter from './ProductFilter';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-sm font-medium tracking-wider mb-3 block"
            style={{ color: '#D4AF37' }}
          >
            تشكيلتنا المميزة
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-text)' }}>
            منتجاتنا <span className="gold-gradient-text">الفاخرة</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to left, #D4AF37, transparent)' }} />
        </motion.div>

        {/* Filter */}
        <div className="mb-20">
          <ProductFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}

            {/* Professional Coming Soon Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-8 flex flex-col items-center justify-center text-center overflow-hidden h-full min-h-[400px]"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
                border: '2px dashed rgba(212, 175, 55, 0.3)',
              }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl bg-[#D4AF37] opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl bg-[#D4AF37] opacity-20" />
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center mb-6 shadow-lg shadow-[#D4AF37]/20"
              >
                <span className="text-3xl text-gray-900 font-bold">✨</span>
              </motion.div>

              <h3 className="text-2xl font-black mb-4 gold-gradient-text">انتظروا المزيد قريباً!</h3>
              
              <p className="text-sm leading-relaxed mb-8 opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
                تشكيلة كنوز لا تنتهي.. نحن بصدد إضافة مجموعة واسعة من أحدث إكسسوارات المكاتب والمنتجات المعدنية العالمية. 
              </p>

              <div className="space-y-4 w-full">
                <p className="text-xs font-bold tracking-widest uppercase opacity-60">اسأل عن طلبك الآن</p>
                <motion.a
                  href="https://wa.me/201092951265?text=مرحباً كنوز، هل يتوفر لديكم منتجات أخرى غير المعروضة في الموقع؟"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full py-4 rounded-xl font-bold transition-all text-gray-900"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #E8CF6D)' }}
                >
                  تواصل عبر واتساب
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
                لا توجد منتجات في هذا القسم حالياً
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
