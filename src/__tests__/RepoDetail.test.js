import { render, screen } from "@testing-library/react";
import RepoDetail from "../components/RepoDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";

test("shows loading spinner", () => {
  const qc = new QueryClient();
  render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={["/repo/test-repo"]}>
        <Routes>
          <Route path="/repo/:repoName" element={<RepoDetail />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});