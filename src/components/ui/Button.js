'use client';

import Link from 'next/link';
import styles from './Button.module.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  onClick, 
  type = 'button',
  className = '',
  href
}) {
  const baseClass = `${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={baseClass} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass} onClick={onClick}>
      {children}
    </button>
  );
}
