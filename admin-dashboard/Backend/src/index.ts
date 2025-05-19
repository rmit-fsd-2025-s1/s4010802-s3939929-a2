import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  await AppDataSource.initialize();
  console.log("Database connected successfully");
  app.listen(3001, () => console.log("Server running on http://localhost:3001/graphql"));
}

startServer().catch((error) => console.log("Error starting server:", error));
