import React from "react";
import { redirect } from "next/navigation";
import { fecthUser } from "../utilities/usuarios";
import ListMinhasReservas from "./ListMinhaReserva";
import { FecthMinhasReserva } from "../utilities/reserva";

export default async function Reserva() {
    const user = await fecthUser();
    const reservas = await FecthMinhasReserva();

    console.log(reservas);
    
    if (!user || !reservas) redirect('/login');

    return (
        <div>
            <ListMinhasReservas reservas={reservas} />
        </div>
    );
}
