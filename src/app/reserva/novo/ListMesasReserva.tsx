'use client'

import { FormEvent, useState } from "react"
import Mesa from "../../interfaces/mesa"
import { FecthReserva, FecthNovaReserva } from "../../utilities/reserva"
import { useRouter } from "next/navigation"


type ListMesasReservaProp = {
    mesas: Mesa[]
}

export function ListMesasReserva({ mesas }: ListMesasReservaProp) {
    const [data, setData] = useState('')
    const [reservas, setReservas] = useState<Mesa[] | null>(null)
    const [selectMesa, setSelectMesa] = useState<Mesa | null>(null)
    const [response, setResponse] = useState({ error: false, mensagem: '' })
    const router = useRouter()

    async function handleFecthData() {
        const response = await FecthReserva(data)
        setReservas(response)
    }

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const mesaId = parseInt(formData.get('mesaId') as string)
        const n_pessoas = parseInt(formData.get('n_pessoas') as string)

        const response = await FecthNovaReserva(mesaId, n_pessoas, data)
        setResponse(response)
        if (!response.error) {
            router.push('/Reserva/novo')
        }
    }

    return (
        <div>
            <h2>Fazer Reserva</h2>
            <input type="date" value={data} onChange={e => setData(e.target.value)} />
            <button type="button" onClick={handleFecthData}>Buscar</button>

            <div>
                {reservas?.map(mesa => (
                    <button onClick={() => setSelectMesa(mesa)} key={mesa.id}>{mesa.codigo}</button>
                ))}
            </div>

            {selectMesa && (
                <div>
                    <h3>Confirmar Reserva:</h3>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Data:
                            <input type="date" defaultValue={data} readOnly name="data" />
                        </label>

                        <input type="number" hidden readOnly defaultValue={selectMesa.id} name="mesaId" />

                        <label>
                            Número de Pessoas:
                            <input type="number" max={selectMesa.n_lugares} min={1} name="n_pessoas" />
                        </label>
                        {response.error && <p>{response.mensagem}</p>}
                        <button type="button" onClick={() => setSelectMesa(null)}>Cancelar</button>
                        <button type="submit">Confirmar</button>
                    </form>
                </div>
            )}
        </div>
    )
}