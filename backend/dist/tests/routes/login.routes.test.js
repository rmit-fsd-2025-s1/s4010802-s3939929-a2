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
const supertest_1 = __importDefault(require("supertest")); // for request simulation
const app_1 = __importDefault(require("../../app")); // express commands
const data_source_1 = require("../../data-source"); // typeORM part
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize(); //prepare database for testing
    yield (0, supertest_1.default)(app_1.default).post("/api/users/signup").send({
        username: "loginuser3@test.com",
        password: "SecurePass@123",
        confirmPassword: "SecurePass@123",
        profession: "Tutor" //creating a new user to test for login
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.destroy(); //close the database after all test
}));
describe("User Login", () => {
    it("should allow login with correct credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/users/login").send({
            username: "loginuser3@test.com",
            password: "SecurePass@123",
            profession: "Tutor" //login with correct user details
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user.username).toBe("loginuser3@test.com"); //expected and correct username
    }));
    it("should reject login with incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/users/login").send({
            username: "loginuser3@test.com",
            password: "WrongPassword",
            profession: "Tutor" //wrong details used for login
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid credentials"); //rejects login due to invalid details entered
    }));
});
//# sourceMappingURL=login.routes.test.js.map