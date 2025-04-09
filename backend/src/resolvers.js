const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getTodos: async () => {
      return await prisma.todo.findMany();
    },
    getTodo : async (_, {id}) => {
        return await prisma.todo.findUnique({ where:{id: parseInt(id)} });
    }
  },

  Mutation: {
    createTodo: async (_, { title}) => {
      return await prisma.todo.create({
        data: { title},
      });
    },
    toggleTodo: async(_, {id})=>{
      return await prisma.todo.update({
        where :{id:parseInt(id)},
        data:{completed: !todo.completed}
      })
    }
  },
};

module.exports = {resolvers}