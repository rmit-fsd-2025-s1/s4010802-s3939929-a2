import request from "supertest"; // for request simulation
import app from "../../app"; // express commands
import { AppDataSource } from "../../data-source"; // typeORM part
beforeAll(async () => {
  await AppDataSource.initialize(); //prepare database for testing
  await request(app).post("/api/users/signup").send({
    username: "loginuser1@test.com",
    password: "SecurePass@123",
    confirmPassword: "SecurePass@123",
    profession: "Tutor" //creating a new user to test for login
  });
});
afterAll(async () => {
  await AppDataSource.destroy(); //close the database after all test
});
describe("User Login", () => {
  it("should allow login with correct credentials", async () => { //allows login
    const response = await request(app).post("/api/users/login").send({
      username: "loginuser1@test.com",
      password: "SecurePass@123",
      confirmPassword: "SecurePass@123",
      profession: "Tutor" //login with correct user details
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.username).toBe("loginuser1@test.com"); //expected and correct username
  });
  it("should reject login with incorrect password", async () => { //denys login
    const response = await request(app).post("/api/users/login").send({
      username: "loginuser1@test.com",
      password: "WrongPassword",
      cinfirmPassword: "WrongPassword",
      profession: "Tutor" //wrong details used for login
    });
    expect(response.status).toBe(401); 
    expect(response.body.message).toBe("Invalid credentials"); //rejects login due to invalid details entered
  });
});
