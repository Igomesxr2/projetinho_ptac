'use server'

import { cookies } from "next/headers"
import Mesa from "../interfaces/mesa"
import { ApiURL } from "../config"


export async function FetchMesas(): Promise<Mesa[] | null> {
    try {
        const cookiesStored = await cookies()
        const token = cookiesStored.get('restaurant-token')
        const response = await fetch(`${ApiURL}/mesa/`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer: ${token?.value}` }
        })

        const data = await response.json()
        return data.mesas

    } catch (error) {
        console.log(error)
        return null
    }

}
