import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.content}>
            <img src="/images/logo.png" alt="Logo"  className={styles.logo}/>
            <div className={styles.buttons}>
                <button><a href="/">Home</a></button>
                <button><a href="/login">Login</a></button>
                <button><a href="/cadastro">Cadastrar</a></button>
            </div>
        </header>
    );
}
