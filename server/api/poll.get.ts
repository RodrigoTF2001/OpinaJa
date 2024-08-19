import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Busca todas as enquetes no banco de dados
    const polls = await prisma.poll.findMany({
      include: {
        options: true, // Inclui as opções associadas a cada enquete
      },
    });

    // Retorna as enquetes encontradas
    return polls;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: 'Erro ao buscar as enquetes',
    });
  } finally {
    await prisma.$disconnect();
  }
});
