import { createContext, useContext, useEffect, useState } from "react"
import clienteAxios from "../config/axios"

const authContext = createContext()

export const useAuth = () => useContext(authContext)

export default function AuthProvider({ children }) {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const authenticarUsuario = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                setCargando(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios.get("/veterinarios/perfil", config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }
            setCargando(false)
        }
        authenticarUsuario()
    }, [])

    const cerrarSession = () => {
        localStorage.removeItem("token")
        setAuth({})
    }

    const actualizarPerfil = (datos) => {
        console.log(datos);
    }

    return (
        <authContext.Provider value={{
            auth,
            cargando,
            cerrarSession,
            setAuth,
            actualizarPerfil
        }}>
            {children}
        </authContext.Provider>
    )
}
