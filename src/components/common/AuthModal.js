'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/context/AuthContext';
import styles from './AuthModal.module.css';

export default function AuthModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  
  const { login, register, isMounted: authMounted } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError('Please fill all fields.');
        return;
      }
      const success = login(formData.email, formData.password);
      if (success) {
        onClose();
        setFormData({ name: '', email: '', password: '' });
      } else {
        setError('Invalid credentials.');
      }
    } else {
      if (!formData.email || !formData.password || !formData.name) {
        setError('Please fill all fields.');
        return;
      }
      const success = register(formData.name, formData.email, formData.password);
      if (success) {
        onClose();
        setFormData({ name: '', email: '', password: '' });
      } else {
        setError('Email already exists.');
      }
    }
  };

  const modalContent = isOpen && authMounted ? (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        
        <div className={styles.modalLayout}>
          <div className={styles.leftCol}>
            <h2 className={styles.title}>{isLogin ? 'Account Sign In' : 'Create Account'}</h2>
            
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              {!isLogin && (
                <div className={styles.inputGroup}>
                  <label>Name <span className={styles.required}>required</span></label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
              )}
              
              <div className={styles.inputGroup}>
                <label>Email <span className={styles.required}>required</span></label>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                   <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{width: '100%'}} />
                   {isLogin && <a href="#" className={styles.resetLink}>Reset password</a>}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Password <span className={styles.required}>required</span></label>
                <div className={styles.passwordWrapper}>
                  <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <span className={styles.eyeIcon}>∅</span>
                </div>
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.blackBtn}>{isLogin ? 'Sign In' : 'Create Account'}</button>
              
              {isLogin && (
                <>
                  <div className={styles.divider}>or</div>
                  <button type="button" className={styles.socialBtn}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="18" />
                    Sign in with Google
                  </button>
                  <p className={styles.terms}>
                    By signing in, you are agreeing to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                  </p>
                </>
              )}
            </form>
          </div>
          
          <div className={styles.rightCol}>
            <h3 className={styles.perksTitle}>Create An Account</h3>
            <ul className={styles.perksList}>
              <li><i>💳</i> Save payment to view in-store purchases</li>
              <li><i>⭐</i> Redeem Rewards</li>
              <li><i>🛍️</i> Speedy checkout</li>
              <li><i>🚚</i> Easily track orders and view order history</li>
              <li><i>💍</i> Create a Registry</li>
              <li><i>🛋️</i> View Your Design Packages</li>
              <li><i>❤️</i> Manage Favorites Lists</li>
            </ul>
            
            {isLogin ? (
              <>
                <button type="button" className={styles.blackBtn} onClick={() => setIsLogin(false)}>Create Account</button>
                <p className={styles.switchText}>Don't have an account? <a href="#">Track/Schedule Order</a></p>
              </>
            ) : (
              <p className={styles.switchText} style={{marginTop: '20px'}}>
                Already have an account? <button type="button" onClick={() => setIsLogin(true)} className={styles.textBtn}>Sign in</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}
