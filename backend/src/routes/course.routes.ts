import { Router } from "express";
import { CourseController } from "../controller/CourseController";

const router = Router();
const courseController = new CourseController();

router.get("/", courseController.getAllCourses);
router.get("/courses", async (req, res) => {
  try {
    await courseController.all(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});


router.get("/courses/:id", async (req, res) => {
  try {
    await courseController.one(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching course" });
  }
});


router.post("/courses", async (req, res) => {
  try {
    await courseController.save(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating course" });
  }
});


router.put("/courses/:id", async (req, res) => {
  try {
    await courseController.update(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating course" });
  }
});


router.delete("/courses/:id", async (req, res) => {
  try {
    await courseController.remove(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting course" });
  }
});


router.delete("/courses", async (req, res) => {
  try {
    await courseController.removeAll(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting all courses" });
  }
});

export default router;
