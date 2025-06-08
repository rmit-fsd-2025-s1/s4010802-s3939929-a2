import request from "supertest"; //for request simulation
import app from "../../app"; //express commands
import { AppDataSource } from "../../data-source"; //typeORM part
beforeAll(async () => {
  await AppDataSource.initialize(); // to prepare database for testing
});
afterAll(async () => {
  await AppDataSource.destroy(); //for closing the database after all tests are done
});
describe("User Signup", () => {
  it("should create a new user", async () => { // checking successful signup
    const response = await request(app).post("/api/users/signup").send({
      username: "user7@gmail.com",
      password: "Tutor@1234",
      confirmPassword: "Tutor@1234",
      profession: "Tutor", // details entered in the signup
    });
    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.username).toBe("user7@gmail.com"); //the expected returned username of new user
  });
});
