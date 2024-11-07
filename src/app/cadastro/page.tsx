"use client"; 
import Usuario from '../interfaces/usuario';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
    const [usuario,setUsuario] = useState<Usuario>({nome:"",email:"",senha:"",tipo:"cliente"});
    const [erro, setErro] = useState('');
    const router = useRouter();

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
            senha: novaSenha
        })
    )
    } 
    
    const cadastro = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        if (  usuario.email=== "" &&  usuario.senha=== "" ) {
            setErro('Cade o cadastro');  
        } else {
            router.push('/'); 
        }
    }
    

    return (
        <div>  
            <form onSubmit={cadastro}>
                <h2 >Cadastro</h2>
                <div>
                    <label htmlFor="name">Nome:</label>
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
                        value={usuario.senha}
                        onChange={(e) => alterarSenha(e.target.value)}
                        required
                    />
                </div> 
                <button type="submit">Cadastro</button>
                {erro && <p>{erro}</p>}
            </form>
        </div>
    );
};
