import { createContext, useContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const PacienteContext = createContext()

export const usePacientes = () => useContext(PacienteContext)

export default function PacientesProvider({ children }) {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios("/pacientes", config)
                setPacientes(data)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes()
    }, [])

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await clienteAxios.post("/pacientes", paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
                setPacientes([...pacientes, pacienteAlmacenado])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }

    }

    const setEdicion = paciente => {
        setPaciente(paciente)
    }

    const eliminarPacinete = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar ?')
        if (confirmar) {
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <PacienteContext.Provider value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPacinete
        }}>
            {children}
        </PacienteContext.Provider>
    )
}
