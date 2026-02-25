import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
const Breadcrumbs = ({ items }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
          },
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <HomeIcon fontSize="small" />
          Home
        </Link>
        {items.map((item, index) => (
          <Typography
            key={index}
            sx={{
              color: 'text.primary',
              fontWeight: 600,
            }}
          >
            {item.label}
          </Typography>
        ))}
      </MuiBreadcrumbs>
    </Box>
  );
};
export default Breadcrumbs;
