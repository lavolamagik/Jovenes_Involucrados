// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      iglesiaNombre, iglesiaLocalidad, iglesiaDireccion, // Opcionales
      nombreCompleto, celular, email, password // Obligatorios
    } = body;

    // 1. Validar que los datos del usuario existan
    if (!nombreCompleto || !celular || !email || !password) {
      return NextResponse.json({ message: "Faltan datos obligatorios del líder" }, { status: 400 });
    }

    // 2. Verificar si el email ya está registrado
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email }
    });

    if (usuarioExistente) {
      return NextResponse.json({ message: "Este email ya está registrado" }, { status: 400 });
    }

    // 3. Lógica para guardar en la Base de Datos
    let nuevoUsuario;

    // Si el usuario llenó los datos de la iglesia, creamos la iglesia y el usuario vinculado
    if (iglesiaNombre && iglesiaLocalidad && iglesiaDireccion) {
      nuevoUsuario = await prisma.iglesia.create({
        data: {
          nombre: iglesiaNombre,
          localidad: iglesiaLocalidad,
          direccion: iglesiaDireccion,
          usuarios: {
            create: {
              nombreCompleto,
              celular,
              email,
              passwordHash: password, // Por ahora sin encriptar, para mantenerlo simple
              esAdmin: false
            }
          }
        }
      });
    } else {
      // Si NO llenó los datos de la iglesia, creamos solo el usuario suelto
      nuevoUsuario = await prisma.usuario.create({
        data: {
          nombreCompleto,
          celular,
          email,
          passwordHash: password,
          esAdmin: false
        }
      });
    }

    return NextResponse.json({ message: "Registro exitoso", ok: true }, { status: 201 });

  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}