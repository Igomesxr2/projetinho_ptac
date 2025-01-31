import { cookies } from "next/headers";
import Usuario from "../interfaces/usuario";
import { ApiURL } from "../config";
 
export async function fecthUser(): Promise<Usuario | null> {
    try {
        const cookiesStored = await cookies()
        const token = cookiesStored.get('restaurant-token')
        const response = await fetch(`${ApiURL}/perfil`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer: ${token?.value}` }
        })
        console.log(response)
        const data = await response.json()
        return data.usuario
    } catch (error) {
        console.log(error)
        return null
    }

}
