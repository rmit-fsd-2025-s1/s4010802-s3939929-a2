import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Application } from "./entity/Application";
import { Selection } from "./entity/Selection";
import { Course } from "./entity/Course";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: "S4010802",
  password: "S4010802",
  database: "S4010802",
  synchronize: true,
  logging: false,
  entities: [User, Application, Selection, Course],
  migrations: [],
  subscribers: [],
});
