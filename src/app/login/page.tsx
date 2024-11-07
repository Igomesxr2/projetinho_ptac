"use client"; 

import styles from '../styles/login.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';
import Header from '../components/Header';


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
        const usuario = usuarios.find( (user) => (user.email === email && user.senha === senha) )
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
        <div className={styles.content}> 
            <Header/>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={login}>
                    <h2 >Login</h2>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input  
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p>Não tem um login? cadastre-se aqui:<a href='cadastro'>Cadastrar</a></p>
                    {erro && <p>{erro}</p>}
                </form>
            </div>
            </div>
    );

};
