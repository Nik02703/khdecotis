import Link from 'next/link';
import styles from './LightningBanner.module.css';

export default function LightningBanner() {
  return (
    <section className={`container ${styles.section} animate-fade-in`}>
      <div className={styles.banner}>
        <div className={styles.textContent}>
          <h2 className={styles.headline}>
            <span className={styles.highlight}>KH Decotis</span> quality, now delivered at<br/>lightning speed with <span className={styles.fbv}>FBV</span>
          </h2>
          <Link href="/shop" className={styles.shopBtn}>Shop Now</Link>
        </div>
        <div className={styles.graphic}>
          {/* Mimicking the scooter box visual using a multiply blend stock */}
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Lightning Fast Delivery Logistics" className={styles.scooterImg} />
        </div>
      </div>
    </section>
  );
}
