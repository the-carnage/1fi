import { Component } from "react";
import { Container, Typography, Button, Box } from "@mui/material";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              We encountered an unexpected error. Please try refreshing the
              page.
            </Typography>
            <Typography
              variant="body2"
              color="error"
              sx={{
                mb: 4,
                fontFamily: "monospace",
                textAlign: "left",
                bgcolor: "#f5f5f5",
                p: 2,
                borderRadius: 1,
                wordBreak: "break-all",
              }}
            >
              {this.state.error?.toString()}
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              sx={{ textTransform: "none" }}
            >
              Refresh Page
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
