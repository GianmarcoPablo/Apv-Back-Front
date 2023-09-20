import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Alerta } from "../components"
import clienteAxios from "../config/axios"

export default function NuevoPassword() {

    const [password, setPassword] = useState("")
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const { token } = useParams()
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                const { data } = await clienteAxios(`/veterinarios/olvide-password/${token}`)
                console.log(data);
                setAlerta({
                    msg: "Coloca tu nuevo password",
                    error: false
                })
                setTokenValido(true)
            } catch (error) {
                console.log(error);
                setAlerta({
                    mensaje: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.length < 6) {
            setAlerta({
                mensaje: "El password debe de tener al menos 6 caracteres",
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, { password })
            setAlerta({
                mensaje: data.msg,
                error: false
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                mensaje: error.response.data.nsg,
                error: true
            })
        }
    }


    return (
        <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            <div>
                <h1 className="text-indigo-600 font-black text-center text-6xl">Restablece tu password y no pierdas acceso <span className="text-black">pacientes</span></h1>
            </div>

            {alerta.mensaje && <Alerta alerta={alerta} />}

            {tokenValido && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="email">Tu nuevo password</label>
                            <input
                                id="email"
                                placeholder="Coloca tu nuevo password"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Guardar nuevo password"
                            className="bg-indigo-700 w-full py-3 rounded-lg text-white uppercase font-bold mt-5 hover:bg-indigo-900 cursor-pointer transition-colors"
                        />
                    </form>
                    {passwordModificado && <Link className="block text-center py-2 text-gray-600 font-semibold" to={"/"}>Inicia Sessión</Link>}

                </>
            )}
        </div>
    )
}
