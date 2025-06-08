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
    yield data_source_1.AppDataSource.initialize(); //prepare database for testing
    // Create a lecturer user
    yield (0, supertest_1.default)(app_1.default).post("/api/users/login").send({
        username: "lec@gmail.com",
        password: "Apple@1234",
        profession: "Lecturer",
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.destroy(); //close the database after all tests
}));
describe("GET /api/applications?lecturerUsername=... should return only part-time applications", () => {
    it("should return applications filtered by part-time availability", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/applications?lecturerUsername=lec@gmail.com"); // filtering the course based on part-time availability
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        // Check all returned applications have part-time availability
        for (const app of res.body) {
            expect(app.availability.toLowerCase()).toBe("part-time");
        }
    }));
});
//# sourceMappingURL=lecturer.routes.test.js.map