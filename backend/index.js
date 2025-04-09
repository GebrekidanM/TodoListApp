require('dotenv').config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./src/schema");
const { resolvers } = require("./src/resolvers");
const cors = require("cors");

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
