import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

function isStrongPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(_: Request, res: Response): Promise<Response> {
    const users = await this.userRepository.find();
    return res.json(users);
  }

  async one(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  }

  async save(req: Request, res: Response): Promise<Response> {
    const { username, password, profession } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
        profession,
      });
      const savedUser = await this.userRepository.save(user);
      return res.status(201).json(savedUser);
    } catch (error) {
      return res.status(500).json({ message: "Could not save user", error });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { username, password, profession } = req.body;

    try {
      const user = await this.userRepository.findOneBy({ username });

      if (
        !user ||
        !(await bcrypt.compare(password, user.password)) ||
        user.profession !== profession
      ) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (user.blocked) {
        return res.status(403).json({ message: "User is blocked by admin", user });
      }

      return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async profile(req: Request, res: Response): Promise<Response> {
    const username = req.params.username;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    this.userRepository.merge(user, req.body);
    const result = await this.userRepository.save(user);
    return res.json(result);
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  }

  async removeAll(_: Request, res: Response): Promise<Response> {
    await this.userRepository.clear();
    return res.json({ message: "All users removed successfully" });
  }

  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, confirmPassword, profession } = req.body;

      const existingUser = await this.userRepository.findOneBy({ username });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      if (!isStrongPassword(password)) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
        profession,
      });

      const savedUser = await this.userRepository.save(user);
      return res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
