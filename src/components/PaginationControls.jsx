import React from "react";
import { Stack, Button, Typography, Box } from "@mui/material";

export default function PaginationControls({ page, dataLength, onChange }) {
  const windowSize = 5;
  const perPage = 10;
  // Calculate the current window (chunk) of pages
  const currentWindow = Math.floor((page - 1) / windowSize);
  const start = currentWindow * windowSize + 1;
  const end = start + windowSize - 1;
  const pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        {pageNumbers.map((num) => (
          <Button
            key={num}
            variant={num === page ? "contained" : "outlined"}
            color="primary"
            onClick={() => onChange(num)}
            sx={{ fontWeight: num === page ? 700 : 400, minWidth: 40 }}
            disabled={num === page || (num > page && dataLength < perPage)}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChange(page + 1)}
          disabled={dataLength < perPage}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}