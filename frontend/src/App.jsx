import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Registrar, ConfirmarCuenta, OlvidePassword, NuevoPassword, AdministrarPaciente } from "./pages"
import AuthLayout from "./Layout/AuthLayout"
import AdminLayout from "./Layout/adminLayout"
import PacientesProvider from "./context/PacientesProvider"
import AuthProvider from "./context/AuthProvider"

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PacientesProvider>

                    <Routes>
                        {/** publicas */}
                        <Route path="/" element={<AuthLayout />}>
                            <Route index={true} element={<Login />} />
                            <Route path="/registrar" element={<Registrar />} />
                            <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
                            <Route path="/olvide-password" element={<OlvidePassword />} />
                            <Route path="/olvide-password/:token" element={<NuevoPassword />} />
                        </Route>
                        {/** privadas */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index={true} element={<AdministrarPaciente />} />
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
