import { render, screen, fireEvent } from "@testing-library/react";
import NewIssue from "./NewIssue";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("NewIssue", () => {
  function renderComponent() {
    render(
      <BrowserRouter>
        <NewIssue />
      </BrowserRouter>
    );
  }

  it("renders all input fields", () => {
    renderComponent();
    expect(screen.getByLabelText(/Issue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Severity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Specialty/i)).toBeInTheDocument();
  });

  it("allows typing into the issue input field", () => {
    renderComponent();
    const issueInput = screen.getByLabelText(/Issue/i);
    
    fireEvent.change(issueInput, { target: { value: "Headache" } });
    expect(issueInput).toHaveValue("Headache");
  });

  it("renders the submit button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /Submit Issue/i })).toBeInTheDocument();
  });

});
