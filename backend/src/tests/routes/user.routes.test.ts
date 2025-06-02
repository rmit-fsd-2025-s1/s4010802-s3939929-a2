import request from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});



describe("User Signup", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/users/signup").send({
      username: "user@gmail.com",
      password: "Tutor1234",
      profession: "Tutor",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.username).toBe("user@gmail.com");
  });
});
