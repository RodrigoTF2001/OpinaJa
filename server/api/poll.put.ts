import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const pollId = body.id;
  
    try {
      const updatedPoll = await prisma.poll.update({
        where: { id: pollId },
        data: {
          options: {
            updateMany: body.options.map((option: { id: Number; votes: Number; }) => ({
              where: { id: option.id },
              data: { votes: option.votes },
            })),
          },
        },
      });
  
      return { success: true, poll: updatedPoll };
    } catch (error) {
      return { success: false, error: "Falha em Atualizar os votos" };
    }
  });
  