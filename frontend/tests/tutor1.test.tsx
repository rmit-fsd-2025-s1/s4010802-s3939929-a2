import { render, screen, fireEvent } from "@testing-library/react";
import TutorPage from "../src/pages/tutor";
import * as storage from "../src/types/tutorStorage";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../types/tutorStorage", () => ({
  saveTutorApplication: jest.fn(),
}));

describe("TutorPage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it("submits the form with valid input", () => {
    render(<TutorPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByDisplayValue("Select a course"), {
      target: { value: "COSC1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("List your previous roles"), {
      target: { value: "Tutor at ABC University" },
    });
    fireEvent.change(screen.getByDisplayValue("Select availability"), {
      target: { value: "part-time" },
    });
    fireEvent.change(screen.getByPlaceholderText("List your skills (e.g., React, Node.js, Java)"), {
      target: { value: "React, Node.js" },
    });
    fireEvent.change(screen.getByPlaceholderText("List your academic credentials"), {
      target: { value: "BSc Computer Science" },
    });

    window.alert = jest.fn();

    fireEvent.click(screen.getByText("Submit Application"));

    expect(window.alert).toHaveBeenCalledWith("Application Submitted!");
    expect(storage.saveTutorApplication).toHaveBeenCalled();
  });
});
