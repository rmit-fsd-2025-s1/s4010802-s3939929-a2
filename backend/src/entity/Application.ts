import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { Selection } from "./Selection";

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @ManyToOne(() => Course, (course) => course.applications)
  course: Course;

  @OneToMany(() => Selection, (selection) => selection.application)
  selections: Selection[];

  @Column()
  availability: string;

  @Column()
  skills: string;

  @Column()
  academicCredentials: string;

  @CreateDateColumn()
  dateApplied: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
