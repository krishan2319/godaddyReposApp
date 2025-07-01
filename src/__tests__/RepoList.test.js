import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const RepoList = () => <div role="progressbar">Loading...</div>;

test('renders loading state', () => {
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
        path: '/',
        element: <RepoList />,
      },
    ],
    {
      initialEntries: ['/'],
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  render(
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
