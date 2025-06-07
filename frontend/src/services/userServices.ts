import { User } from "../types/user";

const API_BASE_URL = "http://127.0.0.1:3004/api";

export async function loginUser(username: string, password: string, profession: string): Promise<User | null> {
  try {
    const response = await fetch("http://localhost:3004/api/users/login", {
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
    if (data.user && (data.user.blocked === true || data.user.blocked === 1 || data.user.blocked === "1")) {
      alert("Your account has been blocked by the admin.");
      return null;
    }

    return data.user;
  } catch (error) {
    console.error("Login request failed:", error);
    alert("Failed to reach server. Is backend running?");
    return null;
  }
}



export async function registerUser(username: string, password: string,confirmPassword: string, profession: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, confirmPassword, profession }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Registration failed");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    alert("An error occurred. Please try again.");
    return null;
  }
}


export async function getUserProfile(username: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile/${username}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to fetch user profile");
        return null;
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("An error occurred. Please try again.");
      return null;
    }
  }
  

