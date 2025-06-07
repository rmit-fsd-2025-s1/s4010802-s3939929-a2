import request from "supertest"; //for request simulation
import app from "../../app"; //express commands
import { AppDataSource } from "../../data-source"; //typeORM part
import { Course } from "../../entity/Course";
import { Application } from "../../entity/Application";
beforeAll(async () => {
  await AppDataSource.initialize(); //to prepare database for testing
  // Create lecturer user
  await request(app).post("/api/usrs/signup").send({
    username: "lecturer@skills.com",
    password: "Password123",
    profession: "Lecturer",
});
  // Create course and assign lecturer
const courseRepo = AppDataSource.getRepository(Course);
const course = courseRepo.create({
    courseName: "Frontend Engineering",
    code: "FE101",
    description: "React and UI design",
    assignedLecturer: "lecturer@skills.com",
});
await courseRepo.save(course);
// Create application with React skills
const appRepo = AppDataSource.getRepository(Application);
const application = appRepo.create({
    name: "Jane Developer",
    role: "Tutor",
    availability: "full-time",
    skills: "React, Redux, JavaScript",
    academicCredentials: "BTech",
    dateApplied: new Date(),
    course: course,
});
await appRepo.save(application);
});
afterAll(async () => {
  await AppDataSource.destroy(); //close the database after all tests
});
describe("GET /api/applications?lecturerUsername=... should return applications filtered by skills", () => { //filtering all applications which have the skills as "React"
  it("should return applications where skills contain 'React'", async () => {
    const res = await request(app).get("/api/applications?lecturerUsername=lecturer@skills.com");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    // Ensure each application includes the skill "React"
    const hasReactSkill = res.body.some((app: any) =>
      app.skills.toLowerCase().includes("react")
    );
    expect(hasReactSkill).toBe(true);
  });
});
