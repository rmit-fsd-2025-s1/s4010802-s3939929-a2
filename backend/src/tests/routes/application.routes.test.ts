import request from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Course } from "../../entity/Course";

beforeAll(async () => {
  await AppDataSource.initialize();
  await request(app).post("/api/usrs/signup").send({
    username: "tutor@app.com",
    password: "Password123",
    profession: "Tutor",
  });
  const courseRepo = AppDataSource.getRepository(Course);
  await courseRepo.save({ id: 2, name: "Web Development" });
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Tutor Application Submission", () => {
  it("should successfully submit a tutor application", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ username: "tutor@app.com" });

    const response = await request(app).post("/api/applications").send({
      userId: user?.id,
      name: "Ron Weasley",
      role: "Tutor",
      courseId: 2,
      availability: "Monday-Wednesday",
      skills: "React, Node.js, Java",
      academicCredentials: "Bachelor of Computer Science"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Ron Weasley");
    expect(response.body.role).toBe("Tutor");
    expect(response.body.skills).toContain("React");
  });
});
