"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Course_1 = require("../src/entity/Course");
const User_1 = require("../src/entity/User");
const Selection_1 = require("./entity/Selection");
const Application_1 = require("./entity/Application");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "209.38.26.237",
    port: 3306,
    username: "S4010802",
    password: "S4010802",
    database: "S4010802",
    synchronize: true,
    logging: true,
    entities: [Course_1.Course, User_1.User, Selection_1.Selection, Application_1.Application],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map