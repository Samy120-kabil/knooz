import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'أهلاً بك في كنوز! 👋 كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن منتجاتنا، الضمان، أو كيفية التواصل معنا.', sender: 'bot', time: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Bot Response Logic based on site content
    setTimeout(() => {
      let botResponse = 'عذراً، لم أفهم سؤالك تماماً. يمكنك الاستفسار عن (الأسعار، الألومنيوم، إكسسوارات المكاتب، الضمان، أو التوصيل).';
      
      const lowerQuery = query.toLowerCase();
      
      // Extensive Keyword matching
      if (lowerQuery.includes('سعر') || lowerQuery.includes('بكام') || lowerQuery.includes('اسعار')) {
        botResponse = 'تتراوح أسعار إكسسوارات المكاتب من 180 ج.م إلى 650 ج.م، بينما تبدأ أعمال الألومنيوم من 2800 ج.م للشبابيك وتصل إلى 8500 ج.م للواجهات. الأسعار موضحة بجانب كل منتج في الموقع.';
      } else if (lowerQuery.includes('توصيل') || lowerQuery.includes('شحن') || lowerQuery.includes('المحافظات')) {
        botResponse = 'نعم، نحن فخورون بخدمة جميع أنحاء الجمهورية. نوفر خدمة التوصيل والتركيب الاحترافي لضمان أعلى مستوى من الجودة.';
      } else if (lowerQuery.includes('الومنيوم') || lowerQuery.includes('ألومنيوم')) {
        botResponse = 'نحن متخصصون في أعمال الألومنيوم الفاخرة: نوافذ مزدوجة عازلة للصوت، أبواب عصرية، واجهات كرتن وول، قواطع مكاتب، ودرابزين. نستخدم أجود الخامات المقاومة للصدأ.';
      } else if (lowerQuery.includes('مكتب') || lowerQuery.includes('اكسسوارات') || lowerQuery.includes('إكسسوار')) {
        botResponse = 'نقدم مجموعة فاخرة من إكسسوارات المكاتب: حوامل أقلام ألومنيوم، منظمات مكتب مطلية بالذهب، ساعات مكتب كلاسيكية، وحوامل لابتوب قابلة للتعديل.';
      } else if (lowerQuery.includes('عنوان') || lowerQuery.includes('مكان') || lowerQuery.includes('فين')) {
        botResponse = 'مقرنا الرئيسي في القاهرة ولكننا ننفذ مشاريعنا في كافة محافظات مصر. يمكنك طلب معاينة فنية لأعمال الألومنيوم عبر واتساب.';
      } else if (lowerQuery.includes('ضمان') || lowerQuery.includes('مضمون')) {
        botResponse = 'بكل تأكيد! نوفر ضماناً لمدة عامين على جميع إكسسوارات المكاتب، وضماناً شاملاً لمدة 5 سنوات على كافة أعمال الألومنيوم لضمان راحة بالك.';
      } else if (lowerQuery.includes('تواصل') || lowerQuery.includes('رقم') || lowerQuery.includes('تلفون') || lowerQuery.includes('واتس')) {
        botResponse = 'يمكنك التواصل معنا عبر واتساب أو الهاتف على الرقم 01092951265، أو عبر البريد الإلكتروني ebrahimwa63@gmail.com. نحن متاحون يومياً من 9 ص حتى 9 م.';
      } else if (lowerQuery.includes('مين') || lowerQuery.includes('نبذه') || lowerQuery.includes('كنوز')) {
        botResponse = 'كنوز هي شركة رائدة في تجهيز المكاتب وأعمال الألومنيوم في مصر منذ 5 سنوات. خدمنا أكثر من 500 عميل ونفذنا أكثر من 200 مشروع بنجاح باهر.';
      } else if (lowerQuery.includes('راي') || lowerQuery.includes('قالوا') || lowerQuery.includes('عملاء')) {
        botResponse = 'عملاؤنا يثقون بنا! تقول سارة أحمد (مصممة): "كنوز هي خياري الأول لتجهيز المكاتب"، ويشيد المهندس أحمد بجودة أعمال الألومنيوم ودقة المواعيد.';
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        time: new Date()
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 left-6 z-50 p-4 rounded-full text-gray-900 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #E8CF6D)',
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        id="chatbot-toggle"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-40 left-6 z-50 w-[90vw] max-w-[400px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              height: '500px',
              maxHeight: '70vh',
            }}
          >
            {/* Header */}
            <div
              className="p-4 flex items-center gap-3 shrink-0"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #B8972E)' }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                🤖
              </div>
              <div className="text-gray-900 text-right w-full">
                <h3 className="font-bold text-sm">مساعد كنوز الذكي</h3>
                <p className="text-xs opacity-80 flex items-center gap-1 justify-end">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  متصل الآن
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#D4AF37] text-gray-900 rounded-tl-none'
                        : 'bg-var(--color-bg) border border-var(--color-border) text-var(--color-text) rounded-tr-none'
                    }`}
                    style={{
                      backgroundColor: msg.sender === 'user' ? '#D4AF37' : 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      color: msg.sender === 'user' ? '#1a1a2e' : 'var(--color-text)',
                      textAlign: 'right',
                      direction: 'rtl'
                    }}
                  >
                    {msg.text}
                    <div className="text-[10px] mt-1 opacity-50 text-left">
                      {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="p-3 shrink-0 flex gap-2 items-center"
              style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="اسأل عن المنتجات، المواعيد، الضمان..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 text-right"
                style={{ color: 'var(--color-text)', direction: 'rtl' }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl text-gray-900"
                style={{ background: '#D4AF37' }}
                disabled={!inputValue.trim() || isTyping}
              >
                <FiSend className="w-4 h-4 transform rotate-180" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
