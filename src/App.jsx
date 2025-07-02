import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link as RouterLink } from "react-router-dom";
import RepoList from "./components/RepoList";
import RepoDetail from "./components/RepoDetail";
import { AppBar, Toolbar, Typography, Box, CssBaseline, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "./components/css/enhanced-styles.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e3f2fd 25%, #e0e7ef 75%, #f8fafc 100%)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(25, 118, 210, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(25, 118, 210, 0.05) 0%, transparent 50%)
              `,
              pointerEvents: 'none',
              zIndex: 0,
            }
          }}
        >
          <AppBar
            position="static"
            sx={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <Toolbar sx={{ py: { xs: 1, sm: 1.5 } }}>
              <IconButton
                component={RouterLink}
                to="/"
                sx={{
                  mr: 2,
                  p: 1,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.1)',
                  }
                }}
              >
              </IconButton>

              <Box
                sx={{
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    filter: 'drop-shadow(0 0 10px rgba(0, 220, 73, 0.5))',
                  }
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="GoDaddy Logo"
                  style={{
                    height: '40px',
                    width: 'auto',
                    maxWidth: '120px',
                  }}
                />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    letterSpacing: { xs: 0.5, sm: 1 },
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    lineHeight: 1.2,
                  }}
                >
                  GoDaddy GitHub Explorer
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Explore open source repositories
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<RepoList />} />
              <Route path="/repo/:repoName" element={<RepoDetail />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
