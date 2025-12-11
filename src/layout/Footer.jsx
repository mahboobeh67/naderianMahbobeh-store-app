import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <h2 className={styles.title}>اطلاعات تماس</h2>

        <div className={styles.info}>
          <p><strong>آدرس:</strong> یاسوج بلوار قرنی</p>
          <p><strong>تلفن:</strong> 09177431225</p>
          <p><strong>ایمیل:</strong> mahboobehnaderian1367@gmail.com</p>
        </div>

        <div className={styles.divider}></div>

        <p className={styles.copy}>
          © تمامی حقوق متعلق به محبوبه نادریان است.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
