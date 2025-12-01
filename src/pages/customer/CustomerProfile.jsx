import styles from "./CustomerProfile.module.css";

function CustomerProfile() {
  return (
    <div className={styles.profileContainer}>
      <h2>پروفایل مشتری</h2>

      <div className={styles.profileField}>
        <label>نام کاربری:</label>
        <input type="text" name="username" />
      </div>

      <div className={styles.profileField}>
        <label>ایمیل:</label>
        <input type="email" name="email" />
      </div>

      <div className={styles.profileField}>
        <label>شماره تماس:</label>
        <input type="text" name="phone" />
      </div>

      <div className={styles.buttonWrapper}>
        <button>ذخیره</button>
        <button>انصراف</button>

        <button>ویرایش پروفایل</button>
      </div>
    </div>
  );
}

export default CustomerProfile;
