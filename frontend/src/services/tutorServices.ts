import { Application } from "../types/Application";

const API_BASE_URL = "http://localhost:3001/api";

export async function saveTutorApplication(application: Application) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Application submission failed");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving tutor application:", error);
    alert("An error occurred. Please try again.");
    return null;
  }
}
