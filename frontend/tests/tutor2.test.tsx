import { render, screen, fireEvent } from "@testing-library/react";
import TutorPage from "../src/pages/tutor";
import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
describe("Tutor Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("shows alert if required fields are empty", () => {
    window.alert = jest.fn(); 

    render(<TutorPage />);
    fireEvent.click(screen.getByText("Submit Application")); 

    expect(window.alert).toHaveBeenCalledWith("Please enter your name.");
  });
});
