import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const newPoll = await prisma.poll.create({
      data: {
        question: 'Como esta?',
      },
    })

    console.log(newPoll)
    return newPoll
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: 'Erro ao criar a enquete',
    })
  } finally {
    await prisma.$disconnect()
  }
})
