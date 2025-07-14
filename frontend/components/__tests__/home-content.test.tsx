import { render, screen } from "@testing-library/react";
import HomeContent from "../HomeContent";

describe("HomeContent", () => {
  it("renders welcome message", () => {
    render(<HomeContent />);
    const heading = screen.getByRole("heading", { name: /welcome to the home page!/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the content paragraph", () => {
    render(<HomeContent />);
    const paragraph = screen.getByText(/this is some content on the home page./i);
    expect(paragraph).toBeInTheDocument();
  });
});
