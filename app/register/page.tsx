"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Register() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/"); 
  };

  return (
    <div className="flex flex-grow items-center justify-center p-6 py-10 font-sans antialiased">
      <div className="w-full max-w-[420px] rounded-3xl bg-white shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden transition-all">
        <div className="w-full flex bg-slate-50">
          <Image 
            src="/logo-jovenesinvolucrados.png" 
            alt="Jóvenes Involucrados 2026"
            width={1200}
            height={300} 
            priority 
            className="w-full h-auto block" 
          />
        </div>
        
        <div className="p-8 pt-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              Registro
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Completa los datos para inscribir a tu iglesia
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2">
                Iglesia
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre</label>
                <input type="text" placeholder="Ej. Iglesia Central" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Localidad</label>
                <select defaultValue="" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900 appearance-none" required>
                <option value="" disabled>Selecciona una localidad...</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Dirección</label>
                <input type="text" placeholder="Calle y número" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" required />
              </div>
            </div>
            <div className="space-y-4 pt-2">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2">
                Líder
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre Completo</label>
                <input type="text" placeholder="Tu nombre" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Celular</label>
                <input type="tel" placeholder="+54 9 11 1234-5678" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                <input type="email" placeholder="correo@ejemplo.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Contraseña</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Confirmar</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" required />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button 
                type="submit"
                className="cursor-pointer w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] shadow-md shadow-blue-200"
              >
                Registrar
              </button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => router.push('/')}
                  className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                >
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}