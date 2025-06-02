import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = process.env.PORT || 3004;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));
