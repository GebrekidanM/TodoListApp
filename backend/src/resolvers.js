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

    toggleTodo: async (_, { id }) => {
      const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });
      
      if (!todo) throw new Error("Todo not found");
    
      return await prisma.todo.update({
        where: { id: parseInt(id) },
        data: { completed: !todo.completed },
      });
    },
    
    deleteTodo: async (_,{id})=>{
      const todo = await prisma.todo.delete({where:{id:parseInt(id)}});
      if (!todo) throw new Error("Todo is not deleted!");
      return todo;
    }
    
  },
};

module.exports = {resolvers}