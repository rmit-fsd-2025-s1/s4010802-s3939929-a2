import { render, screen } from "@testing-library/react";
import LecturerPage from "../src/pages/lecturer";
import * as tutorStorage from "../src/types/tutorStorage";
import * as selectionStorage from "../src/types/selectionStorage";
import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../src/types/tutorStorage", () => ({
  getTutorApplications: jest.fn(),
}));

jest.mock("../src/types/selectionStorage", () => ({
  getSelectedCandidates: jest.fn(),
  saveSelectedCandidates: jest.fn(),
}));

describe("Lecturer Page", () => {
  beforeEach(() => {
    
    (tutorStorage.getTutorApplications as jest.Mock).mockReturnValue([
      {
        id: "1",
        name: "John",
        course: "COSC1234",
        availability: "part-time",
        skills: "React",
        academicCredentials: "Bachelor's",
      },
    ]);

    (selectionStorage.getSelectedCandidates as jest.Mock).mockReturnValue({});

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("renders the page and shows the heading", () => {
    render(<LecturerPage />);
    expect(screen.getByText("Tutor Applications")).toBeInTheDocument();
  });
});
