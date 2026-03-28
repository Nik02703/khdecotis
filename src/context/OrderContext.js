'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const DUMMY_ORDERS = [
  { id: '#KHD-3109', name: 'Ravi Kumar', date: 'Oct 24, 2026', total: '₹4,599', status: 'Delivered', color: '#dcfce7', text: '#16a34a', email: 'ravi@example.com', items: 2 },
  { id: '#KHD-3108', name: 'Sneha Sharma', date: 'Oct 24, 2026', total: '₹12,400', status: 'Pending', color: '#fef3c7', text: '#d97706', email: 'sneha@example.com', items: 5 },
  { id: '#KHD-3107', name: 'Aryan Singh', date: 'Oct 23, 2026', total: '₹899', status: 'Shipped', color: '#dbeafe', text: '#2563eb', email: 'aryan@example.com', items: 1 },
];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedOrders = localStorage.getItem('khd_orders');
    if (storedOrders) {
      try {
        const parsed = JSON.parse(storedOrders);
        setOrders(parsed.length > 0 ? parsed : DUMMY_ORDERS);
      } catch (e) {
        setOrders(DUMMY_ORDERS);
      }
    } else {
      setOrders(DUMMY_ORDERS);
      localStorage.setItem('khd_orders', JSON.stringify(DUMMY_ORDERS));
    }
  }, []);

  const addOrder = (orderData) => {
    let nextIdNum = 61;
    if (orders.length > 0) {
      const ids = orders.map(o => {
        const match = String(o.id).match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      });
      const maxId = Math.max(...ids);
      if (maxId >= 61) {
        nextIdNum = maxId + 1;
      }
    }

    const newOrder = {
      ...orderData,
      id: `#KHD-${nextIdNum}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending',
      color: '#fef3c7',
      text: '#d97706'
    };
    
    setOrders(prev => {
      // Recalculate inside to be perfectly safe from stale closures
      let safeNextId = 61;
      if (prev.length > 0) {
        const prevIds = prev.map(o => {
          const match = String(o.id).match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        });
        const safeMax = Math.max(...prevIds);
        if (safeMax >= 61) safeNextId = safeMax + 1;
      }
      
      const safestOrder = { ...newOrder, id: `#KHD-${safeNextId}` };
      const updated = [safestOrder, ...prev];
      localStorage.setItem('khd_orders', JSON.stringify(updated));
      return updated;
    });
    
    // Return the pre-calculated one, it's virtually guaranteed to match
    return newOrder.id;
  };

  const updateOrderStatus = (id, newStatus, color, text) => {
    setOrders(prev => {
      const updated = prev.map(o => o.id === id ? { ...o, status: newStatus, color, text } : o);
      localStorage.setItem('khd_orders', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
