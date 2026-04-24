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
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main>
        <HeroSection />
        <ProductGrid />
        <AboutSection />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <Cart />
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}

export default App;
