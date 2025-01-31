import { fecthUser } from "../../utilities/usuarios"

import { ListMesasReserva } from "./ListMesasReserva"
import { FetchMesas } from "../../utilities/mesas"



export default async function NovaReserva() {
    const user = await fecthUser()
    const mesa = await FetchMesas()
    console.log(user)
    console.log(mesa)
    if (!user || !mesa) return
    return (
        <div>
           
            <ListMesasReserva mesas={mesa} />
        </div>
    )
}