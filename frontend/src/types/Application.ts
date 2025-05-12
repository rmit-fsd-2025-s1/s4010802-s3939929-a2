import { Course } from "./Course";

export type Application = {
  userId: number;
  courseId: number;
  name: String;
  role: String;
  availability: string;
  skills: string;
  academicCredentials: string;
  dateApplied: string;
  course?: Course;
};
