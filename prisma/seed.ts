import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@sistema.com' },
    update: {}, 
    create: {
      email: 'admin@sistema.com',
      nombreCompleto: 'Rodrigo Admin',
      celular: '123456789',
      passwordHash: '123456', 
      esAdmin: true,
    },
  })

  console.log('✅ Seed finalizado. Admin creado:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })