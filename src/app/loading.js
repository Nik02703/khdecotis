import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={`container page-wrapper ${styles.loadingWrapper}`}>
      <div className={`skeleton ${styles.heroSkeleton}`}></div>
      <div className={styles.gridSkeleton}>
        <div className={`skeleton ${styles.cardSkeleton}`}></div>
        <div className={`skeleton ${styles.cardSkeleton}`}></div>
        <div className={`skeleton ${styles.cardSkeleton}`}></div>
        <div className={`skeleton ${styles.cardSkeleton}`}></div>
      </div>
    </div>
  );
}
