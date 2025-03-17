import {render, screen, fireEvent} from '@testing-library/react';
import IssueSelection from './IssueSelection';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';

describe('IssueSelection', () => {
  function renderComponent() {
    render(
      <BrowserRouter>
        <IssueSelection />
      </BrowserRouter>,
    );
  }

  it('renders the title', () => {
    renderComponent();
    expect(
      screen.getByText(/Is this a New or Existing issue\?/i),
    ).toBeInTheDocument();
  });

  it("renders the 'New Issue' button", () => {
    renderComponent();
    expect(
      screen.getByRole('button', {name: /New Issue/i}),
    ).toBeInTheDocument();
  });

  it("renders the 'Existing Issues' button", () => {
    renderComponent();
    expect(
      screen.getByRole('button', {name: /Existing Issues/i}),
    ).toBeInTheDocument();
  });
});
