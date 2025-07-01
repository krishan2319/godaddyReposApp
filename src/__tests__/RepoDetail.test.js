import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const RepoDetail = () => <div role="progressbar">Loading...</div>;

test("shows loading spinner", () => {
  const qc = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
    },
  });

  const router = createMemoryRouter(
    [
      {
        path: "/repo/:repoName",
        element: <RepoDetail />,
      },
    ],
    {
      initialEntries: ["/repo/test-repo"],
      future: {
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      },
    }
  );

  render(
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});
