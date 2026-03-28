import styles from './ReviewsSection.module.css';

const REVIEWS = [
  { id: 1, name: "Priya S.", text: "Absolutely stunning bedsheets! The quality is unbelievable for the price. They feel just as luxurious as a five-star hotel." },
  { id: 2, name: "Rahul M.", text: "The curtains completely transformed my living room. Very premium feel, excellent light blocking, and gorgeous textures." },
  { id: 3, name: "Anita K.", text: "Best comforter I have ever slept in. It's perfectly weighted and extremely soft. Will be buying a second one soon!" },
  { id: 4, name: "Sneha V.", text: "Beautiful designs and the fabric is incredibly soft. KH Decotis really pays attention to the small details." },
  { id: 5, name: "Vikram R.", text: "Great customer service and the cushions are gorgeous and plush. Highly recommend!" },
];

export default function ReviewsSection() {
  return (
    <section className={styles.reviewsSection}>
      <h2 className={styles.reviewsHeading}>What Our Customers Say</h2>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {/* Duplicating reviews to create a seamless infinite CSS loop */}
          {[...REVIEWS, ...REVIEWS].map((review, index) => (
            <div key={`${review.id}-${index}`} className={styles.reviewCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.reviewText}>"{review.text}"</p>
              <div className={styles.reviewerName}>— {review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
