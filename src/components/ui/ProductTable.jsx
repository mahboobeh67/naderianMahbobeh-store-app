import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import styles from "./ProductTable.module.css";
function ProductTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.expend}>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th> عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td >موبایل</td>
            <td>5</td>
            <td>87000000</td>
            <td>134</td>
            <td>
              <span className={styles.actions}>
                <BsFillTrashFill  className={styles.deletebtn}/>
                <BsPencilFill />
              </span>
            </td>
          </tr>
          <tr>
            <td>تیشرت</td>
            <td>25</td>
            <td>300000</td>
            <td>135</td>
            <td>
              <span className={styles.actions}>
                <BsFillTrashFill  className={styles.deletebtn}/>
                <BsPencilFill />
              </span>
            </td>
          </tr>
          <tr>
            <td>لوازم تحریر</td>
            <td>40</td>
            <td>306000</td>
            <td>136</td>
            <td>
              <span className={styles.actions}>
                <BsFillTrashFill className={styles.deletebtn} />
                <BsPencilFill />
              </span>
            </td>
          </tr>
              <tr>
           <td>لباس ورزشی</td>
            <td>40</td>
            <td>416000</td>
            <td>137</td>
            <td>
              <span className={styles.actions}>
                <BsFillTrashFill  className={styles.deletebtn}/>
                <BsPencilFill />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
