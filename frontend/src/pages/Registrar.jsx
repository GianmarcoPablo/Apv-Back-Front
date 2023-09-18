import { useState } from "react"
import { Link } from "react-router-dom"
import { Alerta } from "../components"
import clienteAxios from "../config/axios"

export default function Registrar() {

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()

        if ([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({ mensaje: "Todos los campos son obligatorios", error: true })
            return
        }
        if (password !== repetirPassword) {
            setAlerta({ mensaje: "Passwords diferentes", error: true });
            return
        }
        if (password.length < 6) {
            setAlerta({ mensaje: "password muy corto, minimo 6 caracteres", error: true });
            return
        }
        setAlerta({})

        try {
            await clienteAxios.post(`/veterinarios`, { nombre, email, password })
            setAlerta({
                mensaje: "Creado Correctamente, Revisa tu email",
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
                <h1 className="text-indigo-600 font-black text-center text-6xl">Crea tu Cuenta y Administra tus <span className="text-black">pacientes</span></h1>
            </div>
            <div >
                {alerta.mensaje && <Alerta
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit} >
                    <div className="my-5 mt-8">
                        <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="nombre">Tu Nombre</label>
                        <input
                            id="nombre"
                            placeholder="Ingresa tu nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
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
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="contraseña">Password</label>
                        <input
                            id="contraseña"
                            type="password"
                            placeholder="Tu password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="contraseñaRpt">Repetir Password</label>
                        <input
                            id="contraseñaRpt"
                            type="password"
                            placeholder="Repite tú password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={repetirPassword}
                            onChange={(e) => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Registrar cuenta"
                        className="bg-indigo-700 w-full py-3 rounded-lg text-white uppercase font-bold mt-5 hover:bg-indigo-900 cursor-pointer transition-colors"
                    />
                </form>
                <nav className="mt-10 md:flex justify-between">
                    <Link className="block text-center py-2 text-gray-600 font-semibold" to={"/"}>¿Ya tienes una cuenta? Inicia Sessión</Link>
                    <Link className="block text-center py-2 md:mt-0 text-gray-500 font-semibold" to={"/olvide-password"}>Olvide mi password</Link>
                </nav>
            </div>
        </div>
    )
}
