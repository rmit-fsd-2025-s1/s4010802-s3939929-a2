import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/User.routes";
import courseRoutes from "./routes/course.routes";
import applicationRoutes from "./routes/Application.routes";
import selectionRoutes from "./routes/selection.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", applicationRoutes);
app.use("/api", selectionRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));
