import styles from "./CustomerLoginPage.module.css"
import img from "../../images/Union.svg"

function CustomerLoginPage() {
  return (
    <div className={styles.customerFormContainer}>
          <header>
            <div className={styles.customerFormImg}>
             <img src={img} alt="" /> 
            </div>
            
            <h1>صفحه ورود</h1>
            <p className={styles.customerFormSubtitle}>با یک ثبت‌نام ساده، همیشه یک قدم جلوتر باشید</p>
          </header>
    
          <div className={styles.customerForm}>
            <form >
              <div className={styles.customerFieldGroup}>
                <label htmlFor="adminName">نام کاربری:</label>
                <input
                  type="text"
                  name="Name"
                  placeholder="نام کاربری خود را وارد کنید"
                  id="Name"
                />
              </div>
    
              <div className={styles.customerFieldGroup}>
                <label htmlFor="adminPass">رمز عبور:</label>
                <input
                  type="password"
                  name="Password"
                  placeholder="رمز خود را وارد کنید"
                  id="Password"
                />
              </div>
               <div className={styles.customerFieldGroup}>
                <label htmlFor="adminPass">تکرار رمز عبور</label>
                <input
                  type="password"
                  name="repeatPassword"
                  placeholder="تکرار رمز عبور"
                  id="repeatPassword"
                />
              </div>
    
              <div className={styles.customerButtonWrapper}>
                <button type="submit">ثبت نام</button>
              </div>
    
              <div className={styles.customerErrorBox}></div>
            </form>
          </div>
    
          <footer>
            <a href="/">بازگشت به فروشگاه</a>
          </footer>
        </div>
  )
}

export default CustomerLoginPage