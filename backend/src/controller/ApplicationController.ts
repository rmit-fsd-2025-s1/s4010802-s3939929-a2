import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";
import { User } from "../entity/User";

export class ApplicationController {
  private applicationRepository = AppDataSource.getRepository(Application);
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response) {
    try {
      const applications = await this.applicationRepository.find({
        relations: ["user", "course"],
      });
      return response.json(applications);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Error fetching applications" });
    }
  }

  async one(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      const application = await this.applicationRepository.findOne({
        where: { id },
        relations: ["user", "course"],
      });

      if (!application) {
        return response.status(404).json({ message: "Application not found" });
      }

      return response.json(application);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Error fetching application" });
    }
  }


  async save(request: Request, response: Response) {
    try {
      const {
        name,
        role,
        courseId,
        availability,
        skills,
        academicCredentials,
      } = request.body;

      if (!name || !role || !courseId || !availability || !skills || !academicCredentials) {
        return response.status(400).json({ message: "All fields are required" });
      }

      const application = this.applicationRepository.create({
        course: { id: courseId },
        name,
        role,
        availability,
        skills,
        academicCredentials,
        dateApplied: new Date(),
      });

      const savedApplication = await this.applicationRepository.save(application);
      return response.status(201).json(savedApplication);
    } catch (error) {
      console.error("Error creating application:", error);
      return response.status(500).json({ message: "Error creating application", error });
    }
  }




  async update(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      const { availability, skills, academicCredentials } = request.body;

      let application = await this.applicationRepository.findOneBy({ id });

      if (!application) {
        return response.status(404).json({ message: "Application not found" });
      }

      application.availability = availability || application.availability;
      application.skills = skills || application.skills;
      application.academicCredentials = academicCredentials || application.academicCredentials;

      const updatedApplication = await this.applicationRepository.save(application);
      return response.json(updatedApplication);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ message: "Error updating application", error });
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      const application = await this.applicationRepository.findOneBy({ id });

      if (!application) {
        return response.status(404).json({ message: "Application not found" });
      }

      await this.applicationRepository.remove(application);
      return response.json({ message: "Application removed successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Error removing application", error });
    }
  }

  async removeAll(request: Request, response: Response) {
    try {
      await this.applicationRepository.clear();
      return response.json({ message: "All applications removed successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Error removing all applications", error });
    }
  }
}
