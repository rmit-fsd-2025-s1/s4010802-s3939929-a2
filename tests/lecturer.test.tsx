import { render, screen } from "@testing-library/react";
import LecturerPage from "../src/pages/lecturer";
import * as tutorStorage from "../src/types/tutorStorage";
import '@testing-library/jest-dom';
jest.mock("../src/types/tutorStorage", () => ({
  getTutorApplications: jest.fn(),
}));

describe("Lecturer Page", () => {
  beforeEach(() => {
    (tutorStorage.getTutorApplications as jest.Mock).mockReturnValue([
      {
        id: "1",
        name: "Alice Smith",
        course: "COSC1234",
        availability: "part-time",
        skills: "React, Node.js",
        academicCredentials: "BSc Computer Science",
      },
    ]);
  });

  it("renders tutor applications on load", () => {
    render(<LecturerPage />);
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("COSC1234")).toBeInTheDocument();
    expect(screen.getByText("React, Node.js")).toBeInTheDocument();
  });
});
