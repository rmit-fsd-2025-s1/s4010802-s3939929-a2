import request from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

beforeAll(async () => {
  await AppDataSource.initialize();
  await request(app).post("/api/users/signup").send({
    username: "loginuser@test.com",
    password: "SecurePass123",
    profession: "Tutor"
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("User Login", () => {
  it("should allow login with correct credentials", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "loginuser@test.com",
      password: "SecurePass123",
      profession: "Tutor"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.username).toBe("loginuser@test.com");
  });
  it("should reject login with incorrect password", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "loginuser@test.com",
      password: "WrongPassword",
      profession: "Tutor"
    });

    expect(response.status).toBe(401); 
    expect(response.body.message).toBe("Invalid credentials");
  });
});
