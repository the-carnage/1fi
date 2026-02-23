import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: '#fff', py: 4, mt: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="body2" align="center" sx={{ color: '#aaa' }}>
          © 2024 1Fi. All rights reserved. | EMI plans backed by mutual funds
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
