"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Application_1 = require("./entity/Application");
const Selection_1 = require("./entity/Selection");
const Course_1 = require("./entity/Course");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "209.38.26.237",
    port: 3306,
    username: "S4010802",
    password: "S4010802",
    database: "S4010802",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Application_1.Application, Selection_1.Selection, Course_1.Course],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map