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
exports.SelectionController = void 0;
const data_source_1 = require("../data-source");
const Selection_1 = require("../entity/Selection");
class SelectionController {
    constructor() {
        this.selectionRepository = data_source_1.AppDataSource.getRepository(Selection_1.Selection);
    }
    all(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const selections = yield this.selectionRepository.find({ relations: ["application"] });
            return response.json(selections);
        });
    }
    one(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(request.params.id);
            const selection = yield this.selectionRepository.findOne({
                where: { id },
                relations: ["application"],
            });
            if (!selection) {
                return response.status(404).json({ message: "Selection not found" });
            }
            return response.json(selection);
        });
    }
    save(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { applicationId, rank, comment, tutorName, lecturerUsername } = request.body;
            const selection = this.selectionRepository.create({
                application: { id: applicationId },
                rank,
                comment,
                tutorName,
                lecturerUsername,
            });
            try {
                const savedSelection = yield this.selectionRepository.save(selection);
                return response.status(201).json(savedSelection);
            }
            catch (error) {
                return response.status(400).json({ message: "Error creating selection", error });
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicationId = parseInt(request.params.id);
            const { rank, comment } = request.body;
            const selection = yield this.selectionRepository.findOne({
                where: {
                    application: { id: applicationId },
                },
                relations: ["application"],
            });
            if (!selection) {
                return response.status(404).json({ message: "Selection not found for this application" });
            }
            if (rank !== undefined) {
                selection.rank = rank;
            }
            if (comment !== undefined) {
                selection.comment = comment;
            }
            try {
                const updatedSelection = yield this.selectionRepository.save(selection);
                return response.json(updatedSelection);
            }
            catch (error) {
                console.error("Error updating selection:", error);
                return response.status(400).json({ message: "Error updating selection", error });
            }
        });
    }
    remove(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(request.params.id);
            const selection = yield this.selectionRepository.findOneBy({ id });
            if (!selection) {
                return response.status(404).json({ message: "Selection not found" });
            }
            yield this.selectionRepository.remove(selection);
            return response.json({ message: "Selection removed successfully" });
        });
    }
    removeAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.selectionRepository.clear();
                return response.json({ message: "All selections removed successfully" });
            }
            catch (error) {
                return response.status(500).json({ message: "Error removing all selections", error });
            }
        });
    }
}
exports.SelectionController = SelectionController;
//# sourceMappingURL=SelectionController.js.map