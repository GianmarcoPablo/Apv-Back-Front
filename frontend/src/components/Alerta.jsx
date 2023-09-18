import React from 'react'

export default function Alerta({ alerta }) {
    return (
        <div className={`${alerta.error ? "from-red-400 to-red-600" : "from-indigo-400 to-indigo-600"} py-3 font-bold bg-gradient-to-r text-white my-8 text-center rounded-lg uppercase`}>
            {alerta.mensaje}
        </div>
    )
}
