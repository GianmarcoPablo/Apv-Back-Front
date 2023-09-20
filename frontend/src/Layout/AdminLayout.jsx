import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { Header, Footer } from "../components"

export default function AdminLayout() {

    const { auth, cargando } = useAuth()

    if (cargando) return

    return (
        <div>
            <Header />
            {auth?._id ? (
                <main className="container mx-auto mt-12">
                    <Outlet />
                </main>
            ) : (
                <Navigate to={"/"} />
            )}
            <Footer />
        </div>
    )
}