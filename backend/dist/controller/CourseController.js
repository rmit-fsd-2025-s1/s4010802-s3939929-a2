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
exports.CourseController = void 0;
const data_source_1 = require("../data-source");
const Course_1 = require("../entity/Course");
class CourseController {
    constructor() {
        this.courseRepository = data_source_1.AppDataSource.getRepository(Course_1.Course);
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.courseRepository.find({
                    relations: ["applications"],
                });
                res.json(courses);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error fetching courses" });
            }
        });
    }
    one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const course = yield this.courseRepository.findOne({
                    where: { id },
                    relations: ["applications"],
                });
                if (!course) {
                    return res.status(404).json({ message: "Course not found" });
                }
                res.json(course);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error fetching course" });
            }
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { courseName, description } = req.body;
                const existingCourse = yield this.courseRepository.findOne({
                    where: { courseName },
                });
                if (existingCourse) {
                    return res.status(400).json({ message: "Course name already exists" });
                }
                const course = this.courseRepository.create({
                    courseName,
                    description,
                });
                const savedCourse = yield this.courseRepository.save(course);
                res.status(201).json(savedCourse);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error creating course" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { courseName, description } = req.body;
                let courseToUpdate = yield this.courseRepository.findOne({
                    where: { id },
                });
                if (!courseToUpdate) {
                    return res.status(404).json({ message: "Course not found" });
                }
                courseToUpdate.courseName = courseName || courseToUpdate.courseName;
                courseToUpdate.description = description || courseToUpdate.description;
                const updatedCourse = yield this.courseRepository.save(courseToUpdate);
                res.json(updatedCourse);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error updating course" });
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const courseToRemove = yield this.courseRepository.findOne({
                    where: { id },
                });
                if (!courseToRemove) {
                    return res.status(404).json({ message: "Course not found" });
                }
                yield this.courseRepository.remove(courseToRemove);
                res.json({ message: "Course removed successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error deleting course" });
            }
        });
    }
    removeAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.courseRepository.clear();
                res.json({ message: "All courses removed successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error deleting all courses" });
            }
        });
    }
    getAllCourses(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseRepo = data_source_1.AppDataSource.getRepository(Course_1.Course);
                const courses = yield courseRepo.find();
                return res.json(courses);
            }
            catch (err) {
                return res.status(500).json({ message: "Failed to fetch courses", error: err });
            }
        });
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=CourseController.js.map