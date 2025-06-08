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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const data_source_1 = require("../data-source");
const Course_1 = require("../entity/Course");
const User_1 = require("../entity/User");
const Selection_1 = require("../entity/Selection");
const Application_1 = require("../entity/Application");
const courseRepository = data_source_1.AppDataSource.getRepository(Course_1.Course);
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
exports.resolvers = {
    Query: {
        courses: () => courseRepository.find(),
        users: () => userRepository.find(),
        candidatesPerCourse: function () {
            return __awaiter(this, void 0, void 0, function* () {
                const selections = yield data_source_1.AppDataSource.getRepository(Selection_1.Selection).find({
                    relations: ["application", "application.course"]
                });
                const grouped = new Map();
                selections.forEach((sel) => {
                    var _a, _b;
                    const courseName = (_b = (_a = sel.application) === null || _a === void 0 ? void 0 : _a.course) === null || _b === void 0 ? void 0 : _b.courseName;
                    const tutorName = sel.tutorName;
                    if (courseName && tutorName) {
                        if (!grouped.has(courseName))
                            grouped.set(courseName, []);
                        grouped.get(courseName).push(tutorName);
                    }
                });
                return Array.from(grouped.entries()).map(([course, tutors]) => [`Course: ${course}`, ...tutors]);
            });
        },
        tutorsChosenForMoreThan3Courses: function () {
            return __awaiter(this, void 0, void 0, function* () {
                const selections = yield data_source_1.AppDataSource.getRepository(Selection_1.Selection).find();
                const countMap = new Map();
                selections.forEach((sel) => {
                    const name = sel.tutorName;
                    countMap.set(name, (countMap.get(name) || 0) + 1);
                });
                return Array.from(countMap.entries())
                    .filter(([_, count]) => count > 3)
                    .map(([name]) => name);
            });
        },
        unselectedTutors: () => __awaiter(void 0, void 0, void 0, function* () {
            const appRepo = data_source_1.AppDataSource.getRepository(Application_1.Application);
            const selectionRepo = data_source_1.AppDataSource.getRepository(Selection_1.Selection);
            const allTutors = yield appRepo.find({ where: { role: "Tutor" } });
            const selections = yield selectionRepo.find();
            const selectedNames = new Set(selections.map(sel => sel.tutorName));
            return allTutors
                .filter(tutor => !selectedNames.has(tutor.name))
                .map(tutor => tutor.name);
        })
    },
    Mutation: {
        createCourse: (_, args) => {
            const course = courseRepository.create(args);
            return courseRepository.save(course);
        },
        createUser: (_, args) => {
            const user = userRepository.create(args);
            return userRepository.save(user);
        },
        updateCourse: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, courseName, code, description }) {
            const course = yield courseRepository.findOneBy({ id });
            if (!course)
                throw new Error("Course not found");
            course.courseName = courseName !== null && courseName !== void 0 ? courseName : course.courseName;
            course.code = code !== null && code !== void 0 ? code : course.code;
            course.description = description !== null && description !== void 0 ? description : course.description;
            return yield courseRepository.save(course);
        }),
        deleteCourse: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const course = yield courseRepository.findOneBy({ id });
            if (!course)
                throw new Error("Course not found");
            const result = yield courseRepository.delete(id);
            return result.affected !== 0;
        }),
        blockUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const user = yield userRepository.findOneBy({ id });
            if (!user)
                throw new Error("User not found");
            user.blocked = true;
            return yield userRepository.save(user);
        }),
        unblockUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const user = yield userRepository.findOneBy({ id });
            if (!user)
                throw new Error("User not found");
            user.blocked = false;
            return yield userRepository.save(user);
        }),
        assignLecturer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { courseId, lecturerUsername }) {
            const course = yield courseRepository.findOneBy({ id: courseId });
            if (!course)
                throw new Error("Course not found");
            course.assignedLecturer = lecturerUsername;
            return yield courseRepository.save(course);
        })
    }
};
//# sourceMappingURL=resolvers.js.map