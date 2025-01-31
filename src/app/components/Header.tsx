"use client";

import styles from './header.module.css';
import { parseCookies, destroyCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Ícones para abrir/fechar menu

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const cookies = parseCookies();
        setIsLoggedIn(!!cookies['restaurant-token']);
        setUserType(cookies['user-type'] || null); // Pegando o tipo de usuário dos cookies
    }, []);

    const handleLogout = () => {
        destroyCookie(undefined, 'restaurant-token');
        destroyCookie(undefined, 'user-type');
        setIsLoggedIn(false);
        setUserType(null);
        router.push('/login'); 
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.content}>
            <img src="/images/logo.png" alt="Logo" className={styles.logo} />
            <div className={styles.buttons}>
                <a href="/"><button>Home</button></a>
                {!isLoggedIn ? (
                    <>
                        <a href="/login"><button>Login</button></a>
                        <a href="/cadastro"><button>Cadastrar</button></a>
                    </>
                ) : (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <button className={styles.menuButton} onClick={toggleMenu}>
                            <Menu size={25} />
                        </button>
                    </>
                )}
            </div>

            {/* MENU LATERAL */}
            {isLoggedIn && (
                <aside className={`${styles.sidebar} ${menuOpen ? styles.showMenu : ""}`}>
                    <button className={styles.closeButton} onClick={toggleMenu}><X size={25} /></button>
                    
                    <div className={styles.userInfo}>
                        <img src="https://avatars.githubusercontent.com/u/170586742?v=4&size=64" alt="Usuário"/>
                        <h2>Usuário</h2>
                        <p>Tipo: {userType === 'adm' ? 'Administrador' : 'Cliente'}</p>
                    </div>

                    <nav className={styles.menuLinks}>
                        <Link href="/perfil">👤 Meu Perfil</Link>
                        <Link href="/reserva">📋 Minhas Reservas</Link>
                        <Link href="/reserva/novo">➕ Nova Reserva</Link>

                        {/* Somente administradores podem acessar essa rota */}
                        {userType === 'adm' && <Link href="/mesas">🍽️ Mesas</Link>}
                    </nav>
                </aside>
            )}
        </header>
    );
}
