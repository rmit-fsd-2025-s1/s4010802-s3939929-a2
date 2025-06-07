import request from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Course } from "../../entity/Course";
import { Application } from "../../entity/Application";

beforeAll(async () => {
  await AppDataSource.initialize();

  // Create a lecturer user
  await request(app).post("/api/usrs/signup").send({
    username: "tutor@app.com",
    password: "Password123",
    profession: "Lecturer",
  });

  // Create a course
  const courseRepo = AppDataSource.getRepository(Course);
  const testCourse = courseRepo.create({
    courseName: "Web Development",
    code: "WD101",
    description: "Learn HTML, CSS, JS",
    assignedLecturer: "tutor@app.com",
  });
  await courseRepo.save(testCourse);

  // Add an application with part-time availability
  const appRepo = AppDataSource.getRepository(Application);
  const application = appRepo.create({
    name: "John Doe",
    role: "Tutor",
    availability: "part-time",
    skills: "HTML, CSS, JS",
    academicCredentials: "BSc in CS",
    dateApplied: new Date(),
    course: testCourse,
  });
  await appRepo.save(application);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("GET /api/applications?lecturerUsername=... should return only part-time applications", () => {
  it("should return applications filtered by part-time availability", async () => {
    const res = await request(app).get("/api/applications?lecturerUsername=tutor@app.com");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    // Check all returned applications have part-time availability
    for (const app of res.body) {
      expect(app.availability.toLowerCase()).toBe("part-time");
    }
  });
});
