import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarIcon from "@mui/icons-material/Star";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function RepoCard({ repo }) {
  return (
    <Card
      sx={{
        mb: { xs: 2, sm: 3 },
        borderRadius: { xs: 2, sm: 4 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e3f2fd 100%)',
        border: '1px solid rgba(25, 118, 210, 0.12)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transformStyle: 'preserve-3d',
        boxShadow: `
          0 4px 20px rgba(0, 0, 0, 0.08),
          0 2px 8px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.6)
        `,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        },
        '&:hover': {
          transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-8px) scale(1.02)',
          boxShadow: `
            0 20px 40px rgba(25, 118, 210, 0.15),
            0 10px 20px rgba(0, 0, 0, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)
          `,
          border: '1px solid rgba(25, 118, 210, 0.3)',
          '&::before': {
            opacity: 1,
          },
          '& .repo-card-content': {
            transform: 'translateZ(20px)',
          },
          '& .repo-icon': {
            transform: 'rotateY(15deg) scale(1.1)',
            color: '#1976d2',
          },
          '& .repo-button': {
            transform: 'translateZ(10px) scale(1.05)',
            boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)',
          }
        },
        '&:active': {
          transform: 'perspective(1000px) rotateX(1deg) rotateY(-1deg) translateY(-4px) scale(1.01)',
        }
      }}
    >
      <CardContent
        className="repo-card-content"
        sx={{
          position: 'relative',
          zIndex: 2,
          transition: 'transform 0.3s ease',
          p: { xs: 2, sm: 3 }
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <GitHubIcon
            className="repo-icon"
            sx={{
              color: "#24292f",
              mr: 1.5,
              fontSize: { xs: 28, sm: 32 },
              transition: 'all 0.3s ease',
              transform: 'rotateY(0deg)',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              lineHeight: 1.2,
              flex: 1,
              wordBreak: 'break-word'
            }}
          >
            {repo.name}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            minHeight: { xs: '2.5rem', sm: '3rem' },
            display: '-webkit-box',
            WebkitLineClamp: { xs: 2, sm: 3 },
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
            fontSize: { xs: '0.875rem', sm: '0.9rem' }
          }}
        >
          {repo.description || "No description available"}
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2 }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          mb={2}
        >
          <Stack direction="row" spacing={2} sx={{ minWidth: 0 }}>
            <Box display="flex" alignItems="center" sx={{ minWidth: 0 }}>
              <StarIcon sx={{ color: '#ffd700', mr: 0.5, fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                {repo.stargazers_count || 0}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ minWidth: 0 }}>
              <CallSplitIcon sx={{ color: '#00DC49', mr: 0.5, fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                {repo.forks_count || 0}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ minWidth: 0 }}>
              <VisibilityIcon sx={{ color: '#1976d2', mr: 0.5, fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                {repo.watchers_count || 0}
              </Typography>
            </Box>
          </Stack>

          {repo.language && (
            <Chip
              label={repo.language}
              size="small"
              sx={{
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: '#1976d2',
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 24,
                alignSelf: { xs: 'flex-start', sm: 'center' }
              }}
            />
          )}
        </Stack>

        <Button
          component={RouterLink}
          to={`/repo/${repo.name}`}
          variant="contained"
          className="repo-button"
          sx={{
            width: '100%',
            fontWeight: 700,
            fontSize: { xs: '0.875rem', sm: '0.9rem' },
            py: { xs: 1, sm: 1.2 },
            borderRadius: 2,
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            transition: 'all 0.3s ease',
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
            }
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}