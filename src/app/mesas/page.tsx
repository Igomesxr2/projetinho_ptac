"use client";

import styles from "../styles/cadastro.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { ApiURL } from "../config";
import { parseCookies } from "nookies";

interface Mesa {
  codigo: string;
  n_lugares: number;
}

interface ResponseSignin {
  erro: boolean;
  mensagem: string;
}

export default function Mesas() {
  const [mesa, setMesa] = useState<Mesa>({ codigo: "", n_lugares: 0 });
  const [erro, setErro] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { "restaurant-token": token } = parseCookies();
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { "restaurant-token": token } = parseCookies();

    try {
      const response = await fetch(`${ApiURL}/mesa/novo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mesa),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar mesa");
      }

      const data: ResponseSignin = await response.json();
      if (data.erro) {
        setErro(data.mensagem);
      } else {
        router.push("/Reserva");
      }
    } catch (error) {
      setErro("Falha na requisição. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className={styles.content}>
      <Header />
      <div className={styles.container}>
        <h2>Cadastrar Mesa</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="codigo">Código:</label>
            <input
              type="text"
              id="codigo"
              value={mesa.codigo}
              onChange={(e) => setMesa({ ...mesa, codigo: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="n_lugares">Número de Lugares:</label>
            <input
              type="number"
              id="n_lugares"
              value={mesa.n_lugares}
              onChange={(e) =>
                setMesa({ ...mesa, n_lugares: Number(e.target.value) })
              }
              required
              min={1}
            />
          </div>
          {erro && <p className={styles.error}>{erro}</p>}
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
