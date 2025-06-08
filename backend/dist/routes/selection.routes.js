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
const SelectionController_1 = require("../controller/SelectionController");
const router = (0, express_1.Router)();
const selectionController = new SelectionController_1.SelectionController();
router.get("/selections", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield selectionController.all(req, res);
}));
router.get("/selections/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield selectionController.one(req, res);
}));
router.post("/selections", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield selectionController.save(req, res);
}));
router.put("/selections/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield selectionController.update(req, res);
}));
router.delete("/selections/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield selectionController.remove(req, res);
}));
router.delete("/selections", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield selectionController.removeAll(req, res);
}));
exports.default = router;
//# sourceMappingURL=selection.routes.js.map