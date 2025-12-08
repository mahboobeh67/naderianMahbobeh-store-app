
import styles from "./Card.module.css";

function Card({ id, name, price, description, category, imageUrl }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardProduct}>

        <div className={styles.topCard}>
          <img src={imageUrl} className={styles.productImage} />
          <span className={styles.price}>${price}</span>
        </div>

        <div className={styles.bottomCard}>
          <h3>{name}</h3>
          <p>{description}</p>
          <span>{category}</span>
        </div>

      </div>
    </div>
  );
}
export default Card;
