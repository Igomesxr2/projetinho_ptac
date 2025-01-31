'use client'

import { useState } from "react";
import Reserva from "../interfaces/reserva";
import { FecthAtualizaReserva, FecthCancelarReserva } from "../utilities/reserva";

type ListMesasReservaProps = {
    reservas: Reserva[];
};

export default function ListMesasReserva({ reservas }: ListMesasReservaProps) {
    const [reserva, setReserva] = useState<Reserva | null>(null);
    const [cancelarReserva, setCancelarReserva] = useState<Reserva | null>(null);
    const [stateError, setStateError] = useState<{ error: boolean; mensagem: string }>({ error: false, mensagem: "" });

    function openModal(reserva: Reserva) {
        setReserva(reserva);
        setStateError({ error: false, mensagem: "" });
    }

    async function handleCancelReserva() {
        if (cancelarReserva) {
            await FecthCancelarReserva(cancelarReserva.id);
            setCancelarReserva(null);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!reserva) return;

        const formData = new FormData(event.currentTarget);
        const response = await FecthAtualizaReserva(reserva.id, formData);

        if (response.error) {
            setStateError({ error: true, mensagem: response.mensagem });
        } else {
            setReserva(null);
        }
    }

    return (
        <div>
            <h2>Suas Reservas:</h2>
            {!reservas || reservas.length === 0 ? (
                <p>Você não fez reservas</p>
            ) : (
                reservas.map(reserva => (
                    <div key={reserva.id}>
                        <p><strong>Mesa:</strong> {reserva.mesa?.codigo}</p>
                        <p><strong>Data:</strong> {reserva.data}</p>
                        <p><strong>Pessoas:</strong> {reserva.n_pessoas}</p>
                        {reserva.status ? (
                            <div>
                                <button onClick={() => openModal(reserva)}>Alterar</button>
                                <button onClick={() => setCancelarReserva(reserva)}>Cancelar</button>
                            </div>
                        ) : (
                            <p>Reserva Cancelada</p>
                        )}
                    </div>
                ))
            )}

            {reserva && !stateError.mensagem && (
                <div>
                    <h3>Confirmar Reserva:</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Data:
                            <input type="date" defaultValue={reserva.data} readOnly name="data" />
                        </label>
                        <input type="hidden" defaultValue={reserva.id} name="reservaId" />
                        <label>Mesa Selecionada:
                            <input type="number" defaultValue={reserva.mesa?.codigo} name="codigo" />
                        </label>
                        <label>Número de Pessoas:
                            <input type="number" max={reserva.mesa?.n_lugares} defaultValue={reserva.n_pessoas} min={1} name="n_pessoas" />
                        </label>
                        {stateError.error && <p>{stateError.mensagem}</p>}
                        <button type="button" onClick={() => setReserva(null)}>Cancelar</button>
                        <button type="submit">Confirmar</button>
                    </form>
                </div>
            )}

            {cancelarReserva && (
                <div>
                    <h3>Confirmar cancelamento Reserva:</h3>
                    <p>Realmente deseja cancelar?</p>
                    <button type="button" onClick={() => setCancelarReserva(null)}>Não</button>
                    <button type="button" onClick={handleCancelReserva}>Sim, Cancelar</button>
                </div>
            )}
        </div>
    );
}
