import { render, screen } from "@testing-library/react";
import RepoList from "../components/RepoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("renders pagination & loading state", async () => {
  const qc = new QueryClient();
  render(
    <QueryClientProvider client={qc}>
      <RepoList />
    </QueryClientProvider>
  );
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});