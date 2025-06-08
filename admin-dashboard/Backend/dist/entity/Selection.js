"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selection = void 0;
const typeorm_1 = require("typeorm");
const Application_1 = require("./Application");
let Selection = class Selection {
};
exports.Selection = Selection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Selection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Selection.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Selection.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application_1.Application, (application) => application.selections, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Application_1.Application)
], Selection.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Selection.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Selection.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Selection.prototype, "tutorName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Selection.prototype, "lecturerUsername", void 0);
exports.Selection = Selection = __decorate([
    (0, typeorm_1.Entity)()
], Selection);
//# sourceMappingURL=Selection.js.map