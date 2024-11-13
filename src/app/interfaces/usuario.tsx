interface Usuario{
    id?: number;
    nome: string;
    email: string;
    password: string;
    tipo: string;
}
/*
const PerfilUsuario: React.FC<{usuario: Usuario}> = ({usuario}) => {
    return (
        <div>
            <h1>Nome: {usuario.nome}</h1>
            <p>Id: {usuario.id}</p>
            <p>Idade: {usuario.idade}</p>
            {usuario.email && <p>Email: {usuario.email}</p>}
            <p>Password: {usuario.password}</p>
            <p>Tipo: {usuario.tipo}</p>
        </div>
    )
}
    */

 export default Usuario;
