import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRepos } from "../api/github";
import RepoCard from "./RepoCard";
import PaginationControls from "./PaginationControls";
import { Container, CircularProgress, Alert } from "@mui/material";

const PER_PAGE = 10;

export default function RepoList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["repos", page],
    queryFn: () => getRepos({ page, per_page: PER_PAGE }),
    keepPreviousData: true,
  });

  return (
    <Container sx={{ py: 4 }}>
      {isLoading && <CircularProgress />}
      {isError && (
        <Alert severity="error">Failed to load repositories.</Alert>
      )}
      {data?.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}

      <PaginationControls
        page={page}
        dataLength={data?.length}
        onChange={(newPage) => setPage(newPage)}
      />
    </Container>
  );
}