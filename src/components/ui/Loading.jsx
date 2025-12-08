import { RotatingLines } from "react-loader-spinner";
import styles from "./Loading.module.css"


function Loading() {
  return (
       <div className={styles.loader}>
      <RotatingLines
        width="100px"
        height="100px"
        strokeWidth="3"
        strokeColor="#fe5d42"
      />
    </div>

  )
}

export default Loading