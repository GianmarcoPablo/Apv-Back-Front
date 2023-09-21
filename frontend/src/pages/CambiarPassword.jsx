import AdminNav from "../components/AdminNav"
import { Alerta } from "../components"
import { useState } from "react"
import { useAuth } from "../context/AuthProvider"

export default function CambiarPassword() {

    const [alerta, setAlerta] = useState({})
    const { guardarPassword } = useAuth()
    const [password, setPassword] = useState({
        password_actual: "",
        password_nuevo: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.values(password).some(campo => campo === "")) {
            setAlerta({
                mensaje: "Todos los campos son obligatorios",
                error: true
            })
            return
        }
        if (password.password_nuevo < 6) {
            setAlerta({
                mensaje: "El password debe tener minimo 6 caracteres",
                error: true
            })
            return
        }
        const respuesta = await guardarPassword(password)
        setAlerta(respuesta)
    }
    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modofica tu <span className="text-indigo-600 font-bold">password aqui</span> </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-5">
                    {alerta.mensaje && <Alerta alerta={alerta} />}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-700">Password Actual</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="password_actual"
                                placeholder="Escribe tu password actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-700">Nuevo Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="password_nuevo"
                                placeholder="Escribe tu nuevo password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <input type="submit" value={"Actualzar Password"} className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 transition-colors cursor-pointer" />
                    </form>
                </div>
            </div>
        </>
    )
}
