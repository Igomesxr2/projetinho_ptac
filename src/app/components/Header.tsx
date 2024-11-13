import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.content}>
            <img src="/images/logo.png" alt="Logo"  className={styles.logo}/>
            <div className={styles.buttons}>
                <a href="/"><button>Home</button></a>
                <a href="/login"><button>Login</button></a>
                <a href="/cadastro"><button>Cadastrar</button></a>
            </div>
        </header>
    );
}
