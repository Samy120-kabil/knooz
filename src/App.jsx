import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Cart from './components/Cart';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar onSearch={setSearchTerm} />
      <main>
        <HeroSection />
        <ProductGrid searchTerm={searchTerm} />
        <AboutSection />
        <Testimonials />
        <ContactSection />
      </main>
      {/* Footer Ticker — always visible, perfectly smooth on every screen */}
      <div className="ticker-wrap bg-[#D4AF37] py-3 border-t-2 border-black/10 shadow-inner">
        <div className="ticker-track">
          {/* Two identical sets → seamless 0→-50% loop */}
          {[0, 1].map((setIdx) => (
            <div key={setIdx} className="flex items-center">
              {[
                'انتظروا عروضنا الخاصة قريباً جداً من شركة كنوز',
                'خصومات حصرية للكميات الكبيرة',
                'الجودة والفخامة في كل تفصيلة',
              ].map((text, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 px-10 whitespace-nowrap text-gray-900 font-extrabold text-sm"
                >
                  <span className="text-xl select-none">⭐</span>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Cart />
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}

export default App;
