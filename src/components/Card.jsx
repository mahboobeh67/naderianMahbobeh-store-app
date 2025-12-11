import styles from "./Card.module.css";
import useCart from "@/context/cart/useCart";

function Card({ id, name, price, description, category, imageUrl }) {

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      title: name,
      price,
      image: imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardProduct}>

        <div className={styles.topCard}>
          <img src={imageUrl} className={styles.productImage} />
          <span className={styles.price}>
            {price.toLocaleString()} ریال
          </span>
        </div>

        <div className={styles.bottomCard}>
          <h3>{name}</h3>
          <p>{description}</p>
          <span>{category}</span>

          <button 
            className={styles.addButton}
            onClick={handleAddToCart}
          >
            افزودن به سبد 🛒
          </button>
        </div>

      </div>
    </div>
  );
}

export default Card;
