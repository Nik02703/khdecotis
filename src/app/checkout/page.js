'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isMounted } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
  });

  const total = getCartTotal();
  const formattedTotal = total.toLocaleString('en-IN');

  useEffect(() => {
    // Wait for hydration and verification before redirect checks
    if (isMounted) {
      if (!user) {
        router.push('/account?redirect=/checkout');
      } else {
        const savedAddress = localStorage.getItem(`khd_address_${user.email}`);
        if (savedAddress) {
          try {
            setFormData(JSON.parse(savedAddress));
          } catch(e) {}
        }
      }
    }
  }, [user, isMounted, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return; // Prevent raw bypasses

    if (!formData.firstName || !formData.lastName || !formData.address) {
      alert("Please fill out your complete shipping details.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty! There's nothing to checkout.");
      router.push('/shop');
      return;
    }

    // Save address locally to the persistent profile cache
    localStorage.setItem(`khd_address_${user.email}`, JSON.stringify(formData));

    // Capture the submission into global persistent sync state
    addOrder({
      name: `${formData.firstName} ${formData.lastName}`,
      email: user.email,
      total: `₹${formattedTotal}`,
      items: cartItems.length,
      payload: cartItems
    });

    clearCart(); // Wipe the global shopping buffer

    alert(`Order Successfully Placed! Thank you for shopping, ${user.name}.`);
    router.push('/orders');
  };

  if (!isMounted || !user) {
    // Flash mitigation structure while redirect validates
    return <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Authenticating securely...</div>;
  }

  return (
    <div className={`container animate-fade-in ${styles.page}`}>
      <h1 className={styles.title}>Secure Checkout</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.sectionTitle}>Contact Information</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address (Linked Account)</label>
          <input type="email" value={user.email} disabled className={styles.input} style={{ background: '#f1f5f9', color: '#64748b' }} />
        </div>
        
        <h2 className={styles.sectionTitle}>Shipping Address</h2>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input type="text" className={styles.input} required value={formData.firstName} onChange={e=>setFormData({...formData, firstName: e.target.value})} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input type="text" className={styles.input} required value={formData.lastName} onChange={e=>setFormData({...formData, lastName: e.target.value})} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <input type="text" className={styles.input} required placeholder="Street address, P.O. box, etc." value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} />
        </div>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label}>City</label>
            <input type="text" className={styles.input} required value={formData.city} onChange={e=>setFormData({...formData, city: e.target.value})} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Postcode (6 Digits)</label>
            <input type="text" className={styles.input} required maxLength="6" pattern="\d{6}" title="Please enter a valid 6-digit postcode" value={formData.postcode} onChange={e=>{ const val = e.target.value.replace(/\D/g, ''); setFormData({...formData, postcode: val}); }} />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Button fullWidth variant="primary" type="submit">
            Complete Order (₹{formattedTotal})
          </Button>
        </div>
      </form>
    </div>
  );
}
