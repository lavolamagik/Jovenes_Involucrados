
"use client";

import { useState } from "react";

export default function DashboardPage() {

  const [perfil, setPerfil] = useState("admin");

  return (
    <div className="flex flex-grow flex-col items-center justify-center p-6 space-y-8 font-sans antialiased">

      <div className="w-full max-w-[420px] rounded-3xl bg-white shadow-2xl shadow-slate-200/60 border border-slate-100 p-12 text-center transition-all">
        
        {perfil === "admin" && (
          <h1 className="text-3xl font-black text-blue-600 tracking-tight uppercase">
            Hola Admin
          </h1>
        )}

        {perfil === "lider" && (
          <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
            Hola Líder
          </h1>
        )}

        {perfil === "participante" && (
          <h1 className="text-3xl font-black text-emerald-600 tracking-tight uppercase">
            Hola Participante
          </h1>
        )}

      </div>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Panel de Pruebas (Dev)
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setPerfil("admin")} 
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${perfil === "admin" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
          >
            Admin
          </button>
          <button 
            onClick={() => setPerfil("lider")} 
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${perfil === "lider" ? "bg-slate-200 text-slate-800" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
          >
            Líder
          </button>
          <button 
            onClick={() => setPerfil("participante")} 
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${perfil === "participante" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
          >
            Participante
          </button>
        </div>
      </div>

    </div>
  );
}