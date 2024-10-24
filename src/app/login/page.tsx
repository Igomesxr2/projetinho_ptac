"use client"; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const router = useRouter();
    const [usuarios, setUsuario] = useState<Usuario[]>( [
        {
          "id": 1,
          "nome": "Jéferson",
          "email": "joao.canezin22@gmail.com",
          "senha": "senha",
          "tipo": "adm"
        },
      
        {
          "id": 1,
          "nome": "Brenda Só Fé",
          "email": "brendaDoGrau@gmail.com",
          "senha": "eunãoseioquecolocar123",
          "tipo": "adm"
        }
      ])
      
    
    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const usuario = usuarios.find( (user) => (user.email = email && user.senha === senha) )
        if (usuario) {
            localStorage.setItem('usuario',JSON.stringify(usuario))
            router.push('/')
        }else{
            setErro('Email ou Senha Invalidos')
        }
    }

    useEffect(() => {
        const usuarioLogado = localStorage.getItem('usuario');
        if (usuarioLogado) {
            router.push('/')
        }
    },[router])







    return (
        <div style={styles.container}>  
            <form onSubmit={login} style={styles.form}>
                <h2 >Login</h2>
                <div style={styles.inputGroup}>
                    <label htmlFor="email">E-mail:</label>
                    <input  
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
                <a href='cadastro'>Cadastro</a>
                {erro && <p style={styles.error}>{erro}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        padding: '2rem',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },

    inputGroup: {
        marginBottom: '1rem',
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '1rem',
    },
};
