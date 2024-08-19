import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event);
    const pollId = body.id;
    const deletedPoll = await prisma.poll.delete({
      where: { id: pollId },
    });
    return { message: 'Enquete deletada com sucesso', poll: deletedPoll };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: 'Erro ao deletar a enquete',
    });
  } finally {
    await prisma.$disconnect();
  }
});
