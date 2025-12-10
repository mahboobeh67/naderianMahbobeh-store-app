import styles from "./AddProduct.module.css";
import { FaPlus } from "react-icons/fa";

export default function AddProduct({ setOpenModal }) {
  return (
    <button
      className={styles.addBtn}
      onClick={() => setOpenModal(true)}
    >
      <FaPlus className={styles.icon} />
      افزودن محصول جدید
    </button>
  );
}
