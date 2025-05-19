import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { User } from "../entity/User";
import { Admin } from "../entity/Admin";

const courseRepository = AppDataSource.getRepository(Course);
const userRepository = AppDataSource.getRepository(User);
const adminRepository = AppDataSource.getRepository(Admin);

export const resolvers = {
  Query: {
    courses: () => courseRepository.find(),
    users: () => userRepository.find(),
    admins: () => adminRepository.find(),
  },
  Mutation: {
    createCourse: (_: any, args: any) => {
      const course = courseRepository.create(args);
      return courseRepository.save(course);
    },
    createUser: (_: any, args: any) => {
      const user = userRepository.create(args);
      return userRepository.save(user);
    },
    createAdmin: (_: any, args: any) => {
      const admin = adminRepository.create(args);
      return adminRepository.save(admin);
    },
  },
};