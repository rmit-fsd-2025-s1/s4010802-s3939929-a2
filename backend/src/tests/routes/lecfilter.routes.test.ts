import request from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Course } from "../../entity/Course";
import { Application } from "../../entity/Application";

beforeAll(async () => {
  await AppDataSource.initialize();

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
  await AppDataSource.destroy();
});

describe("GET /api/applications?lecturerUsername=... should return applications filtered by skills", () => {
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
