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
const express_1 = require("express");
const CourseController_1 = require("../controller/CourseController");
const router = (0, express_1.Router)();
const courseController = new CourseController_1.CourseController();
router.get("/", courseController.getAllCourses);
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield courseController.all(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching courses" });
    }
}));
router.get("/courses/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield courseController.one(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching course" });
    }
}));
router.post("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield courseController.save(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating course" });
    }
}));
router.put("/courses/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield courseController.update(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating course" });
    }
}));
router.delete("/courses/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield courseController.remove(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting course" });
    }
}));
router.delete("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield courseController.removeAll(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting all courses" });
    }
}));
exports.default = router;
//# sourceMappingURL=course.routes.js.map