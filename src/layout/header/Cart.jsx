import React from "react";
import styles from "./Cart.module.css";
import { FiTrash2 } from "react-icons/fi";

function Cart({ items = [], onRemove, onUpdateQuantity }) {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0)
    return (
      <div className={styles.empty}>
        <p>سبد خرید شما خالی است 🛒</p>
      </div>
    );

  return (
    <div className={`container ${styles.cartWrapper}`}>
      <h2 className={styles.title}>سبد خرید</h2>

      <div className={styles.itemsList}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.image} alt={item.title} className={styles.image} />

            <div className={styles.info}>
              <p className={styles.name}>{item.title}</p>
              <p className={styles.price}>
                {item.price.toLocaleString()} ریال
              </p>
            </div>

            <div className={styles.quantity}>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <span>{item.quantity}</span>
              <button
                disabled={item.quantity === 1}
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
            </div>

            <button
              className={styles.remove}
              onClick={() => onRemove(item.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <span>جمع کل:</span>
        <strong>{totalPrice.toLocaleString()} ریال</strong>
      </div>
    </div>
  );
}

export default Cart;
