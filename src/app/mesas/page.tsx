"use client"

import styles from '../styles/cadastro.module.css'
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';
import Mesa from '../interfaces/mesa';
import Header from '../components/Header';
import { ApiURL } from '../config';
import { setCookie } from 'nookies';
import { parseCookies } from 'nookies';

export default function Mesas() {
    const [usuarios, setUsuario] = useState<Usuario[]>([])
    const [erro, setErro] = useState('');
    const [mesa, SetMesas] = useState(
    [{ id: 0, codigo: "46464561", n_lugares: 3 },
     { id: 1, codigo: "84585421", n_lugares: 4 }, 
     { id: 2, codigo: "61684347", n_lugares: 2 }]);
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

    const MesaSubmit = async (e: FormEvent) => {
        e.preventDefault();

    }

    const alterarMesa = (novaMesa: string) => {
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            Mesa: novaMesa
        })
        )
    }

    return (
        <div className={styles.content}>
            <Header />
            <div className={styles.container}>

            </div>

        </div>
    );
};
