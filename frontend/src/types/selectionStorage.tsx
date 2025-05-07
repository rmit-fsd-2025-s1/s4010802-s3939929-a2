

const SELECTION_STORAGE_KEY = "selectedCandidates";

export type CandidateSelection = {
  [applicationId: string]: number;
};

// Save selected candidates
export function saveSelectedCandidates(data: CandidateSelection) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(data));
}

// Retrieve selected candidates
export function getSelectedCandidates(): CandidateSelection {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(SELECTION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}
