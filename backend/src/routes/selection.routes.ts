import { Router } from "express";
import { SelectionController } from "../controller/SelectionController";

const router = Router();
const selectionController = new SelectionController();

router.get("/selections", async (req, res) => {
  await selectionController.all(req, res);
});

router.get("/selections/:id", async (req, res) => {
  await selectionController.one(req, res);
});

router.post("/selections", async (req, res) => {
  await selectionController.save(req, res);
});

router.put("/selections/:id", async (req, res) => {
  await selectionController.update(req, res);
});

router.delete("/selections/:id", async (req, res) => {
  await selectionController.remove(req, res);
});

router.delete("/selections", async (req, res) => {
  await selectionController.removeAll(req, res);
});

export default router;
