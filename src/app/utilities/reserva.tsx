'use server'
import { cookies } from "next/headers"
import { ApiURL } from "../config"
import Reserva from "../interfaces/reserva"
import Mesa from "../interfaces/mesa"
import { revalidateTag } from "next/cache"

export async function FecthReserva(data: string): Promise<Mesa[] | null> {
    console.log(data)
    if (!data) {
        return null
    }
    try {
        const cookiesStored = await cookies()
        const token = cookiesStored.get('restaurant-token')
        const response = await fetch(`${ApiURL}/mesa/disponibilidade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer: ${token?.value}` },
            body: JSON.stringify({ data })
        })
        console.log(response)
        const dataRes = await response.json()
        console.log(dataRes)
        return dataRes.mesasDisp
    } catch (error) {
        return null
    }

}

export async function FecthNovaReserva(mesaId: number, n_pessoas: number, data: string): Promise<{ error: boolean, mensagem: string }> {

    const cookiesStored = await cookies()
    const token = cookiesStored.get('restaurant-token')
    console.log(data)
    if (!data || !n_pessoas || !mesaId || !token) {
        return { error: true, mensagem: "Dados Inválidos" }
    }
    try {

        const response = await fetch(`${ApiURL}/reservas/novo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer: ${token?.value}` },
            body: JSON.stringify({ data, mesaId, n_pessoas })
        })

        const dataRes = await response.json()
        const { error, mensagem } = dataRes
        return {error, mensagem}
    } catch (error) {
        console.log(error)
        return { error: true, mensagem: "Erro fazer requisição" }
    }

}

export async function FecthMinhasReserva(): Promise<Reserva[] | null> {
    try {
        const cookiesStored = await cookies()
        const token = cookiesStored.get('restaurant-token')
        const response = await fetch(`${ApiURL}/reservas/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer: ${token?.value}` },
            
            next: {
                tags: ['minha_reserva']
            }
        })
        console.log(response)
        const dataRes = await response.json()
        console.log(dataRes)
        return dataRes.reservas
    } catch (error) {
        return null
    }

}

export async function FecthAtualizaReserva(state: any, formData: FormData){

    const cookiesStored = await cookies()
    const token = cookiesStored.get('restaurant-token')
    const n_pessoas = parseInt(formData.get('n_pessoas') as string)
    const reservaId = parseInt(formData.get('reservaId') as string)

    if (!reservaId || !n_pessoas || !token) {
        return { error: true, mensagem: "Dados Inválidos" }
    }
    try {

        const response = await fetch(`${ApiURL}/reservas/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer: ${token?.value}` },
            body: JSON.stringify({ reservaId, n_pessoas })
        })

        const dataRes = await response.json()
        const { error, mensagem } = dataRes
        if(!error) revalidateTag('minha_reserva')
        return {error, mensagem}
    } catch (error) {
        console.log(error)
        return { error: true, mensagem: "Erro fazer requisição" }
    }

}

export async function FecthCancelarReserva(reservaId: number){

    const cookiesStored = await cookies()
    const token = cookiesStored.get('restaurant-token')

    if (!reservaId || !token) {
        return { error: true, mensagem: "Dados Inválidos" }
    }
    try {

        const response = await fetch(`${ApiURL}/reservas/cancelar`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer: ${token?.value}` },
            body: JSON.stringify({ reservaId })
        })

        const dataRes = await response.json()
        const { error, mensagem } = dataRes
        if(!error) revalidateTag('minha_reserva')
        return {error, mensagem}
    } catch (error) {
        console.log(error)
        return { error: true, mensagem: "Erro fazer requisição" }
    }

}