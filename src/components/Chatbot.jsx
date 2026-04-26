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

    // Bot Response Logic - KNOOZ Encyclopedia
    setTimeout(() => {
      let botResponse = '';
      const lowerQuery = query.trim().toLowerCase();
      
      // 1. About Knooz
      if (lowerQuery.includes('مين') || lowerQuery.includes('كنوز') || lowerQuery.includes('شركة') || lowerQuery.includes('تخصص')) {
        botResponse = 'شركة كنوز هي رائدة في صناعة وتجارة إكسسوارات المكاتب والأثاث المعدنية. نحن نركز على تقديم منتجات تجمع بين "الجودة والفخامة" بأفضل الأسعار في السوق المصري، ونخدم آلاف العملاء والمشاريع منذ سنوات.';
      } 
      // 2. Products & Prices
      else if (lowerQuery.includes('منتج') || lowerQuery.includes('سعر') || lowerQuery.includes('بكام') || lowerQuery.includes('طبه') || lowerQuery.includes('طبة')) {
        botResponse = 'نوفر تشكيلة واسعة من إكسسوارات المكاتب (طبات، حوامل، منظمات). الأسعار موضحة بدقة بجانب كل منتج في الموقع. إذا كنت تبحث عن نوع معين غير معروض، تواصل معنا فوراً فقد يكون متاحاً في مخازنا.';
      }
      // 3. Contact & Hours
      else if (lowerQuery.includes('تواصل') || lowerQuery.includes('رقم') || lowerQuery.includes('تلفون') || lowerQuery.includes('ساعه') || lowerQuery.includes('مواعيد')) {
        botResponse = 'يسعدنا تواصلك! رقم الهاتف والواتساب هو 01092951265. مواعيد العمل الرسمية من 9 صباحاً وحتى 9 مساءً طوال أيام الأسبوع. يمكنك أيضاً مراسلتنا عبر الإيميل: ebrahimwa63@gmail.com.';
      }
      // 4. Ordering Process
      else if (lowerQuery.includes('طلب') || lowerQuery.includes('اشتري') || lowerQuery.includes('سله') || lowerQuery.includes('سلة') || lowerQuery.includes('كيف')) {
        botResponse = 'طريقة الطلب بسيطة جداً: 1. أضف المنتجات للسلة. 2. افتح السلة من الأيقونة العلوية. 3. اضغط على "اطلب عبر واتساب" أو "الإيميل". سنستلم طلبك ونؤكده معك فوراً.';
      }
      // 5. Offers & Bulk
      else if (lowerQuery.includes('عرض') || lowerQuery.includes('عروض') || lowerQuery.includes('خصم') || lowerQuery.includes('جمله') || lowerQuery.includes('جملة')) {
        botResponse = 'نحن نقدم خصومات حصرية جداً للكميات الكبيرة والمشاريع! تابع شريط الأخبار أسفل الموقع لمعرفة آخر العروض، أو تواصل معنا مباشرة للحصول على تسعير خاص للجملة.';
      }
      // 6. Out of scope
      else if (
        !lowerQuery.includes('كنوز') && !lowerQuery.includes('منتج') &&
        (lowerQuery.includes('أكل') || lowerQuery.includes('لعب') || lowerQuery.includes('سياسة') || 
         lowerQuery.includes('رياضة') || lowerQuery.includes('خبر') || lowerQuery.length < 2)
      ) {
        botResponse = 'عفواً، أنا خبير بموقع كنوز فقط للاستفسار عن المنتجات والخدمات. للاستفسارات الأخرى يمكنك التواصل مع الإدارة مباشرة عبر الهاتف.';
      } 
      // Default
      else {
        botResponse = 'أهلاً بك في موسوعة كنوز! أنا هنا لمساعدتك في كل ما يخص منتجاتنا، الأسعار، وطريقة الطلب. هل حابب تسأل عن منتج معين أو عروض الجملة؟';
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        time: new Date()
      }]);
      setIsTyping(false);
    }, 800); // Reduced delay for faster feel
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
