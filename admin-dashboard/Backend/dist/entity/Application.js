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
exports.Application = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Course_1 = require("./Course");
const Selection_1 = require("./Selection");
let Application = class Application {
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.applications),
    __metadata("design:type", User_1.User)
], Application.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Course_1.Course, (course) => course.applications),
    __metadata("design:type", Course_1.Course)
], Application.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Selection_1.Selection, (selection) => selection.application),
    __metadata("design:type", Array)
], Application.prototype, "selections", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "academicCredentials", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "dateApplied", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)()
], Application);
//# sourceMappingURL=Application.js.map