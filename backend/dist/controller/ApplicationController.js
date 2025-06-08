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
exports.ApplicationController = void 0;
const data_source_1 = require("../data-source");
const Application_1 = require("../entity/Application");
const User_1 = require("../entity/User");
class ApplicationController {
    constructor() {
        this.applicationRepository = data_source_1.AppDataSource.getRepository(Application_1.Application);
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    all(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lecturerUsername = request.query.lecturerUsername;
                const query = this.applicationRepository
                    .createQueryBuilder("application")
                    .leftJoinAndSelect("application.course", "course")
                    .leftJoinAndSelect("application.user", "user");
                if (lecturerUsername) {
                    query.where("course.assignedLecturer = :lecturerUsername", { lecturerUsername });
                }
                const applications = yield query.getMany();
                return response.json(applications);
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ message: "Error fetching applications" });
            }
        });
    }
    one(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                const application = yield this.applicationRepository.findOne({
                    where: { id },
                    relations: ["user", "course"],
                });
                if (!application) {
                    return response.status(404).json({ message: "Application not found" });
                }
                return response.json(application);
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ message: "Error fetching application" });
            }
        });
    }
    save(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, role, courseId, availability, skills, academicCredentials, } = request.body;
                if (!name || !role || !courseId || !availability || !skills || !academicCredentials) {
                    return response.status(400).json({ message: "All fields are required" });
                }
                const existing = yield this.applicationRepository.findOne({
                    where: {
                        name,
                        course: { id: courseId },
                        role,
                    },
                    relations: ["course"],
                });
                if (existing) {
                    return response.status(400).json({
                        message: "You have already applied for this role in this course.",
                    });
                }
                const application = this.applicationRepository.create({
                    course: { id: courseId },
                    name,
                    role,
                    availability,
                    skills,
                    academicCredentials,
                    dateApplied: new Date(),
                });
                const savedApplication = yield this.applicationRepository.save(application);
                return response.status(201).json(savedApplication);
            }
            catch (error) {
                console.error("Error creating application:", error);
                return response.status(500).json({ message: "Error creating application", error });
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                const { availability, skills, academicCredentials } = request.body;
                let application = yield this.applicationRepository.findOneBy({ id });
                if (!application) {
                    return response.status(404).json({ message: "Application not found" });
                }
                application.availability = availability || application.availability;
                application.skills = skills || application.skills;
                application.academicCredentials = academicCredentials || application.academicCredentials;
                const updatedApplication = yield this.applicationRepository.save(application);
                return response.json(updatedApplication);
            }
            catch (error) {
                console.error(error);
                return response.status(400).json({ message: "Error updating application", error });
            }
        });
    }
    remove(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                const application = yield this.applicationRepository.findOneBy({ id });
                if (!application) {
                    return response.status(404).json({ message: "Application not found" });
                }
                yield this.applicationRepository.remove(application);
                return response.json({ message: "Application removed successfully" });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ message: "Error removing application", error });
            }
        });
    }
    removeAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.applicationRepository.clear();
                return response.json({ message: "All applications removed successfully" });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ message: "Error removing all applications", error });
            }
        });
    }
}
exports.ApplicationController = ApplicationController;
//# sourceMappingURL=ApplicationController.js.map