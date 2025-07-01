import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRepos, getLanguages } from "../api/github";
import {
  Container, Typography, CircularProgress, Alert, Chip, Stack, Button, Card, CardContent, Box
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function RepoDetail() {
  const { repoName } = useParams();

  const repoQuery = useQuery({
    queryKey: ["repo", repoName],
    queryFn: async () => {
      const repos = await getRepos({ per_page: 100, page: 1 });
      return repos.find((r) => r.name === repoName);
    }
  });

  const langQuery = useQuery({
    queryKey: ["languages", repoName],
    queryFn: () => getLanguages(repoQuery.data.languages_url),
    enabled: Boolean(repoQuery.data?.languages_url)
  });

  if (repoQuery.isLoading) return <CircularProgress />;
  if (repoQuery.isError || !repoQuery.data)
    return <Alert severity="error">Repository not found.</Alert>;

  const repo = repoQuery.data;
  const langs = langQuery.data || {};

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 2 }}>
        ← Back to List
      </Button>
      <Card sx={{ borderRadius: 4, boxShadow: 6, p: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <GitHubIcon sx={{ color: '#24292f', mr: 1, fontSize: 36 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>{repo.name}</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" mb={2}>
            {repo.description || ''}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ fontWeight: 600 }}>
                View on GitHub
              </Button>
            </a>
          </Stack>
          <Stack direction="row" spacing={2} mb={2}>
            <Box display="flex" alignItems="center">
              <CallSplitIcon sx={{ color: '#00DC49', mr: 0.5 }} />
              <Typography variant="body2">Forks: <b>{repo.forks_count}</b></Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <ErrorOutlineIcon sx={{ color: '#ff9800', mr: 0.5 }} />
              <Typography variant="body2">Open Issues: <b>{repo.open_issues_count}</b></Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <VisibilityIcon sx={{ color: '#1976d2', mr: 0.5 }} />
              <Typography variant="body2">Watchers: <b>{repo.watchers_count}</b></Typography>
            </Box>
          </Stack>
          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Languages:</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {Object.keys(langs).length === 0 && <Typography variant="body2" color="text.secondary">No language data</Typography>}
              {Object.entries(langs).map(([lang]) => (
                <Chip key={lang} label={lang} variant="outlined" color="success" />
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}