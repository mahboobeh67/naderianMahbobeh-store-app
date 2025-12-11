import React from 'react'
import { useState, useEffect } from "react";
import { FcSearch } from "react-icons/fc";
import styles from "./SearchInput.module.css";

function SearchInput({ placeholder = "جستجو...", onSearch, debounce = 400 }) {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!onSearch) return;
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      onSearch(value);
    }, debounce);
    setTimer(newTimer);

    return () => clearTimeout(newTimer);
  }, [value, onSearch, debounce]);

  return (
    <div className={styles.container}>
      <FcSearch className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}

export default SearchInput;
