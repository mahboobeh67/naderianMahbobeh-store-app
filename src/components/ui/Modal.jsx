import styles from "./Modal.module.css"

function Modal({closeModal}) {
  return (
    <div className={styles.modalBackground}>
      
      <div className={styles.modalContainer}>

        <div className={styles.titleCloseModal}>
        <button onClick={() => closeModal(false)}> X </button>

        </div>
        <div className={styles.title}>

          <h1>آیا از حذف این محصول مطمئن هستید</h1>
        </div>
        <div className={styles.body}>
          <p></p>
        </div>
        <div className={styles.footer}>
          <button onClick={() => closeModal(false)} id={styles.cancel}>حذف</button>
          <button>ادامه دادن</button>
        </div>
      </div>
      
      
      </div>
  )
}

export default Modal