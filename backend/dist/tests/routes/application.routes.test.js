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
const data_source_1 = require("../../data-source"); //for typeORM 
const User_1 = require("../../entity/User");
const Course_1 = require("../../entity/Course");
let createdCourseId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize(); //prepare database for testing
    // Signup new tutor user
    yield (0, supertest_1.default)(app_1.default).post("/api/users/signup").send({
        username: "try5@gmail.com",
        password: "Grapes@2025",
        confirmPassword: "Grapes@2025",
        profession: "Tutor",
    });
    // Create a course (if it doesn't exist)
    const courseRepo = data_source_1.AppDataSource.getRepository(Course_1.Course);
    let course = yield courseRepo.findOneBy({ courseName: "Web Development" });
    if (!course) {
        const newCourse = courseRepo.create({
            courseName: "Web Development",
            code: "WD101" + Date.now(), // ensuring unique code to avoid duplicate key
            description: "Learn HTML, CSS, JS",
        });
        const saved = yield courseRepo.save(newCourse);
        createdCourseId = saved.id; //new course id
    }
    else {
        createdCourseId = course.id; //found course id 
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.destroy(); //close dataabse after all tests
}));
describe("Tutor Application Submission", () => {
    it("should successfully submit a tutor application", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOneBy({ username: "try5@gmail.com" });
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/applications").send({
            userId: user === null || user === void 0 ? void 0 : user.id,
            name: "Ronnyy",
            role: "Lab Assistant",
            courseId: createdCourseId,
            availability: "part-time",
            skills: "React, Node.js, Java",
            academicCredentials: "Bachelor of Computer Science",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Ronnyy");
        expect(response.body.role).toBe("Lab Assistant");
        expect(response.body.skills).toContain("React"); //successful
    }));
});
//# sourceMappingURL=application.routes.test.js.map