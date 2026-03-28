'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import Button from '@/components/ui/Button';

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const { user, login, register, isMounted } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  // Auto-redirect if already logged in natively
  useEffect(() => {
    if (isMounted && user) {
      router.push(redirectTo);
    }
  }, [user, isMounted, router, redirectTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) {
        router.push(redirectTo);
      } else {
        setError('Invalid email or password. Please try again or create an account.');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all layout blocks securely.');
        return;
      }
      const success = register(formData.name, formData.email, formData.password);
      if (success) {
        router.push(redirectTo);
      } else {
        setError('An account with this mapped email already natively exists!');
      }
    }
  };

  if (!isMounted) return null; // Prevent hydration flash

  return (
    <div className={`container animate-fade-in ${styles.pageWrapper}`}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>{isLogin ? 'Log in to your account' : 'Create an Account'}</h1>
        <p className={styles.subtitle}>
          {isLogin ? 'Enter your details below to securely access your profile.' : 'Sign up to track native orders and secure checkout operations.'}
        </p>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Aditi Sharma" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required={!isLogin} 
              />
            </div>
          )}
          
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="user@example.com" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              required 
            />
          </div>

          <Button type="submit" variant="primary" fullWidth style={{ marginTop: '1rem' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          <p className={styles.switchText}>
            {isLogin ? "Don't have an account?" : "Already mapped to the system?"}
            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className={styles.switchBtn}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
