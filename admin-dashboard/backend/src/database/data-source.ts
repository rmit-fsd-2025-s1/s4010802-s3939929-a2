import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin";
import { Course } from "./entity/Course";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "209.38.26.237",
    port: 3306,
    username: "admin",
    password: "admin",
    database: "admin_dashboard",
    synchronize: true,
    logging: true,
    entities: [Admin, Course, User],
    migrations: [],
    subscribers: [],
});