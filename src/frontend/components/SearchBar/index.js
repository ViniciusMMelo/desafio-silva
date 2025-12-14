import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Pesquisar..."}
      />
    </div>
  );
}
