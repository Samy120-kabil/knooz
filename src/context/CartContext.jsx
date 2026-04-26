import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('knooz_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('knooz_cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product) => {
    setItems(prev => {
      const productId = product._id || product.id;
      const existing = prev.find(item => (item._id || item.id) === productId);
      if (existing) {
        return prev.map(item =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(item => (item._id || item.id) !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => (item._id || item.id) !== productId));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        (item._id || item.id) === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppMessage = useCallback(() => {
    if (items.length === 0) return '';
    const productsList = items
      .map(item => `• ${item.name} (×${item.quantity}) - ${item.price * item.quantity} ج.م`)
      .join('\n');
    const message = `أهلاً شركة كنوز، أود طلب المنتجات التالية:\n\n${productsList}\n\nالإجمالي: ${totalPrice} ج.م\n\nهل هي متاحة؟`;
    return encodeURIComponent(message);
  }, [items, totalPrice]);

  const generateSingleProductMessage = useCallback((productName) => {
    const message = `أهلاً شركة كنوز، أود الاستفسار عن منتج: ${productName}، هل هو متاح؟`;
    return encodeURIComponent(message);
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider value={{
      items, isOpen, totalItems, totalPrice,
      addItem, removeItem, updateQuantity, clearCart,
      openCart, closeCart,
      generateWhatsAppMessage, generateSingleProductMessage
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
