"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [iglesias, setIglesias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [vistaActiva, setVistaActiva] = useState<'iglesias' | 'usuarios'>('iglesias');
  const [clavesVisibles, setClavesVisibles] = useState<Record<number, boolean>>({});

  // Estado para controlar el modal de eliminación personalizado
  const [modalEliminar, setModalEliminar] = useState({ visible: false, tipo: '', id: 0 });

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    
    if (userEmail !== "admin@sistema.com") {
      alert("Acceso denegado. Solo para Superadministradores.");
      router.push("/");
      return;
    }

    setIsAdmin(true);
    cargarDatos();
  }, [router]);

  const cargarDatos = async () => {
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      if (res.ok) {
        setUsuarios(data.usuarios);
        setIglesias(data.iglesias);
      }
    } catch (error) {
      console.error("Error cargando datos", error);
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  const abrirEditor = (tipo: string, id: number) => {
    alert(`Preparando panel de edición para ${tipo} #${id}...`);
  };

  // Abre el modal en lugar de mostrar la alerta del navegador
  const intentarEliminar = (tipo: string, id: number) => {
    setModalEliminar({ visible: true, tipo, id });
  };

  // Función que se ejecuta si le da a "Sí, eliminar" dentro del modal
  const procesarEliminacion = () => {
    alert(`Simulando eliminación del ${modalEliminar.tipo} #${modalEliminar.id}. ¡En el próximo paso lo conectamos a la BD!`);
    setModalEliminar({ visible: false, tipo: '', id: 0 });
  };

  const toggleVerClave = (id: number) => {
    setClavesVisibles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!isAdmin || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Cargando Entorno...</p>
        </div>
      </div>
    );
  }

  const totalIglesias = iglesias.length;
  const totalUsuarios = usuarios.length;
  const totalAdmins = usuarios.filter(u => u.esAdmin).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900 pb-12 relative">
      
      {/* MODAL PERSONALIZADO DE ELIMINACIÓN */}
      {modalEliminar.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center transform transition-all">
            
            {/* Ícono de Advertencia */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            
            <h3 className="text-xl font-black text-slate-800 mb-2">¿Estás seguro?</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Estás a punto de eliminar este <strong>{modalEliminar.tipo}</strong> permanentemente. Esta acción no se puede deshacer.
            </p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setModalEliminar({ visible: false, tipo: '', id: 0 })}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors cursor-pointer text-sm"
              >
                Cancelar
              </button>
              <button 
                onClick={procesarEliminacion}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-md shadow-red-500/30 cursor-pointer text-sm active:scale-[0.98]"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm shadow-slate-100/50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <span className="font-black text-slate-800 tracking-tight text-lg">Jóvenes Involucrados</span>
            <span className="bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ml-2">Admin Panel</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Superadmin</p>
              <p className="text-[10px] text-slate-400">admin@sistema.com</p>
            </div>
            <button 
              onClick={cerrarSesion}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-lg cursor-pointer"
            >
              Salir
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 mt-8 space-y-8">
        
        {/* MÉTRICAS */}
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-6">Resumen General</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Iglesias</p>
              <p className="text-4xl font-black text-slate-800">{totalIglesias}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Líderes Activos</p>
              <p className="text-4xl font-black text-slate-800">{totalUsuarios}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Administradores</p>
              <p className="text-4xl font-black text-slate-800">{totalAdmins}</p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex justify-center mt-10 mb-4">
          <div className="bg-slate-200/60 p-1.5 rounded-xl inline-flex space-x-1">
            <button
              onClick={() => setVistaActiva('iglesias')}
              className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                vistaActiva === 'iglesias' 
                  ? 'bg-white text-blue-600 shadow-sm shadow-slate-200' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              Directorio de Iglesias
            </button>
            <button
              onClick={() => setVistaActiva('usuarios')}
              className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                vistaActiva === 'usuarios' 
                  ? 'bg-white text-blue-600 shadow-sm shadow-slate-200' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              Gestión de Usuarios
            </button>
          </div>
        </div>

        {/* TABLAS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
          
          {/* VISTA IGLESIAS */}
          {vistaActiva === 'iglesias' && (
            <div className="overflow-x-auto animate-[fadeIn_0.3s_ease-in-out]">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Identificador</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Nombre</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Ubicación</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {iglesias.map((iglesia) => (
                    <tr key={iglesia.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-slate-400">#{iglesia.id.toString().padStart(4, '0')}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{iglesia.nombre}</td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                          {iglesia.localidad}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button 
                            onClick={() => abrirEditor('Iglesia', iglesia.id)} 
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => intentarEliminar('Iglesia', iglesia.id)} 
                            className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {iglesias.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm">Sin registros actuales.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* VISTA USUARIOS */}
          {vistaActiva === 'usuarios' && (
            <div className="overflow-x-auto animate-[fadeIn_0.3s_ease-in-out]">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Usuario</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Contacto</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Asignación</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Seguridad</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usuarios.map((usuario) => {
                    const claveVisible = clavesVisibles[usuario.id];
                    
                    return (
                      <tr key={usuario.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">{usuario.nombreCompleto}</div>
                          {usuario.esAdmin && (
                            <span className="inline-block mt-1 bg-slate-800 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                              Superadmin
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-800 font-medium">{usuario.email}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{usuario.celular}</div>
                        </td>
                        
                        {/* AQUI ESTÁ LA MEJORA DE LA ASIGNACIÓN DE IGLESIA */}
                        <td className="px-6 py-4">
                          {usuario.iglesia ? (
                            <div>
                              <div className="text-blue-600 font-bold">{usuario.iglesia.nombre}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{usuario.iglesia.localidad}</div>
                            </div>
                          ) : (
                            <span className="bg-slate-100 text-slate-400 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                              Independiente
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <span className={`font-mono text-xs ${claveVisible ? 'text-slate-700 font-bold' : 'text-slate-400 tracking-widest'}`}>
                              {claveVisible ? usuario.passwordHash : '••••••••'}
                            </span>
                            <button 
                              onClick={() => toggleVerClave(usuario.id)}
                              className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50 cursor-pointer"
                              title={claveVisible ? "Ocultar" : "Ver"}
                            >
                              {claveVisible ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button 
                              onClick={() => abrirEditor('Usuario', usuario.id)} 
                              className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Editar
                            </button>
                            {usuario.email !== "admin@sistema.com" && (
                              <button 
                                onClick={() => intentarEliminar('Usuario', usuario.id)} 
                                className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}