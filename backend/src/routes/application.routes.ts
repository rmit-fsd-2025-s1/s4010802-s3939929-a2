import { Router } from "express";
import { ApplicationController } from "../controller/ApplicationController";

const router = Router();
const applicationController = new ApplicationController();

router.get("/applications", async (req, res) => {
  await applicationController.all(req, res);
});

router.get("/applications/:id", async (req, res) => {
  await applicationController.one(req, res);
});

router.post("/applications", async (req, res) => {
  await applicationController.save(req, res);
});

router.put("/applications/:id", async (req, res) => {
  await applicationController.update(req, res);
});

router.delete("/applications/:id", async (req, res) => {
  await applicationController.remove(req, res);
});

router.delete("/applications", async (req, res) => {
  await applicationController.removeAll(req, res);
});

export default router;
