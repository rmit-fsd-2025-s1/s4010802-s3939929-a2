import { Router } from "express";
import { CourseController } from "../controller/CourseController";

const router = Router();
const courseController = new CourseController();

// Get all courses
router.get("/courses", async (req, res) => {
  try {
    await courseController.all(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Get a single course by ID
router.get("/courses/:id", async (req, res) => {
  try {
    await courseController.one(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching course" });
  }
});

// Create a new course
router.post("/courses", async (req, res) => {
  try {
    await courseController.save(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating course" });
  }
});

// Update an existing course
router.put("/courses/:id", async (req, res) => {
  try {
    await courseController.update(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating course" });
  }
});

// Delete a course by ID
router.delete("/courses/:id", async (req, res) => {
  try {
    await courseController.remove(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting course" });
  }
});

// Delete all courses
router.delete("/courses", async (req, res) => {
  try {
    await courseController.removeAll(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting all courses" });
  }
});

export default router;
