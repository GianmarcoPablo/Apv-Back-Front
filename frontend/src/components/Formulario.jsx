import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import { usePacientes } from "../context/PacientesProvider"

export default function Formulario() {

    const { guardarPaciente, paciente } = usePacientes()
    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [sintomas, setSintomas] = useState("")
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlerta({
                mensaje: "Todos los campos son obligatorios",
                error: true
            })
            return
        }
        setAlerta({})
        //agregar paciente
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({
            msg: "Guardado correctamente"
        })
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
        setId("")
    }

    useEffect(() => {
        if (paciente._id) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    return (
        <>
            <h2 className="font-black text-3xl text-center mb-2">Administrador de Pacientes</h2>
            <p className="text-xl text-center mb-10">
                Añade tus pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            {alerta.mensaje && <Alerta alerta={alerta} />}
            <form
                onSubmit={handleSubmit}
                className="bg-white  px-5 mb-10 lg:mb-0 shadow-lg rounded-md py-5"
            >
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="nombre">Nombre Mascota</label>
                    <input
                        id="nombre"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre de la mascota"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
                    <input
                        id="propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del propietario"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="email">Email Propietario</label>
                    <input
                        id="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del propietario"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="fecha">Fecha Alta</label>
                    <input
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas</label>
                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value={id ? "Editar Paciente" : "Agregar Paciente"}
                    className="bg-indigo-600 w-full text-white font-bold uppercase p-3 hover:bg-indigo-800 transition-colors cursor-pointer"
                />
            </form>
        </>
    )
}
