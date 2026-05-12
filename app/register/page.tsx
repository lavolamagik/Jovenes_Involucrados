"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  // Estados para la Iglesia (AHORA OBLIGATORIOS)
  const [iglesiaNombre, setIglesiaNombre] = useState("");
  const [iglesiaLocalidad, setIglesiaLocalidad] = useState("");
  const [iglesiaDireccion, setIglesiaDireccion] = useState("");

  // Estados para el Líder (Obligatorios)
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados de control
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Validar que seleccionó una localidad de la iglesia
    if (!iglesiaLocalidad) {
      setError("Por favor, selecciona la localidad de la iglesia.");
      return;
    }

    // 2. Validar longitud mínima del nombre
    if (nombreCompleto.trim().length < 3) {
      setError("Por favor ingresa un nombre y apellido válido.");
      return;
    }

    // 3. Validar cantidad de números en el celular (mínimo 8 dígitos)
    // Esto extrae solo los números para contarlos, ignorando los "+" o guiones
    const digitosCelular = celular.replace(/\D/g, '').length;
    if (digitosCelular < 8) {
      setError("El número de celular debe tener al menos 8 dígitos numéricos.");
      return;
    }

    // 4. Validar contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iglesiaNombre,
          iglesiaLocalidad,
          iglesiaDireccion,
          nombreCompleto,
          celular,
          email,
          password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-grow items-center justify-center p-6 py-10 font-sans antialiased min-h-screen">
      
      {/* --- POP-UP DE ÉXITO --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 flex flex-col items-center text-center transform animate-[bounce_0.5s_ease-in-out]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">¡Registro Exitoso!</h3>
            <p className="text-sm text-slate-500 mb-6">Tu cuenta ha sido creada correctamente.</p>
            <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Redirigiendo...</span>
            </div>
          </div>
        </div>
      )}
      {/* --- FIN DEL POP-UP --- */}

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
              Completa los datos para inscribirte
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2">
                Iglesia (Obligatorio)
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre</label>
                <input 
                  type="text" 
                  value={iglesiaNombre}
                  onChange={(e) => setIglesiaNombre(e.target.value)}
                  placeholder="Ej. Iglesia Central" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" 
                  required // <-- Agregado
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Localidad</label>
                <select 
                  value={iglesiaLocalidad}
                  onChange={(e) => setIglesiaLocalidad(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900 appearance-none" 
                  required // <-- Agregado
                >
                  <option value="" disabled>Selecciona una localidad...</option>
                  <option value="Monte">Monte</option>
                  <option value="Lobos">Lobos</option>
                  <option value="Cañuelas">Cañuelas</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Dirección</label>
                <input 
                  type="text" 
                  value={iglesiaDireccion}
                  onChange={(e) => setIglesiaDireccion(e.target.value)}
                  placeholder="Calle y número" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" 
                  required // <-- Agregado
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2">
                Líder (Obligatorio)
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre Completo</label>
                <input 
                  type="text" 
                  value={nombreCompleto}
                  onChange={(e) => {
                    // VALIDACIÓN MÁGICA: Reemplaza cualquier cosa que NO sea letra o espacio por nada ("")
                    const soloLetras = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                    setNombreCompleto(soloLetras);
                  }}
                  placeholder="Tu nombre" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Celular</label>
                <input 
                  type="tel" 
                  value={celular}
                  onChange={(e) => {
                    // VALIDACIÓN MÁGICA: Permite solo números, espacios, el signo + y guiones
                    const soloNumeros = e.target.value.replace(/[^\+\d\s\-]/g, "");
                    setCelular(soloNumeros);
                  }}
                  placeholder="+54 9 11 1234-5678" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Contraseña</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" 
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Confirmar</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900" 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button 
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all shadow-md ${
                  loading 
                    ? "bg-blue-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] cursor-pointer"
                }`}
              >
                {loading ? "Guardando..." : "Registrar"}
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