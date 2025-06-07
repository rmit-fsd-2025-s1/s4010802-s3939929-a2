import request from "supertest"; //for request simulation
import app from "../../app"; //express commands
import { AppDataSource } from "../../data-source"; // typeORM part
import { User } from "../../entity/User";
import { Course } from "../../entity/Course";
beforeAll(async () => {
  await AppDataSource.initialize(); //prepare database for testing
  await request(app).post("/api/usrs/signup").send({
    username: "tutor@app.com",
    password: "Password123",
    profession: "Tutor", // create a new user
  });
  const courseRepo = AppDataSource.getRepository(Course);
  await courseRepo.save({ id: 2, name: "Web Development" }); //check for course
});
afterAll(async () => {
  await AppDataSource.destroy(); //close database after all tests
});
describe("Tutor Application Submission", () => {
  it("should successfully submit a tutor application", async () => { //submitting a complete tutor application
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ username: "tutor@app.com" });
    const response = await request(app).post("/api/applications").send({
      userId: user?.id,
      name: "Ron Weasley",
      role: "Tutor",
      courseId: 2,
      availability: "Monday-Wednesday",
      skills: "React, Node.js, Java",
      academicCredentials: "Bachelor of Computer Science" //input for tutor application
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Ron Weasley");
    expect(response.body.role).toBe("Tutor");
    expect(response.body.skills).toContain("React"); //confirming all the input fields.
  });
});
