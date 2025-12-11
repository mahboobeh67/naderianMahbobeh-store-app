import { RotatingLines } from "react-loader-spinner";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loader}>
      <RotatingLines
        width="90"
        strokeWidth="3"
        strokeColor="#005c55"  // رنگ سازمانی تو
        animationDuration="0.75"
      />
      <p className={styles.text}>در حال بارگذاری...</p>
    </div>
  );
}

export default Loading;
