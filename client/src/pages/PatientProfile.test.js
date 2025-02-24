import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PatientProfile from "./PatientProfile"; 

describe("PatientProfile - Password Visibility", () => {
  test("toggles password visibility when visibility icon is clicked", () => {
    render(<PatientProfile />);
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput.getAttribute("type")).toBe("password");
    const visibilityToggle = screen.getByRole("button", { name: /toggle password visibility/i });
    fireEvent.click(visibilityToggle);
    expect(passwordInput.getAttribute("type")).toBe("text");
    fireEvent.click(visibilityToggle);
    expect(passwordInput.getAttribute("type")).toBe("password");
  });
});



