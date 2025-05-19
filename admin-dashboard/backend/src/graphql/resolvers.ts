import { AppDataSource } from "../data-source";
import { Admin } from "../entity/Admin";
import { Course } from "../entity/Course";
import { User } from "../entity/User";

const adminRepository = AppDataSource.getRepository(Admin);
const courseRepository = AppDataSource.getRepository(Course);
const userRepository = AppDataSource.getRepository(User);

export const resolvers = {
    Query: {
        admins: async () => await adminRepository.find(),
        courses: async () => await courseRepository.find(),
        users: async () => await userRepository.find(),
    },
    Mutation: {
        createAdmin: async (_: any, { username, password }: any) => {
            const admin = adminRepository.create({ username, password });
            return await adminRepository.save(admin);
        },
        createCourse: async (_: any, { courseName, code, description }: any) => {
            const course = courseRepository.create({ courseName, code, description });
            return await courseRepository.save(course);
        },
        createUser: async (_: any, { username, password, role }: any) => {
            const user = userRepository.create({ username, password, role });
            return await userRepository.save(user);
        }
    }
};