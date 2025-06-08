"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./data-source");
const PORT = process.env.PORT || 3004;
data_source_1.AppDataSource.initialize()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => console.log("Database connection error:", error));
//# sourceMappingURL=index.js.map