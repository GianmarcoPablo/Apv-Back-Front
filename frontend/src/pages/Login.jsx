import { Link } from "react-router-dom"
export default function Login() {
    return (
        <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            <div>
                <h1 className="text-indigo-600 font-black text-center text-5xl md:text-6xl">Inicia Sesión y Administra tus <span className="text-black">pacientes</span></h1>
            </div>

            <div >
                <form>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="email">Email</label>
                        <input
                            id="email"
                            placeholder="Email de registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        />
                    </div>
                    <div className="my-5 mt-8">
                        <label className="uppercase text-gray-600 text-xl font-bold" htmlFor="contraseña">Password</label>
                        <input
                            id="contraseña"
                            type="password"
                            placeholder="Tu password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-indigo-700 w-full py-3 rounded-lg text-white uppercase font-bold mt-5 hover:bg-indigo-900 cursor-pointer transition-colors"
                    />
                </form>
                <nav className="mt-10 md:flex justify-between">
                    <Link className="block text-center py-2 text-gray-600 font-semibold" to={"/registrar"}>¿No tienes cuenta? Registrate</Link>
                    <Link className="block text-center py-2 md:mt-0 text-gray-500 font-semibold" to={"/olvide-password"}>Olvide mi password</Link>
                </nav>
            </div>
        </div>
    )
}
