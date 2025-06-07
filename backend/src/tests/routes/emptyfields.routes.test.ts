import request from "supertest"; //for request simulation
import app from "../../app"; //for express commands
import { AppDataSource } from "../../data-source"; //typeORM part
beforeAll(async () => {
  await AppDataSource.initialize(); //prepare database for testing
});
afterAll(async () => {
  await AppDataSource.destroy(); //close database after all tests
});
describe("Tutor Application Validation", () => {
    it("should return 400 if required fields are missing", async () => { //checking when the application is submitted with empty fields
    const response = await request(app).post("/api/applications").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message.toLowerCase()).toContain("all fields are required"); //says all fields are required
  });
  it("should return 400 if only some fields are present", async () => {
    const response = await request(app).post("/api/applications").send({
      name: "Ron",
      role: "Tutor",//submitting only some fields
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message.toLowerCase()).toContain("all fields are required");//returns error message needs all fields.
  });
});
