import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1a1a1a' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: '#fff',
              }}
            >
              1Fi
            </Typography>
          </Link>
          <Typography
            variant="body2"
            sx={{ ml: 2, color: '#aaa' }}
          >
            Buy Now, Pay Later
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
