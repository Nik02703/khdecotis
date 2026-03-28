import Link from 'next/link';
import styles from './PromoBento.module.css';

const PROMOS = [
  {
    id: 1,
    title: "DOOR MATS",
    discount: "Up to 55% OFF",
    link: "/category/doormats",
    image: "/door_mat.avif",
    tall: true
  },
  {
    id: 2,
    title: "HAND TOWELS",
    discount: "Up to 40% OFF",
    link: "/category/handtowels",
    image: "/hand_towels.webp"
  },
  {
    id: 3,
    title: "CUSHIONS",
    discount: "Up to 60% OFF",
    link: "/category/cushions",
    image: "/cushions.avif"
  },
  {
    id: 4,
    title: "PILLOWS",
    discount: "Up to 50% OFF",
    link: "/category/pillows",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80"
  },
  {
    id: 5,
    title: "BEDSHEETS",
    discount: "Up to 65% OFF",
    link: "/category/bedsheets",
    image: "/bedsheets.png"
  }
];

export default function PromoBento() {
  return (
    <section className={`container ${styles.promoSection} animate-fade-in`}>
      <div className={styles.bentoGrid}>
        {PROMOS.map(promo => (
          <Link 
            href={promo.link} 
            key={promo.id} 
            className={`${styles.bentoCard} ${promo.tall ? styles.tallCard : ''}`}
          >
            <img src={promo.image} alt={promo.title} className={styles.bentoImage} />
            {/* Dark gradient overlay guarantees text readability regardless of background image brightness */}
            <div className={styles.bentoOverlay}></div>
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoTitle}>{promo.title}</h3>
              <p className={styles.bentoDiscount}>{promo.discount}</p>
              <button className={styles.bentoBtn}>Shop Now</button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
