import { render, screen, fireEvent } from "@testing-library/react";
import SignUpPatient from "./SignUpPatient";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("SignUpPatient", () => {
  function renderComponent() {
    render(
      <BrowserRouter>
        <SignUpPatient />
      </BrowserRouter>
    );
  }

  it("contains all input fields", () => {
    renderComponent();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("renders the sign-up button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

});
