"use client"

import styles from '../styles/login.module.css'
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';
import Header from '../components/Header';
import { ApiURL } from '../config';
import { setCookie } from 'nookies';
import { parseCookies } from 'nookies';



export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const router = useRouter();
    const [usuarios, setUsuario] = useState<Usuario[]>([
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



    interface ResponseSignin {
        erro: boolean,
        mensagem: string,
        token?: string
    }



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${ApiURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            })
            if (response) {
                const data: ResponseSignin = await response.json()
                const { erro, mensagem, token = '' } = data;
                console.log(data)
                if (erro) {
                    setErro(mensagem)
                } else {
                    // npm i nookies setCookie
                    setCookie(undefined, 'restaurant-token', token, {
                        maxAge: 60 * 60 * 1 // 1 hora
                    })

                }
            } else {

            }
        }
        catch (error) {
            console.error('Erro na requisicao', error)
        }
    }

    return (
        <div className={styles.content}>
            <Header />
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
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
