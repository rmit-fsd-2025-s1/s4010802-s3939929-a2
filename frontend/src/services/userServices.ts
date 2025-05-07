import { User } from "../types/user";

const API_BASE_URL = "http://localhost:3001/api";

export async function loginUser(username: string, password: string, profession: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, profession }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Login failed");
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
    return null;
  }
}

export async function registerUser(username: string, password: string, profession: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, profession }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Registration failed");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred. Please try again.");
    return null;
  }
}
