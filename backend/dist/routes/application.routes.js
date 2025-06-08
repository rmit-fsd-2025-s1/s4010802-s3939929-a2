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
const ApplicationController_1 = require("../controller/ApplicationController");
const router = (0, express_1.Router)();
const applicationController = new ApplicationController_1.ApplicationController();
router.get("/applications", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield applicationController.all(req, res);
}));
router.get("/applications/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield applicationController.one(req, res);
}));
router.post("/applications", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield applicationController.save(req, res);
}));
router.put("/applications/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield applicationController.update(req, res);
}));
router.delete("/applications/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield applicationController.remove(req, res);
}));
router.delete("/applications", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield applicationController.removeAll(req, res);
}));
exports.default = router;
//# sourceMappingURL=application.routes.js.map