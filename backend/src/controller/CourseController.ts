import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";

export class CourseController {
  private courseRepository = AppDataSource.getRepository(Course);

  /**
   * Retrieves all courses from the database
   */
  async all(req: Request, res: Response) {
    try {
      const courses = await this.courseRepository.find({
        relations: ["applications"],
      });
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching courses" });
    }
  }

  /**
   * Retrieves a single course by ID
   */
  async one(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const course = await this.courseRepository.findOne({
        where: { id },
        relations: ["applications"],
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching course" });
    }
  }

  /**
   * Creates a new course
   */
  async save(req: Request, res: Response) {
    try {
      const { courseName, description } = req.body;

      // Check if the course name already exists
      const existingCourse = await this.courseRepository.findOne({
        where: { courseName },
      });

      if (existingCourse) {
        return res.status(400).json({ message: "Course name already exists" });
      }

      const course = this.courseRepository.create({
        courseName,
        description,
      });

      const savedCourse = await this.courseRepository.save(course);
      res.status(201).json(savedCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating course" });
    }
  }

  /**
   * Updates an existing course
   */
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { courseName, description } = req.body;

      let courseToUpdate = await this.courseRepository.findOne({
        where: { id },
      });

      if (!courseToUpdate) {
        return res.status(404).json({ message: "Course not found" });
      }

      courseToUpdate.courseName = courseName || courseToUpdate.courseName;
      courseToUpdate.description = description || courseToUpdate.description;

      const updatedCourse = await this.courseRepository.save(courseToUpdate);
      res.json(updatedCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating course" });
    }
  }

  /**
   * Deletes a course from the database by its ID
   */
  async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const courseToRemove = await this.courseRepository.findOne({
        where: { id },
      });

      if (!courseToRemove) {
        return res.status(404).json({ message: "Course not found" });
      }

      await this.courseRepository.remove(courseToRemove);
      res.json({ message: "Course removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting course" });
    }
  }

  /**
   * Deletes all courses from the database
   */
  async removeAll(req: Request, res: Response) {
    try {
      await this.courseRepository.clear();
      res.json({ message: "All courses removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting all courses" });
    }
  }
}
