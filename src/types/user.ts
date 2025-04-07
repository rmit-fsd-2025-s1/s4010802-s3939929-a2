export type User = {
  id: string;
  username: string;
  password: string;
  profession: "Tutor" | "Lecturer";
};

const STORAGE_KEY = "registeredUsers";

export const DEFAULT_USERS: User[] = [
  { id: "1", username: "john@gmail.com", password: "tutor123", profession: "Tutor" },
  { id: "2", username: "jack@gmail.com", password: "lecturer123", profession: "Lecturer" },
];

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
