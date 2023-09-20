import { ListadoPacientes, Formulario } from "../components"
import { useState } from "react"

export default function AdministrarPaciente() {
    const [openForm, setOpenForm] = useState(false)

    return (
        <div className="flex flex-col md:flex-row">
            <button
                onClick={() => setOpenForm(!openForm)}
                type="button" className="bg-indigo-600 text-white mx-10 p-3 uppercase rounded-md mb-8 md:hidden font-bold">
                {openForm ? "Ocultar Formulario" : "Agregar Paciente"}
            </button>
            <div className={`${openForm ? "block" : "hidden"} md:w-1/2 lg:w-2/5 md:block`}>
                <Formulario />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <ListadoPacientes />
            </div>
        </div>
    )
}
