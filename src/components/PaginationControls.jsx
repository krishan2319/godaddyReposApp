import React from "react";
import { Stack, Button, Typography, Box, Paper } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function PaginationControls({ page, dataLength, onChange }) {
  const windowSize = 4;
  const perPage = 9;
  // Calculate the current window (chunk) of pages
  const currentWindow = Math.floor((page - 1) / windowSize);
  const start = currentWindow * windowSize + 1;
  const end = start + windowSize - 1;
  const pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(25, 118, 210, 0.12)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 1 }}
          alignItems="center"
        >
          <Button
            variant="contained"
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
            startIcon={<ArrowBackIosIcon sx={{ fontSize: 14 }} />}
            sx={{
              minWidth: { xs: 120, sm: 100 },
              fontWeight: 700,
              borderRadius: 2,
              background: page === 1
                ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)'
                : 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: 'perspective(500px) rotateX(0deg)',
              '&:hover': {
                transform: page === 1
                  ? 'perspective(500px) rotateX(0deg)'
                  : 'perspective(500px) rotateX(-5deg) translateY(-2px)',
                boxShadow: page === 1
                  ? 'none'
                  : '0 8px 25px rgba(25, 118, 210, 0.3)',
                background: page === 1
                  ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)'
                  : 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
              },
              '&:disabled': {
                color: '#9e9e9e',
              }
            }}
          >
            Previous
          </Button>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 0.5
            }}
          >
            {pageNumbers.map((num) => (
              <Button
                key={num}
                variant={num === page ? "contained" : "outlined"}
                onClick={() => onChange(num)}
                disabled={num === page || (num > page && dataLength < perPage)}
                sx={{
                  minWidth: { xs: 44, sm: 48 },
                  height: { xs: 44, sm: 48 },
                  fontWeight: num === page ? 800 : 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  borderRadius: 2,
                  borderWidth: 2,
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transform: 'perspective(500px) rotateX(0deg)',
                  ...(num === page ? {
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                    transform: 'perspective(500px) rotateX(-3deg) translateY(-2px)',
                    color: '#ffffff',
                    borderColor: '#1976d2',
                  } : {
                    borderColor: 'rgba(25, 118, 210, 0.3)',
                    color: '#1976d2',
                    '&:hover': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                      transform: 'perspective(500px) rotateX(-2deg) translateY(-1px)',
                      boxShadow: '0 4px 15px rgba(25, 118, 210, 0.2)',
                      background: 'rgba(25, 118, 210, 0.04)',
                    }
                  }),
                  '&:disabled': {
                    opacity: 0.5,
                    transform: 'perspective(500px) rotateX(0deg)',
                  }
                }}
              >
                {num}
              </Button>
            ))}
          </Stack>

          <Button
            variant="contained"
            onClick={() => onChange(page + 1)}
            disabled={dataLength < perPage}
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
            sx={{
              minWidth: { xs: 120, sm: 100 },
              fontWeight: 700,
              borderRadius: 2,
              background: dataLength < perPage
                ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)'
                : 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: 'perspective(500px) rotateX(0deg)',
              '&:hover': {
                transform: dataLength < perPage
                  ? 'perspective(500px) rotateX(0deg)'
                  : 'perspective(500px) rotateX(-5deg) translateY(-2px)',
                boxShadow: dataLength < perPage
                  ? 'none'
                  : '0 8px 25px rgba(25, 118, 210, 0.3)',
                background: dataLength < perPage
                  ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)'
                  : 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
              },
              '&:disabled': {
                color: '#9e9e9e',
              }
            }}
          >
            Next
          </Button>
        </Stack>

        {/* Page Info */}
        <Box mt={2} textAlign="center">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            Page {page} • Showing {dataLength || 0} repositories
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}