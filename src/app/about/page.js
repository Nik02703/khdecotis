import styles from './page.module.css';
import ReviewsSection from '@/components/ui/ReviewsSection';

export default function AboutPage() {
  return (
    <>
      <div className={styles.aboutWrapper}>
        <video 
          className={styles.aboutVideo} 
          src="/about.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
        />
        <div className={styles.aboutOverlay}></div>
        <div className={styles.aboutContent}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.text}>
            Welcome to KH Decotis! We believe your home is your sanctuary, and we’re here to help you style up every corner. Found in the details, luxury is not just a status—it's an experience we aim to deliver through our curated collections of comforters, cushions, and decorative pieces.
          </p>
        </div>
      </div>

      <ReviewsSection />
    </>
  );
}
