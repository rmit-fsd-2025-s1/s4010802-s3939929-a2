import "reflect-metadata";
import { DataSource } from "typeorm";
import { Course } from "../src/entity/Course";
import { User } from "../src/entity/User";
import { Selection } from "./entity/Selection";
import { Application } from "./entity/Application";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: "S4010802",
  password: "S4010802",
  database: "S4010802",
  synchronize: true,
  logging: true,
  entities: [Course, User, Selection, Application],
  migrations: [],
  subscribers: [],
});