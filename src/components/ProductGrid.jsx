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
