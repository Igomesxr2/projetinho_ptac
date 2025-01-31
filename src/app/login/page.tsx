"use client";

import styles from "../styles/login.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { ApiURL } from "../config";
import { setCookie, parseCookies } from "nookies";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  interface ResponseSignin {
    erro: boolean;
    mensagem: string;
    token?: string;
  }

  // Verifica se o usuário já está autenticado
  useEffect(() => {
    const { "restaurant-token": token } = parseCookies();
    if (token) {
      router.push("/");
    }
  }, [router]); // Adiciona router como dependência para evitar loops infinitos

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro(""); // Reseta erro antes de fazer login

    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!response.ok) {
        throw new Error("Erro ao conectar com o servidor.");
      }

      const data: ResponseSignin = await response.json();
      const { erro, mensagem, token = "" } = data;

      if (erro) {
        setErro(mensagem || "Falha ao fazer login.");
        return;
      }

      // Salva o token nos cookies
      setCookie(undefined, "restaurant-token", token, {
        maxAge: 60 * 60 * 1, // Expira em 1 hora
        path: "/",
      });

      router.push("/"); // Redireciona para home após login bem-sucedido
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro("Erro ao tentar fazer login. Verifique sua conexão.");
    }
  };

  return (
    <div className={styles.content}>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <p>
            Não tem um login? Cadastre-se aqui: <a href="/cadastro">Cadastrar</a>
          </p>
          {erro && <p className={styles.erro}>{erro}</p>}
        </form>
      </div>
    </div>
  );
}
