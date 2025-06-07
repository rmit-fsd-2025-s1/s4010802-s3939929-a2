import request from "supertest"; //for request simulation
import app from "../../app"; //express commands
import { AppDataSource } from "../../data-source"; //typeORM part
import { Course } from "../../entity/Course";
import { Application } from "../../entity/Application";
beforeAll(async () => {
  await AppDataSource.initialize(); //prepare database for testing
  // Create a lecturer user
  await request(app).post("/api/users/login").send({
    username: "tutorr@app",
    password: "Password@123",
    confirmPassword: "Password@123",
    profession: "Lecturer",
});
});
afterAll(async () => {
  await AppDataSource.destroy(); //close the database after all tests
});
describe("GET /api/applications?lecturerUsername=... should return only part-time applications", () => { // display the applications to the assigned lecturer only
  it("should return applications filtered by part-time availability", async () => {
    const res = await request(app).get("/api/applications?lecturerUsername=tutorr@app.com"); // filtering the course based on part-time availability
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    // Check all returned applications have part-time availability
    for (const app of res.body) {
      expect(app.availability.toLowerCase()).toBe("part-time");
    }
  });
});
