import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { User } from "../entity/User";
import { Selection } from "../entity/Selection";
import { Application } from "../entity/Application"

const courseRepository = AppDataSource.getRepository(Course);
const userRepository = AppDataSource.getRepository(User);

export const resolvers = {
  Query: {
    courses: () => courseRepository.find(),
    users: () => userRepository.find(),

  candidatesPerCourse: async function () {

  const selections = await AppDataSource.getRepository(Selection).find({
    relations: ["application", "application.course"]
  });

  const grouped = new Map<string, string[]>();

  selections.forEach((sel) => {
    const courseName = sel.application?.course?.courseName;
    const tutorName = sel.tutorName; 

    if (courseName && tutorName) {
      if (!grouped.has(courseName)) grouped.set(courseName, []);
      grouped.get(courseName)!.push(tutorName);
    }
  });

  return Array.from(grouped.entries()).map(([course, tutors]) => [`Course: ${course}`, ...tutors]);
},

tutorsChosenForMoreThan3Courses: async function () {
  const selections = await AppDataSource.getRepository(Selection).find();

  const countMap = new Map<string, number>();
  selections.forEach((sel) => {
    const name = sel.tutorName;
    countMap.set(name, (countMap.get(name) || 0) + 1);
  });

  return Array.from(countMap.entries())
    .filter(([_, count]) => count > 3)
    .map(([name]) => name);
},

unselectedTutors: async (): Promise<string[]> => {
  const appRepo = AppDataSource.getRepository(Application);
  const selectionRepo = AppDataSource.getRepository(Selection);

  const allTutors = await appRepo.find({ where: { role: "Tutor" } });
  const selections = await selectionRepo.find();

  const selectedNames = new Set(selections.map(sel => sel.tutorName));

  return allTutors
    .filter(tutor => !selectedNames.has(tutor.name))
    .map(tutor => tutor.name);
}},
  Mutation: {
    createCourse: (_: any, args: any) => {
      const course = courseRepository.create(args);
      return courseRepository.save(course);
    },

    createUser: (_: any, args: any) => {
      const user = userRepository.create(args);
      return userRepository.save(user);
    },

    updateCourse: async (_: any, { id, courseName, code, description }: any) => {
      const course = await courseRepository.findOneBy({ id });
      if (!course) throw new Error("Course not found");

      course.courseName = courseName ?? course.courseName;
      course.code = code ?? course.code;
      course.description = description ?? course.description;

      return await courseRepository.save(course);
    },

    deleteCourse: async (_: any, { id }: any) => {
      const course = await courseRepository.findOneBy({ id });
      if (!course) throw new Error("Course not found");

      const result = await courseRepository.delete(id);
      return result.affected !== 0;
    },

    blockUser: async (_: any, { id }: any) => {
      const user = await userRepository.findOneBy({ id });
      if (!user) throw new Error("User not found");
      user.blocked = true;
      return await userRepository.save(user);
    },

    unblockUser: async (_: any, { id }: any) => {
      const user = await userRepository.findOneBy({ id });
      if (!user) throw new Error("User not found");
      user.blocked = false;
      return await userRepository.save(user);
    },

    assignLecturer: async (_: any, { courseId, lecturerUsername }: any) => {
      const course = await courseRepository.findOneBy({ id: courseId });
      if (!course) throw new Error("Course not found");
      course.assignedLecturer = lecturerUsername;
      return await courseRepository.save(course);
    }
  }
};
