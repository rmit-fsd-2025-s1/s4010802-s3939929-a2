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
const app_1 = __importDefault(require("../../app")); //for express commands
const data_source_1 = require("../../data-source"); //typeORM part
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize(); //prepare database for testing
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.destroy(); //close database after all tests
}));
describe("Tutor Application Validation", () => {
    it("should return 400 if required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/applications").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message.toLowerCase()).toContain("all fields are required"); //says all fields are required
    }));
    it("should return 400 if only some fields are present", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/applications").send({
            name: "Ron",
            role: "Tutor", //submitting only some fields
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message.toLowerCase()).toContain("all fields are required"); //returns error message needs all fields.
    }));
});
//# sourceMappingURL=emptyfields.routes.test.js.map