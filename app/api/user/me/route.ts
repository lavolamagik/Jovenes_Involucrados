import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email requerido" }, { status: 400 });
    }

    // Buscamos al usuario y le pedimos a Prisma que incluya los datos de su iglesia
    const usuario = await prisma.usuario.findUnique({
      where: { email: email },
      include: { iglesia: true }
    });

    if (!usuario) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Devolvemos los datos del usuario de forma segura (sin la contraseña)
    return NextResponse.json({ 
      usuario: {
        nombreCompleto: usuario.nombreCompleto,
        email: usuario.email,
        celular: usuario.celular,
        iglesia: usuario.iglesia
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}