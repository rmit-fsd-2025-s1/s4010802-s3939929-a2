import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";

export class ApplicationController {
  private applicationRepository = AppDataSource.getRepository(Application);

  async all(request: Request, response: Response) {
    const applications = await this.applicationRepository.find({ relations: ["user", "course"] });
    return response.json(applications);
  }

  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ["user", "course"],
    });

    if (!application) {
      return response.status(404).json({ message: "Application not found" });
    }

    return response.json(application);
  }

  async save(request: Request, response: Response) {
    const { userId, courseId, availability, skills, academicCredentials, dateApplied } = request.body;
    const application = this.applicationRepository.create({
      user: { id: userId },
      course: { id: courseId },
      availability,
      skills,
      academicCredentials,
      dateApplied,
    });

    try {
      const savedApplication = await this.applicationRepository.save(application);
      return response.status(201).json(savedApplication);
    } catch (error) {
      return response.status(400).json({ message: "Error creating application", error });
    }
  }

  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { availability, skills, academicCredentials } = request.body;
    let application = await this.applicationRepository.findOneBy({ id });

    if (!application) {
      return response.status(404).json({ message: "Application not found" });
    }

    application.availability = availability || application.availability;
    application.skills = skills || application.skills;
    application.academicCredentials = academicCredentials || application.academicCredentials;

    try {
      const updatedApplication = await this.applicationRepository.save(application);
      return response.json(updatedApplication);
    } catch (error) {
      return response.status(400).json({ message: "Error updating application", error });
    }
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const application = await this.applicationRepository.findOneBy({ id });

    if (!application) {
      return response.status(404).json({ message: "Application not found" });
    }

    await this.applicationRepository.remove(application);
    return response.json({ message: "Application removed successfully" });
  }

  async removeAll(request: Request, response: Response) {
    try {
      await this.applicationRepository.clear();
      return response.json({ message: "All applications removed successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Error removing all applications", error });
    }
  }
}
