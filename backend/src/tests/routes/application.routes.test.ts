import request from "supertest";//for request simulation
import app from "../../app"; //for express commands
import { AppDataSource } from "../../data-source";//for typeORM 
import { User } from "../../entity/User";
import { Course } from "../../entity/Course";
let createdCourseId: number;
beforeAll(async () => {
  await AppDataSource.initialize();//prepare database for testing
  // Signup new tutor user
  await request(app).post("/api/users/signup").send({
    username: "try3@gmail.com",
    password: "Grapes@2025",
    confirmPassword: "Grapes@2025",
    profession: "Tutor",
  });
  // Create a course (if it doesn't exist)
  const courseRepo = AppDataSource.getRepository(Course);
  let course = await courseRepo.findOneBy({ courseName: "Web Development" });
  if (!course) {
    const newCourse = courseRepo.create({
      courseName: "Web Development",
      code: "WD101" + Date.now(), // ensuring unique code to avoid duplicate key
      description: "Learn HTML, CSS, JS",
    });
    const saved = await courseRepo.save(newCourse);
    createdCourseId = saved.id; //new course id
  } else {
    createdCourseId = course.id; //found course id 
  }
});
afterAll(async () => {
  await AppDataSource.destroy(); //close dataabse after all tests
});
describe("Tutor Application Submission", () => {
  it("should successfully submit a tutor application", async () => { //submitting an application
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ username: "try3@gmail.com" });
    const response = await request(app).post("/api/applications").send({
      userId: user?.id,
      name: "Ronnyy",
      role: "Lab Assistant",
      courseId: createdCourseId,
      availability: "part-time",
      skills: "React, Node.js, Java",
      academicCredentials: "Bachelor of Computer Science",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Ronnyy");
    expect(response.body.role).toBe("Lab Assistant");
    expect(response.body.skills).toContain("React"); //successful
  });
});
