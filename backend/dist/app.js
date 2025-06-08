"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const selection_routes_1 = __importDefault(require("./routes/selection.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api", user_routes_1.default);
app.use("/api", course_routes_1.default);
app.use("/api", application_routes_1.default);
app.use("/api", selection_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map