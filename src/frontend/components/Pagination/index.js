import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, onPageChange, hasMore }) {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Anterior
      </button>

      <span className={styles.info}>
        Página <strong>{currentPage}</strong>
      </span>

      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
      >
        Próximo
      </button>
    </div>
  );
}
