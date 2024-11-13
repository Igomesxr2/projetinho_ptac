"use client"

import styles from '../styles/cadastro.module.css'
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';
import Header from '../components/Header';
import { ApiURL } from '../config';
import { setCookie } from 'nookies';
import { parseCookies } from 'nookies';


export default function Cadastro() {
    const [usuario,setUsuario] = useState<Usuario>({nome:"",email:"", password:"",tipo:"cliente"});
    const [erro, setErro] = useState('');
    const router = useRouter();

    interface ResponseSignin {
        erro: boolean,
        mensagem: string,
        token?: string
    }
    
    useEffect(() => {
        const { 'restaurant-token': token } = parseCookies()
        if (token) {
          router.push('/')
        }
      }, [])

    const cadastroSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${ApiURL}/auth/cadastro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: usuario.nome,
                    email: usuario.email,
                    password: usuario.password,
                    tipo: usuario.tipo
                })
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

                    router.push("/")

                }
            } else {

            }
        }
        catch (error) {
            console.error('Erro na requisicao', error)
        }
    }

    const alterarNome = (novoNome:string) =>{
        setUsuario((prevUsuario) =>({
            ...prevUsuario,
            nome: novoNome
        })
    )
    } 
    const alterarEmail = (novoEmail:string) =>{
        setUsuario((prevUsuario) =>({
            ...prevUsuario,
            email: novoEmail
        })
    )
    } 
    const alterarSenha = (novaSenha:string) =>{
        setUsuario((prevUsuario) =>({
            ...prevUsuario,
            password: novaSenha
        })
    )
    } 
    
    return (
        <div className={styles.content}>  
            <Header/>
            <div className={styles.container}>
                <form onSubmit={cadastroSubmit}>
                    <h2 >Cadastro</h2>
                        <label htmlFor="name">Nome:</label>
                    <div>
                        <input  
                            type="name"
                            id="name"
                            value={usuario.nome}
                            onChange={(e) => alterarNome(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={usuario.email}
                            onChange={(e) => alterarEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={usuario.password}
                            onChange={(e) => alterarSenha(e.target.value)}
                            required
                        />
                    </div> 
                    <button type="submit">Cadastro</button>
                    {erro && <p>{erro}</p>}
                </form>
                </div>

        </div>
    );
};
