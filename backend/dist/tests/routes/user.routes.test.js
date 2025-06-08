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
const supertest_1 = __importDefault(require("supertest")); //for request simulation
const app_1 = __importDefault(require("../../app")); //express commands
const data_source_1 = require("../../data-source"); //typeORM part
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize(); // to prepare database for testing
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.destroy(); //for closing the database after all tests are done
}));
describe("User Signup", () => {
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/users/signup").send({
            username: "user7@gmail.com",
            password: "Tutor@1234",
            confirmPassword: "Tutor@1234",
            profession: "Tutor", // details entered in the signup
        });
        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user.username).toBe("user7@gmail.com"); //the expected returned username of new user
    }));
});
//# sourceMappingURL=user.routes.test.js.map