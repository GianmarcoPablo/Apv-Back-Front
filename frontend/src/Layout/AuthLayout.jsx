import { Outlet } from "react-router-dom"
export default function AuthLayout() {
    return (
        <div className="bg-gray-50">
            <main className="lg:w-1/2 xl:w-1/3  mx-auto grid place-content-center items-center  gap-10 p-5 h-screen">
                <Outlet />
            </main>
        </div>
    )
}
