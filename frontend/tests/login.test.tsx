import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../src/pages/login";
import * as userModule from "../src/types/user";
import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../types/user", () => ({
  getStoredUsers: jest.fn(),
}));

describe("Login Page", () => {
  beforeEach(() => {
    const mockedGetUsers = userModule.getStoredUsers as jest.Mock;
    (userModule.getStoredUsers as jest.Mock).mockReturnValue([
      {
        id: "1",
        username: "john@gmail.com",
        password: "tutor123",
        profession: "Tutor",
      },
    ]);

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("logs in successfully when valid credentials are entered", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "tutor123" },
    });
    fireEvent.change(screen.getByLabelText("Profession"), {
      target: { value: "Tutor" },
    });
    window.alert = jest.fn();

    fireEvent.click(screen.getByText("Login"));

    expect(window.alert).toHaveBeenCalledWith("Logged in successfully as Tutor!");
  });
});
