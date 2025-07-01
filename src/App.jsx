import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RepoList from "./components/RepoList";
import RepoDetail from "./components/RepoDetail";
import { AppBar, Toolbar, Typography, Box, CssBaseline, Container } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)' }}>
        <AppBar position="static" sx={{ background: '#1a1a1a', boxShadow: 3 }}>
          <Toolbar>
            <GitHubIcon sx={{ mr: 1, color: '#00DC49', fontSize: 32 }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#fff', fontWeight: 700, letterSpacing: 1 }}>
              GoDaddy GitHub Explorer
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RepoList />} />
              <Route path="/repo/:repoName" element={<RepoDetail />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </Box>
    </QueryClientProvider>
  );
}
