import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRepos } from "../api/github";
import RepoCard from "./RepoCard";
import PaginationControls from "./PaginationControls";
import { Container, CircularProgress, Alert, Box, Typography, Grid, Fade } from "@mui/material";

const PER_PAGE = 9;

export default function RepoList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["repos", page],
    queryFn: () => getRepos({ page, per_page: PER_PAGE }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: '#1976d2',
              mb: 2
            }}
          />
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            Loading repositories...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Alert
            severity="error"
            sx={{
              borderRadius: 3,
              fontSize: '1.1rem',
              p: 3,
              maxWidth: 500
            }}
          >
            Failed to load repositories. Please try again later.
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box mb={{ xs: 3, sm: 4 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem' },
            fontWeight: 500
          }}
        >
          Explore GoDaddy's open source projects and contributions
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {data?.map((repo, index) => (
          <Grid item xs={12} sm={6} lg={4} key={repo.id}>
            <Fade
              in={true}
              timeout={300 + (index * 100)}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Box>
                <RepoCard repo={repo} />
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Box mt={{ xs: 4, sm: 6 }}>
        <PaginationControls
          page={page}
          dataLength={data?.length}
          onChange={(newPage) => setPage(newPage)}
        />
      </Box>
    </Container>
  );
}