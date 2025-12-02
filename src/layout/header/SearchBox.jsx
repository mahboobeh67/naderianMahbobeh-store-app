import styles from "./SearchBox.module.css"
import { FcSearch } from "react-icons/fc"
function SearchBox() {
  return (
     <div className={styles.searchBox}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="جستجو..."
              />
              <FcSearch className={styles.searchIcon} />
            </div>
  )
}

export default SearchBox