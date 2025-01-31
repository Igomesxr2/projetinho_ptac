"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";
import { useRouter } from "next/navigation";
import styles from "../styles/perfil.module.css";
import Usuario from '../interfaces/usuario';

export default function Perfil() {
  const [user, setUser] = useState<Usuario | null>(null);  // Estado inicial como null
  const [isEditing, setIsEditing] = useState(false);
  const { "restaurant-token": token } = parseCookies();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        // Caso o token não exista, redireciona para login
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(`${ApiURL}/perfil/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.usuario && data.usuario !== user) {
          // Se o usuário não estiver no estado ou for diferente, atualiza o estado
          setUser(data.usuario);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil", error);
      }
    };

    fetchUserData();
  }, [token, user, router]);  // Adicionando 'user' e 'router' nas dependências

  const atualizarPerfil = async () => {
    if (user) {
      try {
        await fetch(`${ApiURL}/perfil/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nome: user.nome, email: user.email }),
        });
        setIsEditing(false);
      } catch (error) {
        console.error("Erro ao atualizar perfil", error);
      }
    }
  };

  if (!user) {
    return <p>Carregando...</p>;  // Exibindo a mensagem de carregamento
  }

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <form>
          <h2>Meu Perfil</h2>

          {isEditing ? (
            <>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={user.nome}
                onChange={(e) => setUser({ ...user, nome: e.target.value })}
                required
              />

              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />

              <button type="button" onClick={atualizarPerfil}>
                Salvar
              </button>
              <button type="button" className={styles.cancel} onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <p className={styles.userInfo}><strong>Nome:</strong> {user.nome}</p>
              <p className={styles.userInfo}><strong>Email:</strong> {user.email}</p>
              <button type="button" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
