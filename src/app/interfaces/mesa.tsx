import Reserva from "./reserva";

interface Mesa{
    id: number;
    codigo: string;
    n_lugares: number;
    reservas? : Reserva[]
}


 export default Mesa;
