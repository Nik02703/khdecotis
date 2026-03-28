'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import SidebarMenu from './SidebarMenu';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getCartCount } = useCart();
  const count = getCartCount();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
  };

  return (
    <>
      <div className={styles.authNav}>
        <p>Free Shipping on All Orders Over ₹999</p>
      </div>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.leftGroup}>
            <button className={styles.mobileMenuBtn} onClick={() => setIsMobileMenuOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            {/* Sidebar menu completely removed as requested, nav actions migrating to profile dropdown */}
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" alt="KH Decotis" className={styles.logoImage} />
            </Link>
          </div>

          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <div 
              className={styles.categoriesTrigger}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/shop" className={styles.navLink}>Categories</Link>
            </div>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>

          <div className={styles.icons}>
            <SearchBar />
            
            <SidebarMenu isProfileIcon={true} />

            <Link href="/cart" className={styles.iconBtn} aria-label="Cart" title="View Cart" style={{ position: 'relative' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              
              {count > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#e11d48', color: '#fff', fontSize: '0.7rem', fontWeight: 800, minWidth: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Horizontal Mega Menu Below Main Header */}
        <nav 
          className={`${styles.megaMenuBar} ${isMegaMenuOpen ? styles.megaMenuBarVisible : styles.megaMenuBarHidden}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`container ${styles.megaMenuInner}`}>
            <div className={styles.megaMenuItem}>
              <Link href="/category/bedding" className={styles.megaMenuLink}>Bedding</Link>
              <div className={styles.megaMenuDropdown}>
                <div className={`container ${styles.megaMenuDropdownInner}`}>
                  <div className={styles.megaMenuCol}>
                    <h4>By Category</h4>
                    <Link href="/category/bedsheets">Bedsheets</Link>
                    <Link href="/category/comforter">Comforters & Blankets</Link>
                    <Link href="/category/mattress">Mattresses</Link>
                    <Link href="/category/pillows">Pillows</Link>
                  </div>
                  <div className={styles.megaMenuCol}>
                    <h4>Featured</h4>
                    <Link href="/shop">New Arrivals</Link>
                    <Link href="/shop">Bestsellers</Link>
                    <Link href="/shop" style={{color: '#e11d48'}}>Sale: Up to 40% Off</Link>
                  </div>
                  <div className={styles.megaMenuImageCol}>
                    <img src="/bedsheets.png" alt="Featured Bedding" style={{width: '200px', height: '140px', objectFit: 'cover'}} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.megaMenuItem}>
              <Link href="/category/decor" className={styles.megaMenuLink}>Decor & Pillows</Link>
              <div className={styles.megaMenuDropdown}>
                <div className={`container ${styles.megaMenuDropdownInner}`}>
                  <div className={styles.megaMenuCol}>
                    <h4>Decorative Accents</h4>
                    <Link href="/category/cushions">Cushions</Link>
                    <Link href="/category/doormats">Door Mats</Link>
                  </div>
                  <div className={styles.megaMenuImageCol}>
                    <img src="/cushions.avif" alt="Featured Decor" style={{width: '200px', height: '140px', objectFit: 'cover'}} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.megaMenuItem}>
              <Link href="/category/bath" className={styles.megaMenuLink}>Bath & Hand Towels</Link>
              <div className={styles.megaMenuDropdown}>
                <div className={`container ${styles.megaMenuDropdownInner}`}>
                  <div className={styles.megaMenuCol}>
                    <h4>Bath Essentials</h4>
                    <Link href="/category/handtowels">Hand Towels</Link>
                    <Link href="/category/doormats">Bath Mats</Link>
                  </div>
                  <div className={styles.megaMenuImageCol}>
                    <img src="/hand_towels.webp" alt="Featured Towels" style={{width: '200px', height: '140px', objectFit: 'cover'}} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.megaMenuItem}>
              <Link href="/category/curtains" className={styles.megaMenuLink}>Window</Link>
              <div className={styles.megaMenuDropdown}>
                <div className={`container ${styles.megaMenuDropdownInner}`}>
                  <div className={styles.megaMenuCol}>
                    <h4>Curtains & Drapes</h4>
                    <Link href="/category/curtains">Blackout Curtains</Link>
                    <Link href="/category/curtains">Sheer Curtains</Link>
                  </div>
                  <div className={styles.megaMenuImageCol}>
                    <img src="/curtains.png" alt="Featured Window" style={{width: '200px', height: '140px', objectFit: 'cover'}} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.megaMenuItem}>
              <Link href="/shop" className={styles.megaMenuLink} style={{color: '#ff4b4b'}}>SALE</Link>
            </div>
          </div>
        </nav>

        {/* Full Screen Mobile Menu Overlay */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileMenuHeader}>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/logo.png" alt="KH Decotis Logo" style={{ height: '40px', objectFit: 'contain' }} />
            </Link>
            <button className={styles.mobileMenuClose} onClick={() => setIsMobileMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div style={{ flex: 1, padding: '20px 0' }}>
            <Link href="/" className={styles.mobileMenuLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/shop" className={styles.mobileMenuLink} onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
            <div style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <Link href="/category/bedding" className={styles.mobileMenuLink} style={{ fontSize: '1.1rem', textTransform: 'none', borderBottom: 'none', padding: '4px 0', color: '#555' }} onClick={() => setIsMobileMenuOpen(false)}>Bedding</Link>
              <Link href="/category/decor" className={styles.mobileMenuLink} style={{ fontSize: '1.1rem', textTransform: 'none', borderBottom: 'none', padding: '4px 0', color: '#555' }} onClick={() => setIsMobileMenuOpen(false)}>Decor & Pillows</Link>
              <Link href="/category/bath" className={styles.mobileMenuLink} style={{ fontSize: '1.1rem', textTransform: 'none', borderBottom: 'none', padding: '4px 0', color: '#555' }} onClick={() => setIsMobileMenuOpen(false)}>Bath</Link>
              <Link href="/category/curtains" className={styles.mobileMenuLink} style={{ fontSize: '1.1rem', textTransform: 'none', borderBottom: 'none', padding: '4px 0', color: '#555' }} onClick={() => setIsMobileMenuOpen(false)}>Window</Link>
            </div>
            <Link href="/shop" className={styles.mobileMenuLink} style={{ color: '#e11d48' }} onClick={() => setIsMobileMenuOpen(false)}>Up to 40% Off Sale</Link>
            <Link href="/about" className={styles.mobileMenuLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/contact" className={styles.mobileMenuLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>

      </header>
    </>
  );
}
