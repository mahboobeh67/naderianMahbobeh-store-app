import { useState, useEffect, useRef } from "react";
import styles from "./SearchBox.module.css";
import { FcSearch } from "react-icons/fc";
import apiClient from "../../services/apiClient"; // اگر نخواستی، حذفش کن

function SearchBox({
  apiUrl = "/api/products/search", // مسیر API
  minLength = 2, // حداقل تعداد کاراکتر برای جستجو
  delay = 400, // تأخیر debounce
  onSelect, // وقتی کاربر روی یک پیشنهاد کلیک می‌کند
  onTyping, // در زمان تایپ کاربر
  enableApi = true, // اگر بخواهی بدون API کار کند
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef();

  // بسته شدن لیست هنگام کلیک خارج
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // DEBOUNCE
  useEffect(() => {
    if (!enableApi) return;

    if (query.length < minLength) {
      setResults([]);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await apiClient.get(apiUrl, {
          params: { q: query },
        });

        setResults(res.data.items || res.data || []);
        setOpen(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [query, enableApi, apiUrl, delay, minLength]);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onTyping && onTyping(e.target.value);
          }}
          placeholder="جستجو..."
          className={styles.searchInput}
        />
        <FcSearch className={styles.searchIcon} />
      </div>

      {open && (results.length > 0 || loading) && (
        <div className={styles.dropdown}>
          {loading && <div className={styles.loading}>در حال جستجو...</div>}

          {!loading &&
            results.map((item) => (
              <div
                key={item.id || item._id || item.value}
                className={styles.item}
                onClick={() => {
                  setQuery(item.name || item.title || item.label);
                  setOpen(false);
                  onSelect && onSelect(item);
                }}
              >
                {item.name || item.title || item.label}
              </div>
            ))}

          {!loading && results.length === 0 && (
            <div className={styles.noResult}>نتیجه‌ای یافت نشد</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
