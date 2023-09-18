import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import clienteAxios from "../config/axios";
import { Alerta } from "../components";

export default function ConfirmarCuenta() {

    const { id } = useParams()
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const { data } = await clienteAxios(`/veterinarios/confirmar/${id}`)
                setCuentaConfirmada(true)
                setAlerta({ mensaje: data.msg, error: false })
            } catch (error) {
                setAlerta({ mensaje: error.response.data.msg, error: true });
            }
            setCargando(false)
        }
        confirmarCuenta()
    }, [])

    return (
        <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            <div>
                <h1 className="text-indigo-600 font-black text-center text-6xl">Confirma tu cuenta y comienza a Administra <span className="text-black">pacientes</span></h1>
            </div>
            <div className="mt-8">
                {!cargando && <Alerta alerta={alerta} />}
                {cuentaConfirmada && (
                    <Link className="block text-center my-5 text-gray-500" to={"/"}>Inicia seccion</Link>
                )}
            </div>
        </div>
    )
}
