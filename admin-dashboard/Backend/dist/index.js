"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
const body_parser_1 = require("body-parser");
const data_source_1 = require("./data-source");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.AppDataSource.initialize();
        console.log("Database connected successfully");
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const server = new server_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolvers_1.resolvers,
        });
        yield server.start();
        app.use("/graphql", (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server));
        const PORT = 3003;
        httpServer.listen(PORT, () => {
            console.log(`Server ready at http://localhost:${PORT}/graphql`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
    }
});
startServer();
//# sourceMappingURL=index.js.map