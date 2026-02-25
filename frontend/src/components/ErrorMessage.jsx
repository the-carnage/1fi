import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {message || 'Unable to load data. Please try again.'}
      </Typography>
      {onRetry && (
        <Button variant="contained" onClick={onRetry} sx={{ textTransform: 'none' }}>
          Try Again
        </Button>
      )}
    </Box>
  );
};
export default ErrorMessage;
