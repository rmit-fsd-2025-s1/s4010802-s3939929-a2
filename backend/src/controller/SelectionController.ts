import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Selection } from "../entity/Selection";

export class SelectionController {
  private selectionRepository = AppDataSource.getRepository(Selection);

  async all(request: Request, response: Response) {
    const selections = await this.selectionRepository.find({ relations: ["application"] });
    return response.json(selections);
  }

  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const selection = await this.selectionRepository.findOne({
      where: { id },
      relations: ["application"],
    });

    if (!selection) {
      return response.status(404).json({ message: "Selection not found" });
    }

    return response.json(selection);
  }

  async save(request: Request, response: Response) {
    const { applicationId, rank, comment, tutorName, lecturerUsername} = request.body;
    const selection = this.selectionRepository.create({
      application: { id: applicationId },
      rank,
      comment,
      tutorName,
      lecturerUsername,
    });

    try {
      const savedSelection = await this.selectionRepository.save(selection);
      return response.status(201).json(savedSelection);
    } catch (error) {
      return response.status(400).json({ message: "Error creating selection", error });
    }
  }

  async update(request: Request, response: Response) {
    const applicationId = parseInt(request.params.id);
    const { rank, comment } = request.body;
    const selection = await this.selectionRepository.findOne({
      where: {
        application: { id: applicationId },
      },
      relations: ["application"],
  });

  if (!selection) {
    return response.status(404).json({ message: "Selection not found for this application" });
  }

  if (rank !== undefined) {
    selection.rank = rank;
  }

  if (comment !== undefined) {
    selection.comment = comment;
  }

  try {
    const updatedSelection = await this.selectionRepository.save(selection);
    return response.json(updatedSelection);
  } catch (error) {
      console.error("Error updating selection:", error);
      return response.status(400).json({ message: "Error updating selection", error });
    }
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const selection = await this.selectionRepository.findOneBy({ id });

    if (!selection) {
      return response.status(404).json({ message: "Selection not found" });
    }

    await this.selectionRepository.remove(selection);
    return response.json({ message: "Selection removed successfully" });
  }

  async removeAll(request: Request, response: Response) {
    try {
      await this.selectionRepository.clear();
      return response.json({ message: "All selections removed successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Error removing all selections", error });
    }
  }
}
