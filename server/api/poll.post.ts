import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Recebe os dados do corpo da requisição
    const body = await readBody(event);

    // Cria a enquete no banco de dados usando Prisma
    const newPoll = await prisma.poll.create({
      data: {
        question: body.question,
        options: {
          create: body.options.map((option: { text: string; votes: number; }) => ({
            text: option.text,
            votes: option.votes,
          })),
        },
      },
      include: {
        options: true, // Inclui as opções criadas na resposta
      },
    });

    // Retorna a nova enquete criada
    return newPoll;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: 'Erro ao criar a enquete',
    });
  } finally {
    await prisma.$disconnect();
  }
});
