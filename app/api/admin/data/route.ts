import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Traemos todos los usuarios y le adjuntamos los datos de su iglesia (si tienen)
    const usuarios = await prisma.usuario.findMany({
      include: { iglesia: true },
      orderBy: { id: 'desc' }
    });

    // Traemos todas las iglesias
    const iglesias = await prisma.iglesia.findMany({
      orderBy: { id: 'desc' }
    });

    return NextResponse.json({ usuarios, iglesias }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}