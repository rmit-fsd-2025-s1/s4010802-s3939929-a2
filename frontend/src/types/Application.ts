import { Course } from "./Course";

export type Application = {
  userId: number;
  courseId: number;
  availability: string;
  skills: string;
  academicCredentials: string;
  dateApplied: string;
  course?: Course;
};
