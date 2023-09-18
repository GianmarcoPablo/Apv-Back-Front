import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./Layout/AuthLayout"
import { Login, Registrar, ConfirmarCuenta, OlvidePassword, NuevoPassword } from "./pages"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index={true} element={<Login />} />
                    <Route path="/registrar" element={<Registrar />} />
                    <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
                    <Route path="/olvide-password" element={<OlvidePassword />} />
                    <Route path="/olvide-password/:token" element={<NuevoPassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
