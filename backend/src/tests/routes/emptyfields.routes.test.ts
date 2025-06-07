import request from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Tutor Application Validation", () => {
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/api/applications").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message.toLowerCase()).toContain("all fields are required");
  });

  it("should return 400 if only some fields are present", async () => {
    const response = await request(app).post("/api/applications").send({
      name: "Incomplete User",
      role: "Tutor",
      courseId: 1,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message.toLowerCase()).toContain("all fields are required");
  });
});
