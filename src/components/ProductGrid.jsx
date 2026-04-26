import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductFilter from './ProductFilter';
import ProductCard from './ProductCard';
import { client } from '../sanityClient';

export default function ProductGrid({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = '*[_type == "product"] | order(_createdAt desc)';
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const searchStr = (searchTerm || '').toLowerCase();
    const matchesSearch = !searchStr || 
      (p.name && p.name.toLowerCase().includes(searchStr)) || 
      (p.description && p.description.toLowerCase().includes(searchStr));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section id="products" className="py-24 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4 block"
          >
            مجموعتنا المختارة
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-6"
          >
            تصفح <span className="text-[#D4AF37]">منتجاتنا</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Filter */}
        <div className="mb-16">
          <ProductFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}

            {/* Coming Soon Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-8 flex flex-col items-center justify-center text-center overflow-hidden h-full min-h-[400px]"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%)',
                border: '2px dashed rgba(212, 175, 55, 0.2)',
              }}
            >
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#D4AF37]">انتظروا المزيد قريباً!</h3>
              <p className="text-sm leading-relaxed mb-8 text-[var(--color-text-secondary)]">
                تشكيلة كنوز لا تنتهي.. نحن بصدد إضافة مجموعة واسعة من أحدث إكسسوارات المكاتب والمنتجات المعدنية العالمية.
              </p>
              <a
                href="https://wa.me/201092951265"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold bg-[#D4AF37] text-gray-900 hover:opacity-90 transition-all"
              >
                اسأل عن طلبك
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bulk Discount Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37] opacity-5 blur-3xl rounded-full" />
          
          <h3 className="text-xl md:text-2xl font-bold mb-4 gold-gradient-text">
            خصومات خاصة للكميات الكبيرة
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            عند شراء كميات كبيرة من أي منتج، ستحصل على خصم خاص وحصري من شركة <span className="text-[#D4AF37] font-bold">كنوز</span>. تواصل معنا الآن للحصول على عرض سعر مخصص.
          </p>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 opacity-60">
            <p className="text-xl text-[var(--color-text-secondary)]">
              لا توجد منتجات متوفرة حالياً في هذا القسم.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
