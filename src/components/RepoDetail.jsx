import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRepos, getLanguages } from "../api/github";
import {
  Container, Typography, CircularProgress, Alert, Chip, Stack, Button, Card, CardContent, Box, Grid, Paper, Divider
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import CodeIcon from "@mui/icons-material/Code";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Button
        component={RouterLink}
        to="/"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: { xs: 2, sm: 3 },
          borderRadius: 2,
          fontWeight: 600,
          px: 3,
          py: 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(-4px)',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
          }
        }}
      >
        Back to List
      </Button>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Main Repository Card */}
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              borderRadius: { xs: 3, sm: 4 },
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e3f2fd 100%)',
              border: '1px solid rgba(25, 118, 210, 0.12)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: 'perspective(1000px) rotateX(0deg)',
              transformStyle: 'preserve-3d',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.12),
                0 4px 16px rgba(0, 0, 0, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.6)
              `,
              '&:hover': {
                transform: 'perspective(1000px) rotateX(1deg) translateY(-4px)',
                boxShadow: `
                  0 16px 48px rgba(25, 118, 210, 0.15),
                  0 8px 24px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8)
                `,
              }
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              {/* Header */}
              <Box display="flex" alignItems="center" mb={3}>
                <GitHubIcon
                  sx={{
                    color: '#24292f',
                    mr: 2,
                    fontSize: { xs: 40, sm: 48 },
                    transition: 'all 0.3s ease',
                  }}
                />
                <Box flex={1}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: '#1a1a1a',
                      fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                      lineHeight: 1.2,
                      wordBreak: 'break-word'
                    }}
                  >
                    {repo.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, fontWeight: 500 }}
                  >
                    {repo.full_name}
                  </Typography>
                </Box>
              </Box>

              {/* Description */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  bgcolor: 'rgba(25, 118, 210, 0.04)',
                  borderRadius: 2,
                  border: '1px solid rgba(25, 118, 210, 0.08)'
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    lineHeight: 1.6,
                    color: '#2c3e50'
                  }}
                >
                  {repo.description || 'No description available for this repository.'}
                </Typography>
              </Paper>

              {/* Action Buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                mb={4}
              >
                <Button
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  startIcon={<LaunchIcon />}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '1rem',
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
                    }
                  }}
                >
                  View on GitHub
                </Button>

                {repo.clone_url && (
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<CodeIcon />}
                    onClick={() => navigator.clipboard.writeText(repo.clone_url)}
                    sx={{
                      flex: 1,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.2)',
                      }
                    }}
                  >
                    Copy Clone URL
                  </Button>
                )}
              </Stack>

              {/* Languages Section */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CodeIcon sx={{ mr: 1, color: '#1976d2' }} />
                  Languages
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {Object.keys(langs).length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No language data available
                    </Typography>
                  ) : (
                    Object.entries(langs).map(([lang, bytes]) => {
                      const total = Object.values(langs).reduce((sum, b) => sum + b, 0);
                      const percentage = ((bytes / total) * 100).toFixed(1);
                      return (
                        <Chip
                          key={lang}
                          label={`${lang} (${percentage}%)`}
                          sx={{
                            bgcolor: 'rgba(25, 118, 210, 0.1)',
                            color: '#1976d2',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            height: 32,
                            '&:hover': {
                              bgcolor: 'rgba(25, 118, 210, 0.2)',
                              transform: 'scale(1.05)',
                            },
                            transition: 'all 0.2s ease'
                          }}
                        />
                      );
                    })
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Sidebar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Repository Stats */}
            <Card
              sx={{
                borderRadius: { xs: 3, sm: 4 },
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(25, 118, 210, 0.12)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(25, 118, 210, 0.15)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Repository Statistics
                </Typography>

                <Stack spacing={2.5}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 215, 0, 0.1)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255, 215, 0, 0.15)',
                        transform: 'scale(1.02)',
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <StarIcon sx={{ color: '#ffd700', mr: 1.5, fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Stars
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {repo.stargazers_count?.toLocaleString() || 0}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(0, 220, 73, 0.1)',
                      border: '1px solid rgba(0, 220, 73, 0.2)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(0, 220, 73, 0.15)',
                        transform: 'scale(1.02)',
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <CallSplitIcon sx={{ color: '#00DC49', mr: 1.5, fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Forks
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {repo.forks_count?.toLocaleString() || 0}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(25, 118, 210, 0.1)',
                      border: '1px solid rgba(25, 118, 210, 0.2)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.15)',
                        transform: 'scale(1.02)',
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <VisibilityIcon sx={{ color: '#1976d2', mr: 1.5, fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Watchers
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {repo.watchers_count?.toLocaleString() || 0}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 152, 0, 0.1)',
                      border: '1px solid rgba(255, 152, 0, 0.2)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255, 152, 0, 0.15)',
                        transform: 'scale(1.02)',
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <ErrorOutlineIcon sx={{ color: '#ff9800', mr: 1.5, fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Issues
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {repo.open_issues_count?.toLocaleString() || 0}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Repository Info */}
            <Card
              sx={{
                borderRadius: { xs: 3, sm: 4 },
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(25, 118, 210, 0.12)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(25, 118, 210, 0.15)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: '#1a1a1a'
                  }}
                >
                  Repository Info
                </Typography>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Visibility
                    </Typography>
                    <Chip
                      label={repo.private ? 'Private' : 'Public'}
                      color={repo.private ? 'error' : 'success'}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Default Branch
                    </Typography>
                    <Chip
                      label={repo.default_branch || 'main'}
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                      <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                      Created
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatDate(repo.created_at)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                      <UpdateIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                      Last Updated
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatDate(repo.updated_at)}
                    </Typography>
                  </Box>

                  {repo.size && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                        Repository Size
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {(repo.size / 1024).toFixed(1)} MB
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}