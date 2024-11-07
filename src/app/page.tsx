import Header from "./components/Header";
import styles from './styles/page.module.css'

export default function Home() {
  return (
    <div className={styles.content}>
    <Header />
    <p>Teste</p>
    </div>
  );
}
