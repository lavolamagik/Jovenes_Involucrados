import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Faltan datos" }, { status: 400 });
    }

    // 1. Buscamos al usuario en la base de datos
    const usuario = await prisma.usuario.findUnique({
      where: { email: email }
    });

    // 2. Verificamos si existe y si la contraseña es igual
    if (!usuario || usuario.passwordHash !== password) {
      return NextResponse.json({ message: "Credenciales incorrectas" }, { status: 401 });
    }

    // 3. ¡Todo correcto!
    return NextResponse.json({ message: "Login exitoso", ok: true }, { status: 200 });

  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}