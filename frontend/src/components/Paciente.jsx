import { usePacientes } from "../context/PacientesProvider"

export default function Paciente({ paciente }) {
    const { email, fecha, nombre, sintomas, _id, propietario } = paciente
    const { setEdicion, eliminarPacinete } = usePacientes()

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(nuevaFecha)
    }

    return (
        <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
            <p className='font-bold uppercase text-indigo-800 my-3'>Nombre: <span className='font-normal normal-case text-black'>{nombre}</span></p>
            <p className='font-bold uppercase text-indigo-800 my-3'>Propietario: <span className='font-normal normal-case text-black'>{propietario}</span></p>
            <p className='font-bold uppercase text-indigo-800 my-3'>Email: <span className='font-normal normal-case text-black'>{email}</span></p>
            <p className='font-bold uppercase text-indigo-800 my-3'>Fecha de Alta: <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span></p>
            <p className='font-bold uppercase text-indigo-800 my-3'>Sintomas: <span className='font-normal normal-case text-black'>{sintomas}</span></p>
            <div className='flex flex-col md:flex-row justify-between my-5'>
                <button
                    className='py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase rounded-lg transition-colors cursor-pointer font-bold my-5 md:my-0'
                    onClick={() => setEdicion(paciente)}
                >Editar</button>
                <button
                    onClick={() => eliminarPacinete(_id)}
                    className='py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase rounded-lg transition-colors cursor-pointer font-bold'>Eliminar</button>
            </div>
        </div>
    )
}
