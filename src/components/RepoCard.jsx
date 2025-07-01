import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function RepoCard({ repo }) {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.2s",
        border: "2px solid #e3e8f0",
        background: "linear-gradient(90deg, #f8fafc 60%, #e0e7ef 100%)",
        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-2px)",
          borderColor: "#1976d2",
          background: "linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)",
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <GitHubIcon sx={{ color: "#24292f", mr: 1 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#1a1a1a" }}
          >
            {repo.name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
          noWrap
        >
          {repo.description || ""}
        </Typography>
        <Button
          component={RouterLink}
          to={`/repo/${repo.name}`}
          size="small"
          variant="contained"
          color="primary"
          sx={{
            mt: 1,
            fontWeight: 600,
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}