// src/index.ts
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { json } from "body-parser";
import { AppDataSource } from "./data-source";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    app.use("/graphql", cors(), json(), expressMiddleware(server));

    const PORT = 3001;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
