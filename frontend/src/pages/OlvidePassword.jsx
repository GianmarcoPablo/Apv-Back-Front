import { Link } from "react-router-dom"
import { useState } from "react"
import { Alerta } from "../components"
import clienteAxios from "../config/axios"

export default function OlvidePassword() {

    const [email, setEmail] = useState("")
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === "" || email.length < 4) {
            setAlerta({ mensaje: "El email es obligatorio", error: true })
            return
        }
        try {
            const { data } = await clienteAxios.post("/veterinarios/olvide-password", { email })
            setAlerta({
                mensaje: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                mensaje: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            <div>
                <h1 className="text-indigo-600 font-black text-center text-6xl">Recupera tu cuenta y Administra <span className="text-black">pacientes</span></h1>
            </div>
            <div className="mt-8">
                {alerta.mensaje && (
                    <Alerta alerta={alerta} />
                )}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="email">Email</label>
                        <input
                            id="email"
                            placeholder="Email de registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Recuperar cuenta"
                        className="bg-indigo-700 w-full py-3 rounded-lg text-white uppercase font-bold mt-5 hover:bg-indigo-900 cursor-pointer transition-colors"
                    />
                </form>
                <nav className="mt-10 md:flex justify-between">
                    <Link className="block text-center py-2 text-gray-600 font-semibold" to={"/registrar"}>¿No tienes cuenta? Registrate</Link>
                    <Link className="block text-center py-2 md:mt-0 text-gray-500 font-semibold" to={"/"}>¿Ya tienes una cuenta? Inicia Sessión</Link>
                </nav>
            </div>
        </div>
    )
}
