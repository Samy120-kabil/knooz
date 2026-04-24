import { motion } from 'framer-motion';
import { FiShield, FiAward, FiUsers, FiTruck } from 'react-icons/fi';

const features = [
  {
    icon: FiAward,
    title: 'جودة عالمية',
    description: 'نوفر منتجات بمعايير جودة دولية مع ضمان شامل على جميع منتجاتنا',
  },
  {
    icon: FiShield,
    title: 'ضمان شامل',
    description: 'ضمان حقيقي على جميع منتجاتنا ضد عيوب الصناعة لضمان رضاكم',
  },
  {
    icon: FiUsers,
    title: 'فريق متخصص',
    description: 'فريق من المحترفين ذوي الخبرة في التصميم والتركيب والصيانة',
  },
  {
    icon: FiTruck,
    title: 'توصيل سريع',
    description: 'نوصل طلبات لجميع أنحاء الجمهورية مع خدمة تركيب احترافية',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-medium tracking-wider" style={{ color: '#D4AF37' }}>
              تعرّف علينا
            </span>
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: 'var(--color-text)' }}>
              من <span className="gold-gradient-text">نحن؟</span>
            </h2>
            <div className="w-20 h-1 rounded-full" style={{ background: 'linear-gradient(to left, #D4AF37, transparent)' }} />
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              <strong className="text-[#D4AF37]">كنوز</strong> هي شركتك المتخصصة في تقديم أفضل إكسسوارات المكاتب والمنتجات المعدنية عالية الجودة.
              نسعى لتوفير أجود الخامات التي تجمع بين المتانة والعملية في الصناعة.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              مع خبرة تمتد لأكثر من 5 سنوات في السوق المصري، نفخر بخدمة أكثر من 500 عميل
              وإتمام أكثر من 200 مشروع بنجاح. فريقنا المتخصص يضمن لك أعلى معايير الجودة في كل تفصيلة.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {features.map((feat, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl transition-all duration-300 group"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 30px rgba(212, 175, 55, 0.1)',
                  borderColor: '#D4AF37',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                >
                  <feat.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-text)' }}>
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
