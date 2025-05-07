//define user types with fields
export type User = {
  id: string;
  username: string;
  password: string;
  profession: "Tutor" | "Lecturer";
};
//defines constant keys
const STORAGE_KEY = "registeredUsers";
//default registers users, for testing purposes
export const DEFAULT_USERS: User[] = [
  { id: "1", username: "john@gmail.com", password: "tutor123", profession: "Tutor" },
  { id: "2", username: "jack@gmail.com", password: "lecturer123", profession: "Lecturer" },
  { id: "3", username: "dan@gmail.com", password: "lecturer123", profession: "Lecturer" },
];
//gets stored users from local storage
export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
}
