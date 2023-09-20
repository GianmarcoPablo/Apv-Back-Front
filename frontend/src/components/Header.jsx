import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export default function Header() {

    const { cerrarSession } = useAuth()

    return (
        <header className='py-10 bg-indigo-600'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <h1 className='font-bold text-2xl text-indigo-200 text-center'>Administrador de Pacientes de <span className='text-white font-black'>Veterinaria</span></h1>
                <nav className="flex flex-col lg:flex-row gap-4 items-center mt-5 lg:mt-0">
                    <Link to={"/admin"} className="text-white text-sm uppercase font-bold" >Pacientes</Link>
                    <Link to={"/admin/perfil"} className="text-white text-sm uppercase font-bold" >Pefil</Link>
                    <button
                        type="button"
                        className="bg-red-700 text-white text-sm uppercase font-bold p-2 hover:bg-red-800 transition-colors cursor-pointer"
                        onClick={cerrarSession}
                    >
                        Cerrar session
                    </button>
                </nav>
            </div>
        </header>
    )
}
