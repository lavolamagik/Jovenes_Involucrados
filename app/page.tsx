
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard"); 
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-[420px] rounded-3xl bg-white shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        
        <div className="w-full flex">
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
            <p className="text-sm text-slate-500 mt-1">
              Ingresa tus datos para acceder
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                Email
              </label>
              <input 
                type="email" 
                placeholder="usuario@palabradevida.org" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                Contraseña
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900"
                required
              />
            </div>
            <div className="pt-2 space-y-4"></div>
            <button 
              type="submit"
              className="cursor-pointer w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] mt-2 shadow-sm"
            >
              Entrar al Sistema
            </button>

            <div className="text-center">
                <button 
                  type="button"
                  onClick={() => router.push('/register')}
                  className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                >
                  ¿No tienes cuenta? Regístrate aquí
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}