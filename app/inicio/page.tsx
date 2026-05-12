"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InicioUsuario() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    
    // Si no hay sesión iniciada, lo devolvemos al login
    if (!email) {
      router.push("/");
      return;
    }
    
    // Si es el admin tratando de entrar aquí, lo mandamos a su dashboard
    if (email === "admin@sistema.com") {
      router.push("/dashboard");
      return;
    }

    cargarPerfil(email);
  }, [router]);

  const cargarPerfil = async (email: string) => {
    try {
      const res = await fetch("/api/user/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (res.ok) {
        setUsuario(data.usuario);
      } else {
        // Si hay un error (ej. borraron al usuario), cerramos sesión
        cerrarSesion();
      }
    } catch (error) {
      console.error("Error al cargar perfil", error);
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  if (loading || !usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      
      {/* NAVBAR SENCILLO */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <span className="font-black text-slate-800 tracking-tight text-lg">Jóvenes Involucrados</span>
          </div>
          <button 
            onClick={cerrarSesion}
            className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-8 animate-[fadeIn_0.4s_ease-in-out]">
        
        {/* SALUDO DE BIENVENIDA */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Hola, <span className="text-blue-600">{usuario.nombreCompleto.split(' ')[0]}</span> 
          </h1>
          <p className="text-slate-500 font-medium">Bienvenido a tu espacio personal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* TARJETA: MIS DATOS */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm shadow-slate-100">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-3">
              Mi Perfil
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nombre Completo</p>
                <p className="font-semibold text-slate-800">{usuario.nombreCompleto}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Correo Electrónico</p>
                <p className="font-medium text-slate-600">{usuario.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Número de Celular</p>
                <p className="font-medium text-slate-600">{usuario.celular}</p>
              </div>
            </div>
          </div>

          {/* TARJETA: MI IGLESIA */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm shadow-slate-100">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-3">
              Mi Iglesia
            </h2>
            
            {usuario.iglesia ? (
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nombre</p>
                  <p className="font-semibold text-blue-600 text-lg">{usuario.iglesia.nombre}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Localidad</p>
                  <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium mt-1">
                    {usuario.iglesia.localidad}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dirección</p>
                  <p className="font-medium text-slate-600">{usuario.iglesia.direccion}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full pb-8 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 text-xl font-bold">!</div>
                <p className="text-slate-500 font-medium text-sm">Aún no tienes una iglesia asignada.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}