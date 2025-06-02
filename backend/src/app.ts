import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";
import applicationRoutes from "./routes/application.routes";
import selectionRoutes from "./routes/selection.routes";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", applicationRoutes);
app.use("/api", selectionRoutes);

export default app;
