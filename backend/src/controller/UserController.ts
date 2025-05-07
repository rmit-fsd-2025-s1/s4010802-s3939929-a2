import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response) {
    const users = await this.userRepository.find();
    return response.json(users);
  }

  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.json(user);
  }

  async save(request: Request, response: Response) {
    const { username, password, profession } = request.body;
    const user = this.userRepository.create({ username, password, profession });

    try {
      const savedUser = await this.userRepository.save(user);
      return response.status(201).json(savedUser);
    } catch (error) {
      return response.status(400).json({ message: "Error creating user", error });
    }
  }

  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { username, password, profession } = request.body;
    let user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.password = password || user.password;
    user.profession = profession || user.profession;

    try {
      const updatedUser = await this.userRepository.save(user);
      return response.json(updatedUser);
    } catch (error) {
      return response.status(400).json({ message: "Error updating user", error });
    }
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    await this.userRepository.remove(user);
    return response.json({ message: "User removed successfully" });
  }

  async removeAll(request: Request, response: Response) {
    try {
      await this.userRepository.clear();
      return response.json({ message: "All users removed successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Error removing all users", error });
    }
  }
  async login(request: Request, response: Response) {
    const { username, password, profession } = request.body;

    if (!username || !password || !profession) {
      return response.status(400).json({ message: "Missing username, password, or profession" });
    }

    try {
      const user = await this.userRepository.findOneBy({ username, profession });

      if (!user || user.password !== password) {
        return response.status(401).json({ message: "Invalid credentials" });
      }

      return response.json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          profession: user.profession,
        },
      });
    } catch (error) {
      return response.status(500).json({ message: "Error during login", error });
    }
  }

}
