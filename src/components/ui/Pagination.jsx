import styles from "./Pagination.module.css";

function Pagination({ page, totalPages, setPage }) {
  if (!totalPages || totalPages <= 1) return null;

  const previousHandler = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const nextHandler = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const renderPages = () => {
    const pages = [];

    // همیشه صفحه 1 را نشان بده
    pages.push(
      <p
        key={1}
        className={page === 1 ? styles.selected : ""}
        onClick={() => setPage(1)}
      >
        1
      </p>
    );

    // اگر فاصله صفحه فعلی تا 2 زیاد بود → ...
    if (page > 3) pages.push(<span key="dots-left">...</span>);

    // صفحات وسط: (page-1), page, (page+1)
    for (let p = page - 1; p <= page + 1; p++) {
      if (p > 1 && p < totalPages) {
        pages.push(
          <p
            key={p}
            className={page === p ? styles.selected : ""}
            onClick={() => setPage(p)}
          >
            {p}
          </p>
        );
      }
    }

    // اگر فاصله صفحه فعلی تا آخر زیاد بود → ...
    if (page < totalPages - 2) pages.push(<span key="dots-right">...</span>);

    if (totalPages > 1) {
      pages.push(
        <p
          key={totalPages}
          className={page === totalPages ? styles.selected : ""}
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </p>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={page === 1 ? styles.disabled : ""}
        onClick={previousHandler}
      >
        قبلی
      </button>

      {renderPages()}

      <button
        className={page === totalPages ? styles.disabled : ""}
        onClick={nextHandler}
      >
        بعدی
      </button>
    </div>
  );
}

export default Pagination;

