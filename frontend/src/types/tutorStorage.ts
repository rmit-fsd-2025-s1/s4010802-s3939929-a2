const STORAGE_KEY = "tutorApplications";
const DEFAULT_APPLICATIONS: any[] = [];

// Save a new tutor application to local storage
export function saveTutorApplication(application: any) {
  if (typeof window === "undefined") return;

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.push(application);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

// Retrieve all saved tutor applications
export function getTutorApplications(): any[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_APPLICATIONS));
    return DEFAULT_APPLICATIONS;
  }
}
