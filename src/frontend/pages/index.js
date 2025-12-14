import styles from "../styles/Home.module.css";
import Specie from "../components/Species";

function Home() {
  return (
    <div className={styles.container}>
      <Specie />
    </div>
  );
}

export default Home;
