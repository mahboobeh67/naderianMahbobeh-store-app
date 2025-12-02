
import styles from "./CategoryBar.module.css";

function CategoryBar({ categories }) {
  return (
    <div className={styles.wrapper}>
      {categories.map(cat => (
        <div key={cat.id} className={styles.item}>
          <img src={cat.icon} alt={cat.title} className={styles.icon} />
          <span>{cat.title}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;